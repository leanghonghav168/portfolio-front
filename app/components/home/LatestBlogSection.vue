<template>
  <section id="blogs" class="blogs section-pt">
    <div class="container">
      <div class="section-title">
        <h3>Latest Blog</h3>
        <span></span>
      </div>

      <div class="blog-item-wrap mt-5">
        <div
          v-for="(blog, idx) in blogs"
          :key="blog.id"
          :class="['blog-item border-bottom py-4', { 'is-active': activeId === idx }]"
          style="cursor: pointer; transition: all 0.3s ease;"
          @click="toggleItem(idx)"
        >
          <div class="blog-thumb row align-items-center">
            <div class="col-xl-6 col-lg-7 col-md-9">
              <h4 class="blog-title mb-0" style="font-family: var(--ff-syne); font-size: 22px; font-weight: 600;">
                {{ blog.title }}
              </h4>
            </div>
            <div class="col-xl-6 col-lg-5 col-md-3 d-none d-md-block text-end">
              <div class="position-relative d-inline-block">
                <div class="date d-flex align-items-baseline gap-1">
                  <h4 class="mb-0 fw-bold" style="font-family: var(--ff-syne); font-size: 24px;">{{ blog.date.day }}/</h4>
                  <h6 class="mb-0 text-muted" style="font-size: 15px;">{{ blog.date.month }}</h6>
                </div>
              </div>
            </div>
          </div>

          <!-- Expanded Image Panel -->
          <div v-show="activeId === idx" class="blog-panel mt-4 overflow-hidden rounded-3">
            <figure class="text-center mb-0">
              <img
                width="1196"
                height="600"
                :src="blog.img"
                :alt="blog.title"
                class="img-fluid w-100 object-fit-cover rounded-3"
                style="max-height: 480px;"
              />
            </figure>
          </div>
        </div>
      </div>

      <!-- View All Button linking to /blog-list -->
      <div class="view-all-btn-wrapper text-center mt-5">
        <NuxtLink to="/blog-list" class="bttn-round text-decoration-none">
          <span class="btn-txt">
            View All <i class="bi bi-arrow-up-right"></i>
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeId = ref<number | null>(0)

const toggleItem = (idx: number) => {
  activeId.value = activeId.value === idx ? null : idx
}

const blogs = [
  {
    id: 1,
    title: 'The Importance of User Centered Design in Startups',
    date: { day: '22', month: 'Dec', year: 2025 },
    img: '/images/blogs/blog-thumbnail.png'
  },
  {
    id: 2,
    title: 'How to Conduct Effective User Research',
    date: { day: '22', month: 'Dec', year: 2025 },
    img: '/images/blogs/blog-thumbnail.png'
  },
  {
    id: 3,
    title: 'The Role of Prototyping in Product Development',
    date: { day: '22', month: 'Dec', year: 2025 },
    img: '/images/blogs/blog-thumbnail.png'
  },
  {
    id: 4,
    title: 'The Power of Visual Storytelling in UI Design',
    date: { day: '22', month: 'Dec', year: 2025 },
    img: '/images/blogs/blog-thumbnail.png'
  }
]
</script>

<style scoped>
.blog-item {
  border-bottom: 1px solid rgba(15, 14, 14, 0.1) !important;
}

.blog-item.is-active .blog-title,
.blog-item:hover .blog-title {
  color: var(--clr-orange);
}

:global(.dark) .blog-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}
:global(.dark) .blog-item.is-active .blog-title,
:global(.dark) .blog-item:hover .blog-title {
  color: var(--clr-orange);
}
</style>

