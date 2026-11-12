<template>
  <div class="blog-list-item row mb-30 align-items-center">
    <div class="col-md-5">
      <div class="blog-thumb overflow-hidden rounded">
        <NuxtLink to="/blog-list">
          <img
            :src="post.img"
            :alt="post.title"
            width="442"
            height="222"
            class="img-fluid w-100 object-fit-cover"
            style="border-radius: 8px; transition: transform 0.5s ease;"
          />
        </NuxtLink>
      </div>
    </div>
    <div class="col-md-7 mt-3 mt-md-0">
      <h5>
        <NuxtLink to="/blog-list">{{ post.title }}</NuxtLink>
      </h5>
      <div class="blog-meta d-inline-flex flex-wrap align-items-center gap-3 gap-xl-4">
        <span class="d-inline">
          by <span class="sub-text">{{ post.author }}</span> | {{ post.category }}
        </span>
        <span class="date d-inline-flex align-items-center">
          {{ post.date.day }} {{ post.date.month }} {{ post.date.year }}
        </span>
      </div>
      <p class="my-2 overflow-hidden">{{ post.description }}</p>
      <div>
        <span class="read-more">
          <NuxtLink to="/blog-list">Read More</NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface BlogPost {
  id: number
  img: string
  author: string
  category: string
  date: {
    day: string | number
    month: string
    year: number
  }
  title: string
  description: string
}

defineProps<{
  post: BlogPost
}>()
</script>

<style scoped>
.blog-thumb:hover img {
  transform: scale(1.05);
}
</style>

