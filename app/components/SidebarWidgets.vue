<template>
  <div class="sidebar-widgets">
    <!-- Search Widget -->
    <div class="sidebar-single-widget mb-30">
      <h5 class="pb-20">Search Here</h5>
      <form class="widget-search" @submit.prevent>
        <input
          v-model="searchQuery"
          type="text"
          name="search"
          placeholder="Enter Your Keyword"
        />
        <button type="submit" aria-label="Search">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>

    <!-- Category / Service List Widget -->
    <div class="sidebar-single-widget category-widget mb-30">
      <h5 class="pb-10">Service List</h5>
      <ul class="list-unstyled mb-0">
        <li v-for="(category, idx) in categories" :key="idx">
          <NuxtLink to="/blog-list">
            <i class="fa-solid fa-caret-right"></i> {{ category }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Social Icons Widget -->
    <div class="sidebar-single-widget socialicon-widget mb-30">
      <h5 class="pb-20">Social Icons</h5>
      <ul class="d-flex flex-wrap gap-3 list-unstyled mb-0">
        <li>
          <a href="#" target="_blank" class="social-link"><i class="fa-brands fa-facebook-f"></i></a>
        </li>
        <li>
          <a href="#" target="_blank" class="social-link"><i class="fa-brands fa-twitter"></i></a>
        </li>
        <li>
          <a href="#" target="_blank" class="social-link"><i class="fa-brands fa-instagram"></i></a>
        </li>
        <li>
          <a href="#" target="_blank" class="social-link"><i class="fa-brands fa-dribbble"></i></a>
        </li>
      </ul>
    </div>

    <!-- Newest Posts Widget -->
    <div class="sidebar-single-widget">
      <h5 class="pb-20">Newest Posts</h5>
      <div class="sidebar-blog-widgets">
        <div v-for="item in newestPosts" :key="item.id" class="single-item">
          <div class="thumb">
            <NuxtLink to="/blog-list">
              <img
                :src="item.img"
                :alt="item.title"
                width="70"
                height="70"
                class="img-fluid object-fit-cover"
              />
            </NuxtLink>
          </div>
          <div class="content">
            <span>
              by <NuxtLink to="/blog-list">{{ item.author }}</NuxtLink>
            </span>
            <h4>
              <NuxtLink to="/blog-list">{{ item.title }}</NuxtLink>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const categories = [
  'UX strategy',
  'Information architecture',
  'Prototyping',
  'Wireframing',
  'UI Design',
  'Figma Design'
]

const newestPosts = [
  {
    id: 1,
    img: '/images/service/service-1.png',
    author: 'Creativemela',
    title: 'Fusce tincidunt commodo sapien, quis portitor.',
    date: { day: '22', month: 'Dec', year: 2025 }
  },
  {
    id: 2,
    img: '/images/service/service-2.png',
    author: 'Creativemela',
    title: 'Duis eu orci porta, lacinia tortor auctor vulputate.',
    date: { day: '22', month: 'Dec', year: 2025 }
  },
  {
    id: 3,
    img: '/images/service/service-3.png',
    author: 'Creativemela',
    title: 'Suspendisse justo justo, elementum id egestas.',
    date: { day: '22', month: 'Dec', year: 2025 }
  },
  {
    id: 4,
    img: '/images/service/service-1.png',
    author: 'Creativemela',
    title: 'Mauris luctus, tellus sit amet sagittis viverra.',
    date: { day: '22', month: 'Dec', year: 2025 }
  }
]
</script>

<style scoped>
.social-link {
  width: 44px;
  height: 44px;
  background: var(--clr-white);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-black);
  transition: all 0.3s ease;
  border: 1px solid rgba(15, 14, 14, 0.08);
}

.social-link:hover {
  background: var(--clr-orange);
  color: var(--clr-white) !important;
  transform: translateY(-3px);
  border-color: var(--clr-orange);
}

:global(.dark) .social-link {
  background: var(--clr-white-10);
  color: var(--clr-white);
  border-color: transparent;
}

:global(.dark) .social-link:hover {
  background: var(--clr-orange);
  color: var(--clr-white) !important;
}
</style>

