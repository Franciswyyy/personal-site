<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: Array,
  filteredTasks: Array,
  isLoading: Boolean,
  activeTaskId: Number,
  errorMessage: String,
})

const emit = defineEmits(['reload-tasks', 'toggle-task', 'edit-task', 'delete-task'])
</script>

<template>
  <section class="panel task-list-panel" aria-labelledby="list-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">List</p>
        <h2 id="list-title">任务列表</h2>
      </div>
      <div class="section-actions">
        <span class="helper-text">任务列表来自后端接口</span>
        <button
          class="ghost-button"
          type="button"
          @click="emit('reload-tasks')"
        >
          重新加载
        </button>
      </div>
    </div>

    <p v-if="isLoading" class="empty-state">
      正在从后端加载任务...
    </p>
    <p v-else-if="errorMessage" class="empty-state">
      {{ errorMessage }}
    </p>
    <p v-else-if="tasks.length === 0" class="empty-state">
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
        :is-busy="activeTaskId === task.id"
        @toggle-task="emit('toggle-task', $event)"
        @edit-task="emit('edit-task', $event)"
        @delete-task="emit('delete-task', $event)"
      />
    </ul>
  </section>
</template>
