<template>
  <header :class="['header-section', isScrolled ? 'menu-fixed animated' : 'slideInUp']">
    <div class="container">
      <div class="header-wrapper">
        <!-- Logo -->
        <div class="main-logo">
          <NuxtLink to="/" class="logo">
            <h4>T<span class="txt-orange">e</span>xtio</h4>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="d-lg-block d-none">
          <ul class="main-menu one-page-nav">
            <li v-for="(item, idx) in navItems" :key="idx" class="position-relative">
              <NuxtLink :to="item.href">{{ item.label }}</NuxtLink>
              <ul v-if="item.subMenu" class="sub-menu">
                <li v-for="(sub, subIdx) in item.subMenu" :key="subIdx">
                  <NuxtLink :to="sub.href">{{ sub.label }}</NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Mobile Navigation Drawer -->
        <div class="d-lg-none d-block">
          <ul :class="['main-menu', { active: mobileNavOpen }]">
            <li v-for="(item, idx) in navItems" :key="idx" class="position-relative">
              <NuxtLink :to="item.href" @click="mobileNavOpen = false">{{ item.label }}</NuxtLink>
              <ul v-if="item.subMenu" class="sub-menu">
                <li v-for="(sub, subIdx) in item.subMenu" :key="subIdx">
                  <NuxtLink :to="sub.href" @click="mobileNavOpen = false">{{ sub.label }}</NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Right Side Menu Components -->
        <div class="menu-components d-flex align-items-center">
          <!-- Dark / Light Mode Toggle Button -->
          <button
            type="button"
            class="theme-toggle-btn d-flex align-items-center justify-content-center"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            @click="toggleTheme"
          >
            <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill'"></i>
          </button>

          <!-- Let's Talk CTA -->
          <a href="#contact" class="d-none d-xl-flex lets-talk align-items-center">
            <span class="get-text">Let's Talk&nbsp;</span>
            <span><i class="bi bi-arrow-up-right"></i></span>
          </a>

          <!-- Mobile Toggle Hamburger -->
          <div
            :class="['header-bar d-lg-none', { active: mobileNavOpen }]"
            @click="mobileNavOpen = !mobileNavOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <!-- Off-canvas Sidebar Trigger -->
          <div class="remove-click" @click="$emit('open-sidebar')">
            <div class="hamburger-menu"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits(['open-sidebar'])

const isScrolled = ref(false)
const mobileNavOpen = ref(false)
const isDark = ref(false)

const navItems = [
  {
    label: 'Home',
    href: '/',
    subMenu: [
      { label: 'Home One', href: '/' },
      { label: 'Home Two', href: '/#home-2' }
    ]
  },
  { label: 'About Me', href: '/#about' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Services', href: '/#services' },
  { label: 'Testimonial', href: '/#testimonial' },
  {
    label: 'Blog',
    href: '/blog-list',
    subMenu: [
      { label: 'Blog', href: '/blog-list' },
      { label: 'Blog Page', href: '/blog-list' },
      { label: 'Blog List', href: '/blog-list' },
      { label: 'Blog Right Sidebar', href: '/blog-list' },
      { label: 'Blog Details', href: '/blog-list' }
    ]
  },
  { label: 'Contact', href: '#contact' }
]

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 105
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (typeof document !== 'undefined') {
    if (isDark.value) {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      isDark.value = true
      document.body.classList.add('dark')
    }
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.theme-toggle-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(15, 14, 14, 0.1);
  background: var(--clr-light-gray);
  color: var(--clr-black);
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
}

.theme-toggle-btn:hover {
  background: var(--clr-orange);
  color: #fff;
  border-color: var(--clr-orange);
  transform: scale(1.05);
}

:global(.dark) .theme-toggle-btn {
  background: var(--clr-white-10);
  border-color: var(--clr-white-10);
  color: #fff;
}

:global(.dark) .theme-toggle-btn:hover {
  background: var(--clr-orange);
  color: #fff;
}
</style>

