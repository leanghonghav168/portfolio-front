<template>
  <div class="admin-projects-view">
    <!-- Header Row -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h1 class="page-headline mb-1">Projects & Case Studies</h1>
        <p class="text-muted mb-0 fs-7">Manage, update, and publish showcase projects displayed on your portfolio.</p>
      </div>

      <button
        type="button"
        class="btn-primary-admin"
        @click="openCreateModal"
      >
        <i class="bi bi-plus-circle"></i>
        <span>Add New Project</span>
      </button>
    </div>

    <!-- Search & Filter Bar -->
    <div class="filter-bar p-3 rounded-4 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
      <div class="search-input-wrapper position-relative flex-grow-1" style="max-width: 380px;">
        <i class="bi bi-search position-absolute top-50 start-3 translate-middle-y text-muted"></i>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control rounded-pill ps-5"
          placeholder="Search projects by title, client, tech..."
        />
      </div>

      <div class="d-flex align-items-center gap-2">
        <span class="fs-8 text-muted fw-bold text-uppercase">Filter:</span>
        <button
          v-for="cat in availableCategories"
          :key="cat"
          type="button"
          :class="['btn-filter rounded-pill px-3 py-1 fs-8', { active: activeFilter === cat }]"
          @click="activeFilter = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="row g-4">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="col-xl-6 col-12"
      >
        <div class="project-admin-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between">
          <div>
            <!-- Thumbnail & Badge -->
            <div class="project-thumb-container position-relative rounded-3 overflow-hidden mb-3">
              <img
                :src="project.img"
                :alt="project.title"
                class="project-thumb-img w-100"
              />
              <span class="project-id-badge position-absolute top-2 start-2">
                #{{ project.id }}
              </span>
            </div>

            <!-- Tags Row -->
            <div class="d-flex flex-wrap gap-1.5 mb-2">
              <span
                v-for="(cat, cIdx) in project.categoryTags"
                :key="cIdx"
                class="badge-category"
              >
                {{ cat }}
              </span>
              <span
                v-for="(tech, tIdx) in (project.techStack || []).slice(0, 3)"
                :key="tIdx"
                class="badge-tech"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Title & Subtitle -->
            <h3 class="project-card-title mb-1">{{ project.title }}</h3>
            <p v-if="project.subtitle" class="project-card-subtitle text-muted fs-7 mb-3">
              {{ project.subtitle }}
            </p>

            <p class="project-card-desc fs-7 text-secondary mb-3 line-clamp-3">
              {{ project.description }}
            </p>

            <!-- Metadata Pills -->
            <div class="meta-row d-flex flex-wrap gap-3 fs-8 text-muted mb-3 pt-2 border-top">
              <span v-if="project.client"><strong>Client:</strong> {{ project.client }}</span>
              <span v-if="project.timeline"><strong>Timeline:</strong> {{ project.timeline }}</span>
              <span v-if="project.impact" class="text-success fw-bold">{{ project.impact }}</span>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="d-flex align-items-center justify-content-between pt-3 border-top mt-3">
            <div class="d-flex align-items-center gap-2">
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-action-icon"
                title="Live Demo"
              >
                <i class="bi bi-box-arrow-up-right"></i>
              </a>
              <a
                v-if="project.repoUrl"
                :href="project.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-action-icon"
                title="GitHub Repo"
              >
                <i class="bi bi-github"></i>
              </a>
            </div>

            <div class="d-flex align-items-center gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary rounded-pill px-3"
                @click="openEditModal(project)"
              >
                <i class="bi bi-pencil me-1"></i> Edit
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger rounded-pill px-3"
                @click="confirmDeleteProject(project.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit / Create Modal -->
    <div
      v-if="isModalOpen"
      class="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-50 p-3"
      @click.self="isModalOpen = false"
    >
      <div class="modal-card-custom p-4 p-md-5 rounded-4 shadow-lg w-100 position-relative modal-scrollable">
        <button
          type="button"
          class="btn-close-modal position-absolute top-3 end-3"
          aria-label="Close"
          @click="isModalOpen = false"
        >
          <i class="bi bi-x-lg"></i>
        </button>

        <h2 class="modal-headline mb-4">
          {{ editingProject.id ? 'Edit Project #' + editingProject.id : 'Create New Project' }}
        </h2>

        <form @submit.prevent="handleSaveProject">
          <div class="row g-3">
            <!-- Title -->
            <div class="col-md-7 col-12">
              <label class="form-label fw-bold fs-7">Project Title *</label>
              <input
                v-model="editingProject.title"
                type="text"
                class="form-control"
                placeholder="e.g. Basinik Finance App"
                required
              />
            </div>

            <!-- Client -->
            <div class="col-md-5 col-12">
              <label class="form-label fw-bold fs-7">Client</label>
              <input
                v-model="editingProject.client"
                type="text"
                class="form-control"
                placeholder="e.g. Basinik Capital Group"
              />
            </div>

            <!-- Subtitle -->
            <div class="col-12">
              <label class="form-label fw-bold fs-7">Subtitle / Pitch</label>
              <input
                v-model="editingProject.subtitle"
                type="text"
                class="form-control"
                placeholder="e.g. Next-Generation Wealth Management & Real-Time Portfolio Intelligence"
              />
            </div>

            <!-- Image URL -->
            <div class="col-md-8 col-12">
              <label class="form-label fw-bold fs-7">Thumbnail Image URL *</label>
              <input
                v-model="editingProject.img"
                type="text"
                class="form-control"
                placeholder="/images/projects/basinik-finance.jpg"
                required
              />
            </div>

            <!-- Timeline -->
            <div class="col-md-4 col-12">
              <label class="form-label fw-bold fs-7">Timeline</label>
              <input
                v-model="editingProject.timeline"
                type="text"
                class="form-control"
                placeholder="e.g. 3 Months (2024)"
              />
            </div>

            <!-- Category Tags (comma separated) -->
            <div class="col-md-6 col-12">
              <label class="form-label fw-bold fs-7">Category Tags (comma separated)</label>
              <input
                v-model="categoryTagsInput"
                type="text"
                class="form-control"
                placeholder="APP, DEVELOPMENT, FINTECH"
              />
            </div>

            <!-- Tech Stack (comma separated) -->
            <div class="col-md-6 col-12">
              <label class="form-label fw-bold fs-7">Tech Stack (comma separated)</label>
              <input
                v-model="techStackInput"
                type="text"
                class="form-control"
                placeholder="Nuxt 3, Vue 3, PostgreSQL, Tailwind"
              />
            </div>

            <!-- Description -->
            <div class="col-12">
              <label class="form-label fw-bold fs-7">Overview Description</label>
              <textarea
                v-model="editingProject.description"
                rows="3"
                class="form-control"
                placeholder="Describe the solution, customer problem, and architecture..."
              ></textarea>
            </div>

            <!-- Deliverables (one per line) -->
            <div class="col-12">
              <label class="form-label fw-bold fs-7">Key Deliverables (one per line)</label>
              <textarea
                v-model="deliverablesInput"
                rows="4"
                class="form-control"
                placeholder="Engineered an enterprise design system in Figma...&#10;Constructed real-time WebSocket charts..."
              ></textarea>
            </div>

            <!-- Demo URL & Repo URL -->
            <div class="col-md-6 col-12">
              <label class="form-label fw-bold fs-7">Live Demo URL</label>
              <input
                v-model="editingProject.demoUrl"
                type="url"
                class="form-control"
                placeholder="https://example.com"
              />
            </div>

            <div class="col-md-6 col-12">
              <label class="form-label fw-bold fs-7">GitHub Repository URL</label>
              <input
                v-model="editingProject.repoUrl"
                type="url"
                class="form-control"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-end gap-3 mt-4 pt-3 border-top">
            <button
              type="button"
              class="btn btn-secondary rounded-pill px-4"
              @click="isModalOpen = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn-primary-admin"
              :disabled="isSaving"
            >
              <span>{{ isSaving ? 'Saving...' : 'Save Project' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortfolioApi } from '~/composables/usePortfolioApi'
import type { Project } from '~/model'

definePageMeta({
  layout: 'admin'
})

const { fetchPortfolioBundle, saveProject, deleteProject } = usePortfolioApi()
const { data: portfolioData, refresh } = await fetchPortfolioBundle()

const searchQuery = ref('')
const activeFilter = ref('ALL')
const isModalOpen = ref(false)
const isSaving = ref(false)

const availableCategories = ['ALL', 'APP', 'DEVELOPMENT', 'FINTECH', 'ECOMMERCE']

const editingProject = ref<Partial<Project>>({
  title: '',
  subtitle: '',
  client: '',
  timeline: '',
  role: '',
  impact: '',
  categoryTags: [],
  techStack: [],
  img: '',
  description: '',
  deliverables: [],
  demoUrl: '',
  repoUrl: '',
})

const categoryTagsInput = ref('')
const techStackInput = ref('')
const deliverablesInput = ref('')

const projectsList = computed(() => {
  return portfolioData.value?.projects || []
})

const filteredProjects = computed(() => {
  let list = projectsList.value

  if (activeFilter.value !== 'ALL') {
    list = list.filter(p =>
      (p.categoryTags || []).some(t => t.toUpperCase() === activeFilter.value)
    )
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        (p.client && p.client.toLowerCase().includes(q)) ||
        (p.techStack && p.techStack.some(t => t.toLowerCase().includes(q)))
    )
  }

  return list
})

const openCreateModal = () => {
  editingProject.value = {
    title: '',
    subtitle: '',
    client: '',
    timeline: '',
    role: 'Lead UI/UX & Frontend Architect',
    impact: '',
    categoryTags: ['APP', 'DEVELOPMENT'],
    techStack: ['Nuxt 3', 'Vue 3', 'Tailwind CSS'],
    img: '/images/projects/basinik-finance.jpg',
    description: '',
    deliverables: [],
    demoUrl: '',
    repoUrl: '',
  }
  categoryTagsInput.value = 'APP, DEVELOPMENT'
  techStackInput.value = 'Nuxt 3, Vue 3, Tailwind CSS'
  deliverablesInput.value = ''
  isModalOpen.value = true
}

const openEditModal = (p: Project) => {
  editingProject.value = JSON.parse(JSON.stringify(p))
  categoryTagsInput.value = (p.categoryTags || []).join(', ')
  techStackInput.value = (p.techStack || []).join(', ')
  deliverablesInput.value = (p.deliverables || []).join('\n')
  isModalOpen.value = true
}

const handleSaveProject = async () => {
  isSaving.value = true
  try {
    editingProject.value.categoryTags = categoryTagsInput.value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    editingProject.value.techStack = techStackInput.value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    editingProject.value.deliverables = deliverablesInput.value
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)

    // Send mutation to API
    await saveProject(editingProject.value)
    isModalOpen.value = false
    await refresh()
  } catch (err) {
    console.warn('API error, updated local state:', err)
    // Local fallback update for instant feedback
    if (portfolioData.value) {
      if (editingProject.value.id) {
        const idx = portfolioData.value.projects.findIndex(p => p.id === editingProject.value.id)
        if (idx !== -1) portfolioData.value.projects[idx] = editingProject.value as Project
      } else {
        const newId = Date.now()
        portfolioData.value.projects.unshift({
          ...editingProject.value,
          id: newId,
        } as Project)
      }
    }
    isModalOpen.value = false
  } finally {
    isSaving.value = false
  }
}

const confirmDeleteProject = async (id: number) => {
  if (confirm(`Are you sure you want to delete Project #${id}?`)) {
    try {
      await deleteProject(id)
      await refresh()
    } catch (err) {
      if (portfolioData.value) {
        portfolioData.value.projects = portfolioData.value.projects.filter(p => p.id !== id)
      }
    }
  }
}
</script>

<style scoped>
.page-headline {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
}

.filter-bar {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

:global(.dark) .filter-bar {
  background-color: #121217;
  border-color: #22222a;
}

.btn-filter {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

:global(.dark) .btn-filter {
  background-color: #1a1a22;
  border-color: #272733;
  color: #9ca3af;
}

.btn-filter.active {
  background-color: #e76f2b;
  border-color: #e76f2b;
  color: #ffffff;
}

/* Project Card */
.project-admin-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

:global(.dark) .project-admin-card {
  background-color: #121217;
  border-color: #22222a;
}

.project-admin-card:hover {
  border-color: #e76f2b;
  transform: translateY(-2px);
}

.project-thumb-container {
  height: 200px;
  background-color: #0c0c0e;
}

.project-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-id-badge {
  background-color: rgba(0, 0, 0, 0.75);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  backdrop-filter: blur(4px);
}

.project-card-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.3rem;
}

.badge-category {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: rgba(231, 111, 43, 0.15);
  color: #e76f2b;
}

.badge-tech {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: #f3f4f6;
  color: #374151;
}

:global(.dark) .badge-tech {
  background-color: #1c1c24;
  color: #d1d5db;
}

.btn-action-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.85rem;
}

:global(.dark) .btn-action-icon {
  border-color: #2b2b36;
  color: #9ca3af;
}

.btn-action-icon:hover {
  background-color: #e76f2b;
  color: #ffffff;
  border-color: #e76f2b;
}

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
  cursor: pointer;
}

.modal-backdrop-custom {
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
}

.modal-card-custom {
  max-width: 760px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

:global(.dark) .modal-card-custom {
  background-color: #141419;
  border-color: #262630;
  color: #f1f1f5;
}

.modal-scrollable {
  max-height: 90vh;
  overflow-y: auto;
}

.modal-headline {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
}

.btn-close-modal {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #9ca3af;
  cursor: pointer;
}

.fs-7 { font-size: 0.85rem; }
.fs-8 { font-size: 0.75rem; }
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* All forms: black text and white background */
.form-control,
input,
textarea,
select {
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 1.5px solid #d1d5db !important;
  font-weight: 500 !important;
}

.form-control:focus,
input:focus,
textarea:focus,
select:focus {
  background-color: #ffffff !important;
  color: #000000 !important;
  border-color: #e76f2b !important;
  box-shadow: 0 0 0 3px rgba(231, 111, 43, 0.25) !important;
}

.form-label {
  color: #111827;
}

:global(.dark) .form-label {
  color: #f9fafb !important;
}
</style>
