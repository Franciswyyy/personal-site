<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li class="project-card">
    <h3>{{ project.name }}</h3>
    <p>{{ project.description }}</p>
    <span>{{ project.category }}</span>
  </li>
</template>
