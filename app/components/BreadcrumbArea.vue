<template>
  <section class="breadcumb-area">
    <div class="container">
      <h2>{{ title }}</h2>
      <ul class="list-unstyled mb-0">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <span>{{ currentPage }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    currentPage?: string
  }>(),
  {
    title: 'Blog List',
    currentPage: 'Blog List'
  }
)
</script>

