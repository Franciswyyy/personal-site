<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  createTask as createTaskApi,
  deleteTask as deleteTaskApi,
  getTasks,
  toggleTaskStatus,
  updateTask as updateTaskApi,
} from './api/taskApi'
import TaskFilters from './components/TaskFilters.vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import TaskStats from './components/TaskStats.vue'

const defaultCategories = ['Vue', 'CSS', 'JavaScript', '项目', '其他']

const form = ref({
  title: '',
  category: 'Vue',
  priority: '中',
  note: '',
})

const statusFilter = ref('全部')
const categoryFilter = ref('全部')
const editingTaskId = ref(null)
const isLoading = ref(false)
const isSaving = ref(false)
const activeTaskId = ref(null)
const errorMessage = ref('')

const tasks = ref([])

const categories = computed(() => {
  const taskCategories = tasks.value.map((task) => task.category)
  return [...new Set([...defaultCategories, ...taskCategories])]
})
const totalCount = computed(() => tasks.value.length)
const doneCount = computed(() => tasks.value.filter((task) => task.done).length)
const pendingCount = computed(() => totalCount.value - doneCount.value)

const filteredTasks = computed(() => {
  let result = tasks.value

  if (statusFilter.value === '未完成') {
    result = result.filter((task) => !task.done)
  }

  if (statusFilter.value === '已完成') {
    result = result.filter((task) => task.done)
  }

  if (categoryFilter.value !== '全部') {
    result = result.filter((task) => task.category === categoryFilter.value)
  }

  return result
})

async function submitTask() {
  const title = form.value.title.trim()
  if (!title || isSaving.value) {
    return
  }

  isSaving.value = true
  errorMessage.value = ''

  try {
    const submitForm = {
      ...form.value,
      title,
    }

    if (editingTaskId.value === null) {
      const createdTask = await createTaskApi(submitForm)
      tasks.value = [createdTask, ...tasks.value]
    } else {
      const updatedTask = await updateTaskApi(editingTaskId.value, submitForm)
      replaceTask(updatedTask)
    }

    clearForm()
  } catch (error) {
    errorMessage.value = error.message || '任务保存失败，请稍后再试。'
  } finally {
    isSaving.value = false
  }
}

function clearForm() {
  form.value = {
    title: '',
    category: 'Vue',
    priority: '中',
    note: '',
  }
  editingTaskId.value = null
}

async function toggleTask(task) {
  if (activeTaskId.value !== null) {
    return
  }

  activeTaskId.value = task.id
  errorMessage.value = ''

  try {
    const updatedTask = await toggleTaskStatus(task.id)
    replaceTask(updatedTask)
  } catch (error) {
    errorMessage.value = error.message || '任务状态更新失败，请稍后再试。'
  } finally {
    activeTaskId.value = null
  }
}

async function deleteTask(taskId) {
  if (activeTaskId.value !== null) {
    return
  }

  activeTaskId.value = taskId
  errorMessage.value = ''

  try {
    await deleteTaskApi(taskId)
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
  } catch (error) {
    errorMessage.value = error.message || '任务删除失败，请稍后再试。'
  } finally {
    activeTaskId.value = null
  }
}

function editTask(task) {
  editingTaskId.value = task.id
  form.value = {
    title: task.title,
    category: task.category,
    priority: task.priority,
    note: task.note,
  }
}

async function loadTasks() {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    tasks.value = await getTasks()
  } catch (error) {
    errorMessage.value = error.message || '任务加载失败，请稍后再试。'
  } finally {
    isLoading.value = false
  }
}

function replaceTask(updatedTask) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === updatedTask.id) {
      return updatedTask
    }

    return task
  })
}

onMounted(loadTasks)
</script>

<template>
  <main class="app-shell">
    <section class="page-heading">
      <p class="eyebrow">Vue 练习项目 01</p>
      <h1>学习计划管理器</h1>
      <p class="intro">
        用一个小任务清单练习表单输入、列表渲染、筛选和后端接口调用。
      </p>
    </section>

    <TaskForm
      v-model:title="form.title"
      v-model:category="form.category"
      v-model:priority="form.priority"
      v-model:note="form.note"
      :categories="categories"
      :is-editing="editingTaskId !== null"
      :is-saving="isSaving"
      @submit-task="submitTask"
      @clear-form="clearForm"
    />

    <section class="toolbar" aria-label="筛选和统计">
      <TaskFilters
        v-model:status-filter="statusFilter"
        v-model:category-filter="categoryFilter"
        :categories="categories"
      />

      <TaskStats
        :total-count="totalCount"
        :pending-count="pendingCount"
        :done-count="doneCount"
      />
    </section>

    <TaskList
      :tasks="tasks"
      :filtered-tasks="filteredTasks"
      :is-loading="isLoading"
      :active-task-id="activeTaskId"
      :error-message="errorMessage"
      @reload-tasks="loadTasks"
      @toggle-task="toggleTask"
      @edit-task="editTask"
      @delete-task="deleteTask"
    />
  </main>
</template>
