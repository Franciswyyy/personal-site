<script setup>
defineProps({
  totalCount: Number,
  pendingCount: Number,
  doneCount: Number,
})
</script>

<template>
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
</template>
