<template>
  <main>
    <!-- Breadcrumb Area -->
    <BreadcrumbArea title="Blog List" current-page="Blog List" />

    <!-- Blog List & Sidebar Section -->
    <section class="blogs-section blog-list-wrapper py-5">
      <div class="container">
        <div class="row">
          <!-- Main Blog List Column -->
          <div class="col-lg-8 mb-30">
            <div class="blog-items-list">
              <BlogListItem
                v-for="post in blogPosts"
                :key="post.id"
                :post="post"
              />
            </div>

            <!-- Pagination -->
            <div class="row mt-4">
              <div class="col-lg-12">
                <GlenicPagination v-model="activePage" :total-pages="3" />
              </div>
            </div>
          </div>

          <!-- Sidebar Column -->
          <div class="col-lg-4">
            <SidebarWidgets />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BlogPost } from '~/components/BlogListItem.vue'

useHead({
  title: 'Blog List - Textio Personal Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Browse the latest articles, design stories, and creative insights.'
    }
  ]
})

const activePage = ref(2)

const blogPosts = ref<BlogPost[]>([
  {
    id: 1,
    img: '/images/blogs/blog-1.png',
    author: 'Tawam',
    category: 'Graphic',
    date: { day: '22', month: 'Dec', year: 2025 },
    title: 'Portrait of adult male working from home at night',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis explicabo blanditiis cum. Quasi adipisci reprehenderit tempora ab sed fugit deserunt ...'
  },
  {
    id: 2,
    img: '/images/blogs/blog-2.png',
    author: 'Tawam',
    category: 'Graphic',
    date: { day: '22', month: 'Dec', year: 2025 },
    title: 'Portrait of adult male working from home at night',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis explicabo blanditiis cum. Quasi adipisci reprehenderit tempora ab sed fugit deserunt ...'
  },
  {
    id: 3,
    img: '/images/blogs/blog-1.png',
    author: 'Tawam',
    category: 'Graphic',
    date: { day: '22', month: 'Dec', year: 2025 },
    title: 'Portrait of adult male working from home at night',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis explicabo blanditiis cum. Quasi adipisci reprehenderit tempora ab sed fugit deserunt ...'
  },
  {
    id: 4,
    img: '/images/blogs/blog-1.png',
    author: 'Tawam',
    category: 'Graphic',
    date: { day: '22', month: 'Dec', year: 2025 },
    title: 'Portrait of adult male working from home at night',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis explicabo blanditiis cum. Quasi adipisci reprehenderit tempora ab sed fugit deserunt ...'
  },
  {
    id: 5,
    img: '/images/blogs/blog-2.png',
    author: 'Tawam',
    category: 'Graphic',
    date: { day: '22', month: 'Dec', year: 2025 },
    title: 'Portrait of adult male working from home at night',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis explicabo blanditiis cum. Quasi adipisci reprehenderit tempora ab sed fugit deserunt ...'
  },
  {
    id: 6,
    img: '/images/blogs/blog-1.png',
    author: 'Tawam',
    category: 'Graphic',
    date: { day: '22', month: 'Dec', year: 2025 },
    title: 'Portrait of adult male working from home at night',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis explicabo blanditiis cum. Quasi adipisci reprehenderit tempora ab sed fugit deserunt ...'
  }
])
</script>

