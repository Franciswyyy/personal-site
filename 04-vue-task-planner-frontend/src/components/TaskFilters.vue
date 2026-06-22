<script setup>
defineProps({
  categories: Array,
  statusFilter: String,
  categoryFilter: String,
})

const emit = defineEmits(['update:statusFilter', 'update:categoryFilter'])
</script>

<template>
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
        <select
          :value="statusFilter"
          @change="emit('update:statusFilter', $event.target.value)"
        >
          <option>全部</option>
          <option>未完成</option>
          <option>已完成</option>
        </select>
      </label>

      <label class="field">
        <span>分类</span>
        <select
          :value="categoryFilter"
          @change="emit('update:categoryFilter', $event.target.value)"
        >
          <option>全部</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>
