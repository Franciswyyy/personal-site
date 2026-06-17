<script setup>
defineProps({
  task: Object,
})

const emit = defineEmits(['toggle-task', 'edit-task', 'delete-task'])
</script>

<template>
  <li class="task-item" :class="{ done: task.done }">
    <label class="task-check">
      <input
        type="checkbox"
        :checked="task.done"
        @change="emit('toggle-task', task)"
      />
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
      <button
        type="button"
        @click="emit('edit-task', task)"
      >
        编辑
      </button>
      <button
        type="button"
        @click="emit('delete-task', task.id)"
      >
        删除
      </button>
    </div>
  </li>
</template>
