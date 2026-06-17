<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import TaskFilters from './components/TaskFilters.vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import TaskStats from './components/TaskStats.vue'

const categories = ['Vue', 'CSS', 'JavaScript', '项目', '其他']
const TASK_STORAGE_KEY = 'vue-task-planner-cache'

const form = ref({
  title: '',
  category: 'Vue',
  priority: '中',
  note: '',
})

const statusFilter = ref('全部')
const categoryFilter = ref('全部')
const editingTaskId = ref(null)

const tasks = ref([
  {
    id: 1,
    title: '复习 Vue 的 ref 和 template 渲染',
    category: 'Vue',
    priority: '高',
    done: false,
    note: '先看懂状态如何显示到页面上。',
  },
  {
    id: 2,
    title: '整理 Flex 布局笔记',
    category: 'CSS',
    priority: '中',
    done: true,
    note: '把主轴、交叉轴、gap 写成自己的话。',
  },
  {
    id: 3,
    title: '完成任务清单项目第一版页面架子',
    category: '项目',
    priority: '高',
    done: false,
    note: '先不追求功能完整，重点是看清页面分区。',
  },
])

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

function submitTask() {
  const title = form.value.title.trim()
  if (!title) {
    return
  }

  if (editingTaskId.value === null) {
    tasks.value.push({
      id: Date.now(),
      title: title,
      category: form.value.category,
      priority: form.value.priority,
      done: false,
      note: form.value.note,
    })
  } else {
    const task = tasks.value.find((task) => task.id === editingTaskId.value)
    if (!task) {
      return
    }

    task.title = title
    task.category = form.value.category
    task.priority = form.value.priority
    task.note = form.value.note
  }

  clearForm()
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

function toggleTask(task) {
  task.done = !task.done
}

function deleteTask(taskId) {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
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

function clearLocalStorage() {
  localStorage.removeItem(TASK_STORAGE_KEY)
}

onMounted(() => {
  const savedTasks = localStorage.getItem(TASK_STORAGE_KEY)

  if (!savedTasks) {
    return
  }

  try {
    const parsedTasks = JSON.parse(savedTasks)

    if (!Array.isArray(parsedTasks)) {
      localStorage.removeItem(TASK_STORAGE_KEY)
      return
    }

    tasks.value = parsedTasks
  } catch {
    localStorage.removeItem(TASK_STORAGE_KEY)
  }
})

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(newTasks))
  },
  { deep: true },
)
</script>

<template>
  <main class="app-shell">
    <section class="page-heading">
      <p class="eyebrow">Vue 练习项目 01</p>
      <h1>学习计划管理器</h1>
      <p class="intro">
        用一个小任务清单练习表单输入、列表渲染、筛选和浏览器本地缓存。
      </p>
    </section>

    <TaskForm
      v-model:title="form.title"
      v-model:category="form.category"
      v-model:priority="form.priority"
      v-model:note="form.note"
      :categories="categories"
      :is-editing="editingTaskId !== null"
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
      @clear-local-storage="clearLocalStorage"
      @toggle-task="toggleTask"
      @edit-task="editTask"
      @delete-task="deleteTask"
    />
  </main>
</template>
