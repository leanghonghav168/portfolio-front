<template>
  <div>
    <!-- Preloader / Top Header -->
    <AppHeader @open-sidebar="isSidebarOpen = true" />

    <!-- Off-canvas Sidebar -->
    <OffcanvasSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Main Content -->
    <slot />

    <!-- Contact & Footer -->
    <ContactSection />
    <AppFooter />

    <!-- Scroll To Top Indicator -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isSidebarOpen = ref(false)
</script>

