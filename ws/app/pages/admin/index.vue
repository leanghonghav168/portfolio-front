<template>
  <div class="admin-dashboard-view">
    <!-- Welcome Header Banner -->
    <div class="welcome-banner p-4 p-lg-5 rounded-4 mb-4 position-relative overflow-hidden">
      <div class="row align-items-center position-relative z-2">
        <div class="col-lg-8 col-12 mb-3 mb-lg-0">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="badge-status-dot"></span>
            <span class="text-uppercase tracking-wider fw-bold fs-7 text-warning-emphasis">
              Portfolio Command Center
            </span>
          </div>
          <h1 class="welcome-title mb-2">
            Welcome back, <span class="txt-orange">{{ profileData.firstName }}</span> 👋
          </h1>
          <p class="welcome-subtitle text-muted mb-0">
            Manage your projects, live availability, technical skills, and incoming client inquiries from one central dashboard.
          </p>
        </div>

        <div class="col-lg-4 col-12 d-flex flex-wrap justify-content-lg-end gap-2">
          <NuxtLink to="/admin/projects" class="btn-primary-admin text-decoration-none">
            <i class="bi bi-plus-lg"></i>
            <span>Add Project</span>
          </NuxtLink>
          <NuxtLink to="/admin/profile" class="btn-secondary-admin text-decoration-none">
            <i class="bi bi-pencil-square"></i>
            <span>Edit Profile</span>
          </NuxtLink>
        </div>
      </div>
      <!-- Background Graphic Glow -->
      <div class="banner-glow-sphere" aria-hidden="true"></div>
    </div>

    <!-- Quick Metrics Cards Grid -->
    <div class="row g-3 g-lg-4 mb-5">
      <!-- Total Projects Metric -->
      <div class="col-xl-3 col-sm-6 col-12">
        <div class="stat-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="stat-icon-wrapper icon-orange">
              <i class="bi bi-folder-fill"></i>
            </span>
            <span class="stat-trend fw-bold">Live</span>
          </div>
          <div>
            <h2 class="stat-number mb-1">{{ portfolioData?.projects?.length || 0 }}</h2>
            <span class="stat-label">Showcase Projects</span>
          </div>
          <NuxtLink to="/admin/projects" class="stat-link mt-3 pt-2 border-top d-flex align-items-center justify-content-between text-decoration-none">
            <span>Manage Projects</span>
            <i class="bi bi-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>

      <!-- Skills Metric -->
      <div class="col-xl-3 col-sm-6 col-12">
        <div class="stat-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="stat-icon-wrapper icon-blue">
              <i class="bi bi-cpu-fill"></i>
            </span>
            <span class="stat-trend fw-bold">Active</span>
          </div>
          <div>
            <h2 class="stat-number mb-1">{{ portfolioData?.skills?.length || 0 }}</h2>
            <span class="stat-label">Technical Skills</span>
          </div>
          <NuxtLink to="/admin/skills" class="stat-link mt-3 pt-2 border-top d-flex align-items-center justify-content-between text-decoration-none">
            <span>Edit Tech Stack</span>
            <i class="bi bi-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>

      <!-- Experience Milestones -->
      <div class="col-xl-3 col-sm-6 col-12">
        <div class="stat-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="stat-icon-wrapper icon-green">
              <i class="bi bi-briefcase-fill"></i>
            </span>
            <span class="stat-trend fw-bold">15+ Yrs</span>
          </div>
          <div>
            <h2 class="stat-number mb-1">
              {{ (portfolioData?.workExperiences?.length || 0) + (portfolioData?.educations?.length || 0) }}
            </h2>
            <span class="stat-label">Career Milestones</span>
          </div>
          <NuxtLink to="/admin/experience" class="stat-link mt-3 pt-2 border-top d-flex align-items-center justify-content-between text-decoration-none">
            <span>View Timeline</span>
            <i class="bi bi-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>

      <!-- Inquiries Metric -->
      <div class="col-xl-3 col-sm-6 col-12">
        <div class="stat-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="stat-icon-wrapper icon-purple">
              <i class="bi bi-envelope-fill"></i>
            </span>
            <span v-if="unreadCount > 0" class="badge-unread">
              {{ unreadCount }} New
            </span>
            <span v-else class="stat-trend fw-bold">All Read</span>
          </div>
          <div>
            <h2 class="stat-number mb-1">{{ messagesList.length }}</h2>
            <span class="stat-label">Client Inquiries</span>
          </div>
          <NuxtLink to="/admin/messages" class="stat-link mt-3 pt-2 border-top d-flex align-items-center justify-content-between text-decoration-none">
            <span>Open Inbox</span>
            <i class="bi bi-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content Section: Projects & Inquiries Side by Side -->
    <div class="row g-4 mb-5">
      <!-- Left Column: Featured Projects Showcase -->
      <div class="col-xl-7 col-12">
        <div class="admin-panel p-4 rounded-4 h-100">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h3 class="panel-title mb-1">Portfolio Projects</h3>
              <p class="panel-subtitle text-muted mb-0">Active projects visible on the public showcase</p>
            </div>
            <NuxtLink to="/admin/projects" class="btn-sm-action text-decoration-none">
              <span>View All</span>
              <i class="bi bi-arrow-right"></i>
            </NuxtLink>
          </div>

          <!-- Project List Rows -->
          <div class="project-mini-list d-flex flex-column gap-3">
            <div
              v-for="project in (portfolioData?.projects || []).slice(0, 4)"
              :key="project.id"
              class="project-mini-card p-3 rounded-3 d-flex align-items-center justify-content-between gap-3"
            >
              <div class="d-flex align-items-center gap-3 min-w-0">
                <img
                  :src="project.img"
                  :alt="project.title"
                  class="project-mini-thumb rounded-2 flex-shrink-0"
                />
                <div class="min-w-0">
                  <h4 class="project-mini-title mb-1 text-truncate">{{ project.title }}</h4>
                  <div class="d-flex flex-wrap gap-1">
                    <span
                      v-for="(cat, cIdx) in (project.categoryTags || []).slice(0, 2)"
                      :key="cIdx"
                      class="tag-micro"
                    >
                      {{ cat }}
                    </span>
                    <span v-if="project.client" class="text-muted fs-8 ms-1 d-none d-sm-inline">
                      • {{ project.client }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Quick Link Actions -->
              <div class="d-flex align-items-center gap-2 flex-shrink-0">
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-icon-circle"
                  title="Live Demo"
                >
                  <i class="bi bi-box-arrow-up-right"></i>
                </a>
                <NuxtLink
                  to="/admin/projects"
                  class="btn-icon-circle"
                  title="Edit in Projects Manager"
                >
                  <i class="bi bi-pencil"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Recent Inquiries / Messages -->
      <div class="col-xl-5 col-12">
        <div class="admin-panel p-4 rounded-4 h-100">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h3 class="panel-title mb-1">Recent Inquiries</h3>
              <p class="panel-subtitle text-muted mb-0">Messages submitted via contact form</p>
            </div>
            <NuxtLink to="/admin/messages" class="btn-sm-action text-decoration-none">
              <span>Inbox</span>
              <i class="bi bi-arrow-right"></i>
            </NuxtLink>
          </div>

          <!-- Messages Mini List -->
          <div v-if="messagesList.length === 0" class="text-center py-5 text-muted">
            <i class="bi bi-inbox fs-2 d-block mb-2"></i>
            <p class="mb-0">No inquiries received yet.</p>
          </div>

          <div v-else class="inquiries-mini-list d-flex flex-column gap-3">
            <div
              v-for="msg in messagesList.slice(0, 4)"
              :key="msg.id"
              :class="['inquiry-mini-card p-3 rounded-3', { unread: !msg.isRead }]"
              @click="openMessageDetail(msg)"
            >
              <div class="d-flex align-items-center justify-content-between mb-1">
                <span class="inquiry-sender fw-bold text-truncate">{{ msg.name }}</span>
                <span class="inquiry-time text-muted fs-8">{{ formatTime(msg.createdAt) }}</span>
              </div>
              <p class="inquiry-subject mb-1 fw-semibold fs-7 text-truncate">{{ msg.subject || 'No Subject' }}</p>
              <p class="inquiry-snippet text-muted fs-8 mb-0 text-truncate">{{ msg.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Profile & Availability Bar -->
    <div class="admin-panel p-4 rounded-4 mb-4">
      <div class="row align-items-center justify-content-between gy-3">
        <div class="col-md-7 col-12 d-flex align-items-center gap-3">
          <img
            :src="profileData.portraitImg"
            alt="Profile Portrait"
            class="rounded-circle profile-thumb-bar flex-shrink-0"
          />
          <div>
            <h4 class="mb-1 fw-bold fs-6">{{ profileData.firstName }} {{ profileData.lastName }}</h4>
            <p class="text-muted fs-7 mb-0">{{ profileData.role }} • {{ profileData.clientsCount }} Worldwide Clients</p>
          </div>
        </div>

        <div class="col-md-5 col-12 d-flex align-items-center justify-content-md-end gap-3">
          <div class="d-flex align-items-center gap-2">
            <span class="fs-7 fw-semibold">Availability:</span>
            <span :class="['badge-availability', isAvailable ? 'available' : 'busy']">
              {{ isAvailable ? 'Available for Work' : 'Currently Booked' }}
            </span>
          </div>
          <button
            type="button"
            class="btn-toggle-availability btn btn-sm rounded-pill px-3"
            @click="toggleAvailability"
          >
            {{ isAvailable ? 'Mark Busy' : 'Mark Available' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Interactive Message Detail Modal -->
    <div
      v-if="selectedMessage"
      class="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-50 p-3"
      @click.self="selectedMessage = null"
    >
      <div class="modal-card-custom p-4 p-md-5 rounded-4 shadow-lg w-100 position-relative">
        <button
          type="button"
          class="btn-close-modal position-absolute top-3 end-3"
          aria-label="Close modal"
          @click="selectedMessage = null"
        >
          <i class="bi bi-x-lg"></i>
        </button>

        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="badge bg-warning-subtle text-warning-emphasis rounded-pill px-2.5 py-1 fs-8 fw-bold">
            Client Inquiry #{{ selectedMessage.id }}
          </span>
          <span class="text-muted fs-8">• {{ formatTime(selectedMessage.createdAt) }}</span>
        </div>

        <h3 class="mb-3 fw-bold">{{ selectedMessage.subject || 'Direct Inquiry' }}</h3>

        <div class="message-meta-box p-3 rounded-3 mb-4">
          <div class="row g-2 fs-7">
            <div class="col-sm-6">
              <span class="text-muted d-block fs-8">Sender Name:</span>
              <strong class="d-block">{{ selectedMessage.name }}</strong>
            </div>
            <div class="col-sm-6">
              <span class="text-muted d-block fs-8">Email Address:</span>
              <a :href="`mailto:${selectedMessage.email}`" class="text-decoration-none txt-orange fw-bold">
                {{ selectedMessage.email }}
              </a>
            </div>
            <div v-if="selectedMessage.phone" class="col-12 mt-2">
              <span class="text-muted d-block fs-8">Phone Number:</span>
              <span>{{ selectedMessage.phone }}</span>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <span class="text-muted fs-8 d-block mb-1 text-uppercase fw-bold">Message Content:</span>
          <div class="message-body-card p-3 rounded-3 fs-6">
            {{ selectedMessage.message }}
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-between pt-3 border-top">
          <a
            :href="`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Inquiry')}`"
            class="btn-primary-admin text-decoration-none"
          >
            <i class="bi bi-reply-fill"></i>
            <span>Reply via Email</span>
          </a>

          <button
            type="button"
            class="btn btn-outline-secondary rounded-pill px-4"
            @click="selectedMessage = null"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePortfolioApi, type ContactMessageItem } from '~/composables/usePortfolioApi'
import { heroProfileData } from '~/model'

definePageMeta({
  layout: 'admin'
})

const { fetchPortfolioBundle, fetchMessages, markMessageAsRead, updateAbout } = usePortfolioApi()

const { data: portfolioData, refresh } = await fetchPortfolioBundle()

const messagesList = ref<ContactMessageItem[]>([])
const selectedMessage = ref<ContactMessageItem | null>(null)

const profileData = computed(() => {
  return portfolioData.value?.profile || heroProfileData
})

const isAvailable = computed(() => {
  return portfolioData.value?.about?.isAvailableForWork ?? true
})

const unreadCount = computed(() => {
  return messagesList.value.filter(m => !m.isRead).length
})

const loadMessages = async () => {
  messagesList.value = await fetchMessages()
}

onMounted(() => {
  loadMessages()
})

const toggleAvailability = async () => {
  if (portfolioData.value?.about) {
    const newState = !portfolioData.value.about.isAvailableForWork
    portfolioData.value.about.isAvailableForWork = newState
    try {
      await updateAbout({ isAvailableForWork: newState })
    } catch (err) {
      console.warn('Backend unavailable, availability state stored in session:', err)
    }
  }
}

const openMessageDetail = (msg: ContactMessageItem) => {
  selectedMessage.value = msg
  if (!msg.isRead) {
    msg.isRead = true
    markMessageAsRead(msg.id, true)
  }
}

const formatTime = (isoString?: string) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
/* Welcome Banner */
.welcome-banner {
  background: linear-gradient(135deg, rgba(231, 111, 43, 0.12) 0%, rgba(243, 156, 18, 0.05) 100%);
  border: 1px solid rgba(231, 111, 43, 0.2);
}

:global(.dark) .welcome-banner {
  background: linear-gradient(135deg, rgba(231, 111, 43, 0.18) 0%, rgba(20, 20, 26, 0.6) 100%);
  border: 1px solid rgba(231, 111, 43, 0.25);
}

.welcome-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
}

.welcome-subtitle {
  font-size: 0.95rem;
  max-width: 620px;
}

.banner-glow-sphere {
  position: absolute;
  right: -50px;
  bottom: -50px;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(231, 111, 43, 0.3) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}

.badge-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #e76f2b;
  display: inline-block;
  box-shadow: 0 0 8px #e76f2b;
}

/* Stat Cards */
.stat-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

:global(.dark) .stat-card {
  background-color: #121217;
  border: 1px solid #22222a;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border-color: #e76f2b;
}

.stat-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.icon-orange {
  background-color: rgba(231, 111, 43, 0.15);
  color: #e76f2b;
}

.icon-blue {
  background-color: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.icon-green {
  background-color: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.icon-purple {
  background-color: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
}

.stat-number {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 2.2rem;
}

.stat-label {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 600;
}

.stat-trend {
  font-size: 0.75rem;
  color: #10b981;
  background-color: rgba(16, 185, 129, 0.1);
  padding: 3px 8px;
  border-radius: 20px;
}

.badge-unread {
  font-size: 0.75rem;
  font-weight: 700;
  background-color: #ef4444;
  color: #ffffff;
  padding: 3px 8px;
  border-radius: 20px;
}

.stat-link {
  font-size: 0.82rem;
  font-weight: 700;
  color: #4b5563;
  transition: color 0.2s ease;
}

:global(.dark) .stat-link {
  color: #9ca3af;
  border-color: #22222a !important;
}

.stat-link:hover {
  color: #e76f2b;
}

/* Admin Panels */
.admin-panel {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

:global(.dark) .admin-panel {
  background-color: #121217;
  border: 1px solid #22222a;
}

.panel-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
}

.panel-subtitle {
  font-size: 0.85rem;
}

.btn-sm-action {
  font-size: 0.82rem;
  font-weight: 700;
  color: #e76f2b;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Projects mini list */
.project-mini-card {
  background-color: #f9fafb;
  border: 1px solid #f3f4f6;
  transition: all 0.2s ease;
}

:global(.dark) .project-mini-card {
  background-color: #17171d;
  border: 1px solid #23232c;
}

.project-mini-card:hover {
  border-color: #e76f2b;
  transform: translateX(2px);
}

.project-mini-thumb {
  width: 52px;
  height: 52px;
  object-fit: cover;
}

.project-mini-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
}

.tag-micro {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background-color: #e5e7eb;
  color: #374151;
}

:global(.dark) .tag-micro {
  background-color: #272733;
  color: #d1d5db;
}

.btn-icon-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  text-decoration: none;
  transition: all 0.2s ease;
}

:global(.dark) .btn-icon-circle {
  border-color: #2b2b36;
  color: #9ca3af;
}

.btn-icon-circle:hover {
  background-color: #e76f2b;
  color: #ffffff;
  border-color: #e76f2b;
}

/* Inquiries Mini List */
.inquiry-mini-card {
  background-color: #f9fafb;
  border: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.2s ease;
}

:global(.dark) .inquiry-mini-card {
  background-color: #17171d;
  border: 1px solid #23232c;
}

.inquiry-mini-card:hover {
  border-color: #e76f2b;
  transform: translateX(2px);
}

.inquiry-mini-card.unread {
  border-left: 3px solid #e76f2b;
  background-color: rgba(231, 111, 43, 0.05);
}

/* Buttons */
.btn-primary-admin {
  background: linear-gradient(135deg, #e76f2b 0%, #f39c12 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  box-shadow: 0 4px 14px rgba(231, 111, 43, 0.25);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn-primary-admin:hover {
  opacity: 0.95;
  transform: translateY(-1px);
  color: #ffffff;
}

.btn-secondary-admin {
  background-color: #ffffff;
  color: #111114;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

:global(.dark) .btn-secondary-admin {
  background-color: #1b1b22;
  color: #ffffff;
  border-color: #2b2b36;
}

.btn-secondary-admin:hover {
  border-color: #e76f2b;
  color: #e76f2b;
}

.profile-thumb-bar {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 2px solid #e76f2b;
}

.badge-availability {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
}

.badge-availability.available {
  background-color: #d1fae5;
  color: #065f46;
}

:global(.dark) .badge-availability.available {
  background-color: #064e3b44;
  color: #34d399;
}

.badge-availability.busy {
  background-color: #fee2e2;
  color: #991b1b;
}

.btn-toggle-availability {
  background-color: #e76f2b;
  color: #ffffff;
  font-weight: 700;
}

/* Modal */
.modal-backdrop-custom {
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
}

.modal-card-custom {
  max-width: 620px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

:global(.dark) .modal-card-custom {
  background-color: #141419;
  border: 1px solid #262630;
  color: #f1f1f5;
}

.btn-close-modal {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #9ca3af;
  cursor: pointer;
}

.message-meta-box {
  background-color: #f9fafb;
}

:global(.dark) .message-meta-box {
  background-color: #1a1a22;
}

.message-body-card {
  background-color: #f3f4f6;
  white-space: pre-wrap;
  line-height: 1.6;
}

:global(.dark) .message-body-card {
  background-color: #1e1e28;
}

.fs-7 {
  font-size: 0.85rem;
}
.fs-8 {
  font-size: 0.75rem;
}

/* All forms: black text and white background */
.form-control,
.form-select,
input,
textarea,
select {
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 1.5px solid #d1d5db !important;
  font-weight: 500 !important;
}

.form-control::placeholder,
input::placeholder,
textarea::placeholder {
  color: #64748b !important;
  opacity: 1 !important;
}

.form-control:focus,
.form-select:focus,
input:focus,
textarea:focus,
select:focus {
  background-color: #ffffff !important;
  color: #000000 !important;
  border-color: #e76f2b !important;
  box-shadow: 0 0 0 3px rgba(231, 111, 43, 0.25) !important;
}

select option {
  background-color: #ffffff !important;
  color: #000000 !important;
}

.form-label {
  color: #111827;
  font-weight: 700;
}

:global(.dark) .form-label {
  color: #f9fafb !important;
}
</style>
