<script setup>
import { computed, ref } from 'vue'

const categories = ['Vue', 'CSS', 'JavaScript', '项目', '其他']

const form = ref({
  title: '',
  category: 'Vue',
  priority: '中',
  note: '',
})

const statusFilter = ref('全部')
const categoryFilter = ref('全部')

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


function submitTask(){
  // 判断值不能为空
  // 读取里面的值，然后 提交到task

  // 这几个数字的应该是自己会变的。

  const title = form.value.title.trim();
  if (!title) {
    return
  }

  tasks.value.push({
    id: Date.now(),
    title: title,
    category: form.value.category,
    priority: form.value.priority,
    done: false,
    note: form.value.note,
  })

  clearForm()
}

function clearForm(){
  form.value = {
    title: '',
    category: 'Vue',
    priority: '中',
    note: '',
  }
}

function toggleTask(task) {
  task.done = !task.done
}


function deleteTask(taskId){
  // const task = tasks.value.find((task) => task.id === taskId)
  // if (!task) return

  // 过滤其中一个
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
}

</script>

<template>
  <main class="app-shell">
    <section class="page-heading">
      <p class="eyebrow">Vue 练习项目 01</p>
      <h1>学习计划管理器</h1>
      <p class="intro">
        先把页面结构搭出来：表单负责收集输入，筛选区负责改变视图，列表负责展示任务数据。
      </p>
    </section>

    <section class="panel task-form-panel" aria-labelledby="form-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Form</p>
          <h2 id="form-title">新增 / 编辑任务</h2>
        </div>
        <span class="helper-text">这一版先展示表单，不提交数据</span>
      </div>

      <form class="task-form">
        <label class="field field-wide">
          <span>任务标题</span>
          <input v-model="form.title" type="text" placeholder="例如：学习 Vue 事件处理" />
        </label>

        <label class="field">
          <span>分类</span>
          <select v-model="form.category">
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </label>

        <label class="field">
          <span>优先级</span>
          <select v-model="form.priority">
            <option>低</option>
            <option>中</option>
            <option>高</option>
          </select>
        </label>

        <label class="field field-wide">
          <span>备注</span>
          <textarea v-model="form.note" placeholder="写一点学习目标或补充说明"></textarea>
        </label>

        <div class="form-actions">
          <button class="primary-button"
                  type="button"
                  @click="submitTask">添加任务</button>
          <button class="ghost-button"
                  type="button"
                  @click="clearForm">清空</button>
        </div>
      </form>
    </section>

    <section class="toolbar" aria-label="筛选和统计">
      <div class="panel filters">
        <div class="section-heading compact">
          <div>
            <p class="eyebrow">Filters</p>
            <h2>筛选区</h2>
          </div>
        </div>

        <div class="filter-grid">
          <label class="field">
            <span>状态</span>
            <select v-model="statusFilter">
              <option>全部</option>
              <option>未完成</option>
              <option>已完成</option>
            </select>
          </label>

          <label class="field">
            <span>分类</span>
            <select v-model="categoryFilter">
              <option>全部</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div class="panel stats">
        <div class="stat-item">
          <span>总任务</span>
          <strong>{{ totalCount }}</strong>
        </div>
        <div class="stat-item">
          <span>未完成</span>
          <strong>{{ pendingCount }}</strong>
        </div>
        <div class="stat-item">
          <span>已完成</span>
          <strong>{{ doneCount }}</strong>
        </div>
      </div>
    </section>

    <section class="panel task-list-panel" aria-labelledby="list-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">List</p>
          <h2 id="list-title">任务列表</h2>
        </div>
        <span class="helper-text">下一步会让这些按钮真正改变任务状态</span>
      </div>

      <ul class="task-list">
        <li v-for="task in tasks" :key="task.id" class="task-item" :class="{ done: task.done }">
          <label class="task-check">
            <input type="checkbox"
                   :checked="task.done"
                   @change="toggleTask(task)" />
            <span class="check-label">{{ task.done ? '已完成' : '未完成' }}</span>
          </label>

          <div class="task-content">
            <h3>{{ task.title }}</h3>
            <p>{{ task.note }}</p>
            <div class="task-meta">
              <span>{{ task.category }}</span>
              <span>优先级：{{ task.priority }}</span>
            </div>
          </div>

          <div class="task-actions">
            <button type="button">编辑</button>
            <button type="button"
                    @click="deleteTask(task.id)">删除</button>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
