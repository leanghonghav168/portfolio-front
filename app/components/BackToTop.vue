<template>
  <div
    :class="['progress-wrap', { 'active-progress': isVisible }]"
    style="cursor: pointer"
    @click="scrollToTop"
  >
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
      <path
        d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
        :style="{
          transition: 'stroke-dashoffset 10ms linear',
          strokeDasharray: '307.919, 307.919',
          strokeDashoffset: strokeOffset
        }"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const strokeOffset = ref(307.919)

const handleScroll = () => {
  if (typeof window === 'undefined') return
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const percent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0
  const pathLength = 307.919
  strokeOffset.value = pathLength - (pathLength * percent) / 100
  isVisible.value = scrollY > 200
}

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

