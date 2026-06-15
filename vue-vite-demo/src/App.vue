<script setup>
import { computed, ref } from 'vue'
import ProjectCard from './components/ProjectCard.vue'

const count = ref(0)
const selectedCategory = ref('All')
const visitorName = ref('')
const messageDraft = ref('')
const nextMessageId = ref(1)
const messages = ref(loadMessages())

const categories = ['All', 'Frontend', 'Writing', 'Learning']

const projects = [
  {
    id: 1,
    name: 'Personal Site v1',
    description: '用原生 HTML、CSS、JavaScript 做的个人网站。',
    category: 'Frontend',
  },
  {
    id: 2,
    name: 'Build Log',
    description: '记录从后端走向全栈和独立产品开发的学习过程。',
    category: 'Writing',
  },
  {
    id: 3,
    name: 'Vue Demo',
    description: '用小例子理解 Vue 如何管理页面状态。',
    category: 'Learning',
  },
]

const countMessage = computed(() => {
  if (count.value === 0) {
    return '当前数字是 0，状态刚初始化。'
  }

  if (count.value > 0) {
    return '当前数字是正数。'
  }

  return '当前数字是负数。'
})

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects
  }

  return projects.filter((project) => project.category === selectedCategory.value)
})

function loadMessages() {
  const savedMessages = localStorage.getItem('vite-demo-messages')

  if (!savedMessages) {
    return []
  }

  const parsedMessages = JSON.parse(savedMessages)
  nextMessageId.value = Math.max(...parsedMessages.map((message) => message.id), 0) + 1
  return parsedMessages
}

function saveMessagesToStorage() {
  localStorage.setItem('vite-demo-messages', JSON.stringify(messages.value))
}

function saveMessage() {
  const text = messageDraft.value.trim()

  if (text === '') {
    return
  }

  messages.value.push({
    id: nextMessageId.value,
    name: visitorName.value.trim() || '匿名访客',
    text,
  })

  nextMessageId.value += 1
  visitorName.value = ''
  messageDraft.value = ''
  saveMessagesToStorage()
}

function clearMessages() {
  messages.value = []
  nextMessageId.value = 1
  saveMessagesToStorage()
}
</script>

<template>
  <main class="app-shell">
    <section>
      <h1>Vite Vue Demo</h1>
      <p>这是正式 Vue 工程里的最小示例：状态、计算属性、事件和列表渲染。</p>

      <div class="counter">{{ count }}</div>
      <div class="actions">
        <button @click="count -= 1">-1</button>
        <button @click="count += 1">+1</button>
        <button @click="count = 0">Reset</button>
      </div>
      <p class="status">{{ countMessage }}</p>
    </section>

    <section>
      <h2>项目筛选</h2>
      <div class="filters">
        <button
          v-for="category in categories"
          :key="category"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <ul class="project-list">
        <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
      </ul>
    </section>

    <section>
      <h2>留言预览</h2>
      <form class="message-form" @submit.prevent="saveMessage">
        <label>
          你的名字
          <input v-model="visitorName" placeholder="例如：Francis" />
        </label>

        <label>
          留言内容
          <textarea v-model="messageDraft" placeholder="写一句想展示在页面上的话"></textarea>
        </label>

        <button type="submit" :disabled="messageDraft.trim() === ''">保存留言</button>
      </form>

      <div class="preview">
        <strong>{{ visitorName || '匿名访客' }}</strong>
        <p>{{ messageDraft || '这里会实时显示你的留言内容。' }}</p>
      </div>

      <button v-if="messages.length > 0" @click="clearMessages">清空留言</button>

      <ul class="message-list" v-if="messages.length > 0">
        <li class="message-item" v-for="message in messages" :key="message.id">
          <strong>{{ message.name }}</strong>
          <p>{{ message.text }}</p>
        </li>
      </ul>
      <p class="empty-message" v-else>还没有保存的留言。</p>
    </section>
  </main>
</template>
