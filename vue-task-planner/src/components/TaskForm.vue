<script setup>
defineProps({
  categories: Array,
  title: String,
  category: String,
  priority: String,
  note: String,
  isEditing: Boolean,
  isSaving: Boolean,
})

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:priority',
  'update:note',
  'submit-task',
  'clear-form',
])
</script>

<template>
  <section class="panel task-form-panel" aria-labelledby="form-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Form</p>
        <h2 id="form-title">新增 / 编辑任务</h2>
      </div>
      <span class="helper-text">填写任务信息后，可以新增或保存修改</span>
    </div>

    <form class="task-form">
      <label class="field field-wide">
        <span>任务标题</span>
        <input
          :value="title"
          type="text"
          placeholder="例如：学习 Vue 事件处理"
          @input="emit('update:title', $event.target.value)"
        />
      </label>

      <label class="field">
        <span>分类</span>
        <select
          :value="category"
          @change="emit('update:category', $event.target.value)"
        >
          <option
            v-for="categoryOption in categories"
            :key="categoryOption"
            :value="categoryOption"
          >
            {{ categoryOption }}
          </option>
        </select>
      </label>

      <label class="field">
        <span>优先级</span>
        <select
          :value="priority"
          @change="emit('update:priority', $event.target.value)"
        >
          <option>低</option>
          <option>中</option>
          <option>高</option>
        </select>
      </label>

      <label class="field field-wide">
        <span>备注</span>
        <textarea
          :value="note"
          placeholder="写一点学习目标或补充说明"
          @input="emit('update:note', $event.target.value)"
        ></textarea>
      </label>

      <div class="form-actions">
        <button
          class="primary-button"
          type="button"
          :disabled="isSaving"
          @click="emit('submit-task')"
        >
          {{ isSaving ? '保存中...' : isEditing ? '保存修改' : '添加任务' }}
        </button>
        <button
          class="ghost-button"
          type="button"
          :disabled="isSaving"
          @click="emit('clear-form')"
        >
          清空
        </button>
      </div>
    </form>
  </section>
</template>
