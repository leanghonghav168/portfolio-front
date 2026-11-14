<template>
  <div class="admin-shell d-flex min-vh-100">
    <!-- Backdrop for mobile drawer -->
    <div
      v-if="isMobileMenuOpen"
      class="sidebar-backdrop position-fixed top-0 start-0 w-100 h-100 z-40 d-lg-none"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Left Admin Sidebar -->
    <aside
      :class="[
        'admin-sidebar d-flex flex-column flex-shrink-0 z-50',
        { 'mobile-open': isMobileMenuOpen }
      ]"
    >
      <!-- Sidebar Brand Header -->
      <div class="sidebar-header d-flex align-items-center justify-content-between p-4 border-bottom">
        <NuxtLink to="/admin" class="d-flex align-items-center gap-2 text-decoration-none">
          <span class="brand-avatar">T</span>
          <div>
            <h4 class="brand-title mb-0">Textio <span class="txt-orange">CMS</span></h4>
            <span class="brand-badge">Portfolio Admin</span>
          </div>
        </NuxtLink>

        <!-- Close button on mobile -->
        <button
          type="button"
          class="btn-close-sidebar d-lg-none"
          aria-label="Close Sidebar"
          @click="isMobileMenuOpen = false"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <!-- Live Backend Connection Status Pill -->
      <div class="px-4 py-3 border-bottom">
        <div class="connection-pill d-flex align-items-center justify-content-between p-2 rounded-3">
          <div class="d-flex align-items-center gap-2">
            <span :class="['status-dot', isConnected ? 'online' : 'fallback']"></span>
            <span class="status-text fw-medium">
              {{ isConnected ? 'PostgreSQL API Online' : 'Local Fallback Mode' }}
            </span>
          </div>
          <button
            type="button"
            class="btn-refresh-status"
            title="Check API Health"
            @click="verifyConnection"
          >
            <i :class="['bi bi-arrow-repeat', { 'spin-icon': isChecking }]"></i>
          </button>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="sidebar-nav flex-grow-1 p-3 overflow-y-auto">
        <ul class="nav flex-column gap-1 list-unstyled mb-0">
          <li v-for="item in navLinks" :key="item.path">
            <NuxtLink
              :to="item.path"
              :class="[
                'nav-item-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-decoration-none',
                { active: isActiveRoute(item.path) }
              ]"
              @click="isMobileMenuOpen = false"
            >
              <i :class="['nav-icon fs-5', item.icon]"></i>
              <span class="nav-label fw-semibold">{{ item.label }}</span>
              <span v-if="item.badge" class="nav-badge ms-auto">{{ item.badge }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Sidebar Footer User / External Link -->
      <div class="sidebar-footer p-3 border-top mt-auto">
        <NuxtLink
          to="/"
          target="_blank"
          class="btn-view-site d-flex align-items-center justify-content-center gap-2 w-100 py-2.5 px-3 rounded-3 text-decoration-none fw-bold"
        >
          <span>View Live Portfolio</span>
          <i class="bi bi-arrow-up-right"></i>
        </NuxtLink>
      </div>
    </aside>

    <!-- Right Side: Content Area -->
    <div class="admin-main-wrapper flex-grow-1 d-flex flex-column min-w-0">
      <!-- Admin Top Bar -->
      <header class="admin-topbar sticky-top d-flex align-items-center justify-content-between px-4 py-3 border-bottom z-30">
        <!-- Left: Mobile Menu Toggle & Breadcrumbs -->
        <div class="d-flex align-items-center gap-3">
          <button
            type="button"
            class="btn-menu-toggle d-lg-none"
            aria-label="Toggle Navigation"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <i class="bi bi-list fs-4"></i>
          </button>

          <div class="topbar-breadcrumb">
            <span class="breadcrumb-prefix text-muted">Admin /</span>
            <span class="breadcrumb-current fw-bold ms-1">{{ currentSectionTitle }}</span>
          </div>
        </div>

        <!-- Right: Actions & Theme Switcher -->
        <div class="d-flex align-items-center gap-3">
          <!-- Availability Badge Status Preview -->
          <NuxtLink
            to="/admin/profile"
            class="availability-pill d-none d-sm-flex align-items-center gap-2 px-3 py-1.5 rounded-pill text-decoration-none"
          >
            <span class="status-indicator-dot"></span>
            <span class="fw-semibold fs-7">Available for Work</span>
          </NuxtLink>

          <!-- Theme Toggle -->
          <button
            type="button"
            class="btn-theme-toggle d-flex align-items-center justify-content-center rounded-circle"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            @click="toggleTheme"
          >
            <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill'"></i>
          </button>
        </div>
      </header>

      <!-- Main Slot Content -->
      <main class="admin-content-container p-4 p-lg-5 flex-grow-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePortfolioApi } from '~/composables/usePortfolioApi'

const route = useRoute()
const colorMode = useColorMode()
const { checkBackendHealth } = usePortfolioApi()

const isMobileMenuOpen = ref(false)
const isConnected = ref(false)
const isChecking = ref(false)

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(val: boolean) {
    colorMode.preference = val ? 'dark' : 'light'
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const verifyConnection = async () => {
  isChecking.value = true
  try {
    isConnected.value = await checkBackendHealth()
  } finally {
    setTimeout(() => {
      isChecking.value = false
    }, 400)
  }
}

onMounted(() => {
  verifyConnection()
})

const navLinks = [
  { label: 'Overview', path: '/admin', icon: 'bi bi-grid-1x2-fill' },
  { label: 'Hero & Profile', path: '/admin/profile', icon: 'bi bi-person-badge-fill' },
  { label: 'Projects & Work', path: '/admin/projects', icon: 'bi bi-folder-fill' },
  { label: 'Skills & Tech', path: '/admin/skills', icon: 'bi bi-cpu-fill' },
  { label: 'Services', path: '/admin/services', icon: 'bi bi-layers-fill' },
  { label: 'Experience & Edu', path: '/admin/experience', icon: 'bi bi-mortarboard-fill' },
  { label: 'Messages Inbox', path: '/admin/messages', icon: 'bi bi-envelope-fill' },
]

const isActiveRoute = (path: string) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

const currentSectionTitle = computed(() => {
  const current = navLinks.find(item => isActiveRoute(item.path))
  return current ? current.label : 'Dashboard'
})
</script>

<style scoped>
/* Admin Shell Theme Alignment */
.admin-shell {
  background-color: #f8f9fb;
  color: #121316;
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

:global(.dark) .admin-shell {
  background-color: #0b0b0d;
  color: #f1f1f5;
}

/* Sidebar */
.admin-sidebar {
  width: 270px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

:global(.dark) .admin-sidebar {
  background-color: #111114;
  border-right: 1px solid #202026;
}

/* Mobile responsive drawer */
@media (max-width: 991.98px) {
  .admin-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
  }
  .admin-sidebar.mobile-open {
    transform: translateX(0);
  }
  .sidebar-backdrop {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
  }
}

/* Brand Header */
.brand-avatar {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #e76f2b 0%, #f39c12 100%);
  color: #ffffff;
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.brand-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #111114;
}

:global(.dark) .brand-title {
  color: #ffffff;
}

.txt-orange {
  color: #e76f2b;
}

.brand-badge {
  font-size: 0.72rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}

/* Status Pill */
.connection-pill {
  background-color: #f3f4f6;
  font-size: 0.8rem;
}

:global(.dark) .connection-pill {
  background-color: #17171c;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.online {
  background-color: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.status-dot.fallback {
  background-color: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
}

.btn-refresh-status {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0 4px;
}

.spin-icon {
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

/* Navigation Links */
.nav-item-link {
  color: #4b5563;
  transition: all 0.2s ease;
}

:global(.dark) .nav-item-link {
  color: #9ca3af;
}

.nav-item-link:hover {
  background-color: #f3f4f6;
  color: #111114;
}

:global(.dark) .nav-item-link:hover {
  background-color: #1a1a22;
  color: #ffffff;
}

.nav-item-link.active {
  background-color: #e76f2b;
  color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(231, 111, 43, 0.3);
}

.nav-item-link.active .nav-icon {
  color: #ffffff;
}

/* View Live Site Button */
.btn-view-site {
  background-color: #111114;
  color: #ffffff;
  font-size: 0.875rem;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.btn-view-site:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

:global(.dark) .btn-view-site {
  background-color: #24242e;
  color: #ffffff;
}

/* Topbar */
.admin-topbar {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
}

:global(.dark) .admin-topbar {
  background-color: rgba(17, 17, 20, 0.85);
  border-bottom: 1px solid #202026;
}

.breadcrumb-prefix {
  font-size: 0.9rem;
}

.breadcrumb-current {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 1.1rem;
}

.availability-pill {
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

:global(.dark) .availability-pill {
  background-color: #064e3b33;
  color: #34d399;
  border: 1px solid #065f46;
}

.status-indicator-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 6px #10b981;
}

.btn-theme-toggle {
  width: 40px;
  height: 40px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: #111114;
  cursor: pointer;
  transition: all 0.2s ease;
}

:global(.dark) .btn-theme-toggle {
  background-color: #17171c;
  border: 1px solid #282832;
  color: #f3f4f6;
}

.btn-theme-toggle:hover {
  border-color: #e76f2b;
  color: #e76f2b;
}

.btn-menu-toggle,
.btn-close-sidebar {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}
</style>
