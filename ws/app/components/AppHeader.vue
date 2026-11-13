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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { navItems } from '~/model'

defineEmits(['open-sidebar'])

const colorMode = useColorMode()

const isScrolled = ref(false)
const mobileNavOpen = ref(false)

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(val: boolean) {
    colorMode.preference = val ? 'dark' : 'light'
  }
})

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 105
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  syncClasses(isDark.value)
}

const syncClasses = (dark: boolean) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', dark)
    document.body.classList.toggle('dark', dark)
  }
}

watch(
  () => colorMode.value,
  (val) => {
    syncClasses(val === 'dark')
  },
  { immediate: true }
)

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    syncClasses(colorMode.value === 'dark')
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

