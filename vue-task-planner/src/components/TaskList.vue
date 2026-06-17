<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: Array,
  filteredTasks: Array,
})

const emit = defineEmits(['clear-local-storage', 'toggle-task', 'edit-task', 'delete-task'])
</script>

<template>
  <section class="panel task-list-panel" aria-labelledby="list-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">List</p>
        <h2 id="list-title">任务列表</h2>
      </div>
      <div class="section-actions">
        <span class="helper-text">任务变化会保存到当前浏览器</span>
        <button
          class="danger-button"
          type="button"
          @click="emit('clear-local-storage')"
        >
          清除本地缓存
        </button>
      </div>
    </div>

    <p v-if="tasks.length === 0" class="empty-state">
      还没有任务，先添加一个学习计划吧。
    </p>
    <p v-else-if="filteredTasks.length === 0" class="empty-state">
      当前没有符合条件的任务。可以调整筛选条件，或者添加一个新任务。
    </p>
    <ul v-else class="task-list">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-task="emit('toggle-task', $event)"
        @edit-task="emit('edit-task', $event)"
        @delete-task="emit('delete-task', $event)"
      />
    </ul>
  </section>
</template>
