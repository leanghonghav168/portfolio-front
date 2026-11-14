<template>
  <div class="admin-experience-view">
    <!-- Header -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h1 class="page-headline mb-1">Experience & Education</h1>
        <p class="text-muted mb-0 fs-7">Manage your career history, corporate roles, degrees, and professional certifications.</p>
      </div>

      <button
        type="button"
        class="btn-primary-admin"
        @click="openAddModal"
      >
        <i class="bi bi-plus-circle"></i>
        <span>Add {{ activeTab === 'work' ? 'Work Role' : 'Education' }}</span>
      </button>
    </div>

    <!-- Tab Toggle -->
    <ul class="nav nav-pills gap-2 mb-4 p-1 rounded-pill bg-light-subtle d-inline-flex">
      <li class="nav-item">
        <button
          type="button"
          :class="['nav-link rounded-pill fs-7 fw-bold', { active: activeTab === 'work' }]"
          @click="activeTab = 'work'"
        >
          <i class="bi bi-briefcase me-1.5"></i>
          Work Experience ({{ (portfolioData?.workExperiences || []).length }})
        </button>
      </li>
      <li class="nav-item">
        <button
          type="button"
          :class="['nav-link rounded-pill fs-7 fw-bold', { active: activeTab === 'education' }]"
          @click="activeTab = 'education'"
        >
          <i class="bi bi-mortarboard me-1.5"></i>
          Education & Certs ({{ (portfolioData?.educations || []).length }})
        </button>
      </li>
    </ul>

    <!-- Work Experience List -->
    <div v-show="activeTab === 'work'" class="d-flex flex-column gap-3">
      <div
        v-for="work in portfolioData?.workExperiences || []"
        :key="work.id"
        class="timeline-admin-card p-4 rounded-4"
      >
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
          <div class="d-flex align-items-center gap-2">
            <span class="period-pill fs-8 fw-bold">{{ work.period }}</span>
            <span v-if="work.isCurrent" class="badge bg-success-subtle text-success fs-8 fw-bold px-2 py-0.5 rounded-pill">
              Current
            </span>
          </div>

          <div class="d-flex align-items-center gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary rounded-pill px-3"
              @click="openEditWorkModal(work)"
            >
              <i class="bi bi-pencil me-1"></i> Edit
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger rounded-circle p-1 px-2"
              @click="confirmDeleteWork(work.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <h3 class="role-title mb-1">{{ work.role }}</h3>
        <p class="company-sub text-muted fs-7 mb-2">{{ work.company }} • {{ work.location }} ({{ work.type }})</p>
        <p class="desc-text fs-7 text-secondary mb-3">{{ work.description }}</p>

        <!-- Highlights Bullet Points -->
        <ul v-if="work.highlights?.length" class="highlights-list mb-3 fs-8 ps-3 text-secondary">
          <li v-for="(hl, hIdx) in work.highlights" :key="hIdx">{{ hl }}</li>
        </ul>

        <!-- Skills Tags -->
        <div class="d-flex flex-wrap gap-1.5 pt-2 border-top">
          <span v-for="(s, sIdx) in work.skills" :key="sIdx" class="badge-skill-tag">
            {{ s }}
          </span>
        </div>
      </div>
    </div>

    <!-- Education List -->
    <div v-show="activeTab === 'education'" class="d-flex flex-column gap-3">
      <div
        v-for="edu in portfolioData?.educations || []"
        :key="edu.id"
        class="timeline-admin-card p-4 rounded-4"
      >
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
          <span class="period-pill fs-8 fw-bold">{{ edu.period }}</span>

          <div class="d-flex align-items-center gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary rounded-pill px-3"
              @click="openEditEduModal(edu)"
            >
              <i class="bi bi-pencil me-1"></i> Edit
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger rounded-circle p-1 px-2"
              @click="confirmDeleteEdu(edu.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <h3 class="role-title mb-1">{{ edu.degree }}</h3>
        <p class="company-sub text-muted fs-7 mb-2">{{ edu.institution }} • {{ edu.location }}</p>
        <p class="desc-text fs-7 text-secondary mb-3">{{ edu.description }}</p>

        <div class="d-flex flex-wrap gap-1.5 pt-2 border-top">
          <span v-for="(s, sIdx) in edu.skills" :key="sIdx" class="badge-skill-tag">
            {{ s }}
          </span>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="isModalOpen"
      class="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-50 p-3"
      @click.self="isModalOpen = false"
    >
      <div class="modal-card-custom p-4 p-md-5 rounded-4 shadow-lg w-100 position-relative modal-scrollable" style="max-width: 650px;">
        <button
          type="button"
          class="btn-close-modal position-absolute top-3 end-3"
          aria-label="Close"
          @click="isModalOpen = false"
        >
          <i class="bi bi-x-lg"></i>
        </button>

        <h3 class="modal-headline mb-4">
          {{ isEditingWork ? (editingWork.id ? 'Edit Work Experience' : 'Add Work Experience') : (editingEdu.id ? 'Edit Education' : 'Add Education') }}
        </h3>

        <!-- Form for Work -->
        <form v-if="isEditingWork" @submit.prevent="handleSaveWork">
          <div class="row g-3">
            <div class="col-md-7 col-12">
              <label class="form-label fw-bold fs-7">Role / Position *</label>
              <input v-model="editingWork.role" type="text" class="form-control" required />
            </div>

            <div class="col-md-5 col-12">
              <label class="form-label fw-bold fs-7">Company / Agency *</label>
              <input v-model="editingWork.company" type="text" class="form-control" required />
            </div>

            <div class="col-md-6 col-12">
              <label class="form-label fw-bold fs-7">Location</label>
              <input v-model="editingWork.location" type="text" class="form-control" placeholder="Berlin, Germany" />
            </div>

            <div class="col-md-6 col-12">
              <label class="form-label fw-bold fs-7">Period</label>
              <input v-model="editingWork.period" type="text" class="form-control" placeholder="2022 - PRESENT" required />
            </div>

            <div class="col-12">
              <div class="form-check">
                <input id="isCurrentCheck" v-model="editingWork.isCurrent" class="form-check-input" type="checkbox" />
                <label class="form-check-label fs-7" for="isCurrentCheck">Currently working here</label>
              </div>
            </div>

            <div class="col-12">
              <label class="form-label fw-bold fs-7">Role Overview</label>
              <textarea v-model="editingWork.description" rows="2" class="form-control"></textarea>
            </div>

            <div class="col-12">
              <label class="form-label fw-bold fs-7">Key Highlights (one per line)</label>
              <textarea v-model="workHighlightsInput" rows="3" class="form-control"></textarea>
            </div>

            <div class="col-12">
              <label class="form-label fw-bold fs-7">Skills Used (comma separated)</label>
              <input v-model="workSkillsInput" type="text" class="form-control" placeholder="Figma, Nuxt 3, TypeScript" />
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-end gap-3 mt-4 pt-3 border-top">
            <button type="button" class="btn btn-secondary rounded-pill px-4" @click="isModalOpen = false">Cancel</button>
            <button type="submit" class="btn-primary-admin" :disabled="isSaving">Save Experience</button>
          </div>
        </form>

        <!-- Form for Education -->
        <form v-else @submit.prevent="handleSaveEdu">
          <div class="row g-3">
            <div class="col-md-7 col-12">
              <label class="form-label fw-bold fs-7">Degree / Certification Title *</label>
              <input v-model="editingEdu.degree" type="text" class="form-control" required />
            </div>

            <div class="col-md-5 col-12">
              <label class="form-label fw-bold fs-7">Institution / Issuer *</label>
              <input v-model="editingEdu.institution" type="text" class="form-control" required />
            </div>

            <div class="col-md-6 col-12">
              <label class="form-label fw-bold fs-7">Period</label>
              <input v-model="editingEdu.period" type="text" class="form-control" placeholder="2014 - 2018" required />
            </div>

            <div class="col-md-6 col-12">
              <label class="form-label fw-bold fs-7">Location</label>
              <input v-model="editingEdu.location" type="text" class="form-control" placeholder="Berlin, Germany" />
            </div>

            <div class="col-12">
              <label class="form-label fw-bold fs-7">Curriculum / Program Description</label>
              <textarea v-model="editingEdu.description" rows="3" class="form-control"></textarea>
            </div>

            <div class="col-12">
              <label class="form-label fw-bold fs-7">Key Competencies (comma separated)</label>
              <input v-model="eduSkillsInput" type="text" class="form-control" placeholder="HCI, UI Architecture, Software Engineering" />
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-end gap-3 mt-4 pt-3 border-top">
            <button type="button" class="btn btn-secondary rounded-pill px-4" @click="isModalOpen = false">Cancel</button>
            <button type="submit" class="btn-primary-admin" :disabled="isSaving">Save Education</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioApi } from '~/composables/usePortfolioApi'
import type { WorkExperience, Education } from '~/model'

definePageMeta({
  layout: 'admin'
})

const {
  fetchPortfolioBundle,
  saveWorkExperience,
  deleteWorkExperience,
  saveEducation,
  deleteEducation,
} = usePortfolioApi()

const { data: portfolioData, refresh } = await fetchPortfolioBundle()

const activeTab = ref<'work' | 'education'>('work')
const isModalOpen = ref(false)
const isEditingWork = ref(true)
const isSaving = ref(false)

const editingWork = ref<Partial<WorkExperience>>({})
const workHighlightsInput = ref('')
const workSkillsInput = ref('')

const editingEdu = ref<Partial<Education>>({})
const eduSkillsInput = ref('')

const openAddModal = () => {
  if (activeTab.value === 'work') {
    isEditingWork.value = true
    editingWork.value = {
      role: '',
      company: '',
      location: 'Berlin, Germany',
      period: '2024 - PRESENT',
      type: 'Full-time',
      isCurrent: true,
      description: '',
      highlights: [],
      skills: [],
    }
    workHighlightsInput.value = ''
    workSkillsInput.value = ''
  } else {
    isEditingWork.value = false
    editingEdu.value = {
      degree: '',
      institution: '',
      location: 'Berlin, Germany',
      period: '2024',
      description: '',
      skills: [],
    }
    eduSkillsInput.value = ''
  }
  isModalOpen.value = true
}

const openEditWorkModal = (w: WorkExperience) => {
  isEditingWork.value = true
  editingWork.value = JSON.parse(JSON.stringify(w))
  workHighlightsInput.value = (w.highlights || []).join('\n')
  workSkillsInput.value = (w.skills || []).join(', ')
  isModalOpen.value = true
}

const openEditEduModal = (e: Education) => {
  isEditingWork.value = false
  editingEdu.value = JSON.parse(JSON.stringify(e))
  eduSkillsInput.value = (e.skills || []).join(', ')
  isModalOpen.value = true
}

const handleSaveWork = async () => {
  isSaving.value = true
  try {
    editingWork.value.highlights = workHighlightsInput.value.split('\n').map(s => s.trim()).filter(Boolean)
    editingWork.value.skills = workSkillsInput.value.split(',').map(s => s.trim()).filter(Boolean)

    await saveWorkExperience(editingWork.value)
    isModalOpen.value = false
    await refresh()
  } catch (err) {
    if (portfolioData.value) {
      if (editingWork.value.id) {
        const idx = portfolioData.value.workExperiences.findIndex(w => w.id === editingWork.value.id)
        if (idx !== -1) portfolioData.value.workExperiences[idx] = editingWork.value as WorkExperience
      } else {
        portfolioData.value.workExperiences.unshift({ ...editingWork.value, id: Date.now() } as WorkExperience)
      }
    }
    isModalOpen.value = false
  } finally {
    isSaving.value = false
  }
}

const handleSaveEdu = async () => {
  isSaving.value = true
  try {
    editingEdu.value.skills = eduSkillsInput.value.split(',').map(s => s.trim()).filter(Boolean)
    await saveEducation(editingEdu.value)
    isModalOpen.value = false
    await refresh()
  } catch (err) {
    if (portfolioData.value) {
      if (editingEdu.value.id) {
        const idx = portfolioData.value.educations.findIndex(e => e.id === editingEdu.value.id)
        if (idx !== -1) portfolioData.value.educations[idx] = editingEdu.value as Education
      } else {
        portfolioData.value.educations.unshift({ ...editingEdu.value, id: Date.now() } as Education)
      }
    }
    isModalOpen.value = false
  } finally {
    isSaving.value = false
  }
}

const confirmDeleteWork = async (id: number) => {
  if (confirm('Delete this work experience?')) {
    try {
      await deleteWorkExperience(id)
      await refresh()
    } catch {
      if (portfolioData.value) {
        portfolioData.value.workExperiences = portfolioData.value.workExperiences.filter(w => w.id !== id)
      }
    }
  }
}

const confirmDeleteEdu = async (id: number) => {
  if (confirm('Delete this education entry?')) {
    try {
      await deleteEducation(id)
      await refresh()
    } catch {
      if (portfolioData.value) {
        portfolioData.value.educations = portfolioData.value.educations.filter(e => e.id !== id)
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

.timeline-admin-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

:global(.dark) .timeline-admin-card {
  background-color: #121217;
  border-color: #22222a;
}

.timeline-admin-card:hover {
  border-color: #e76f2b;
  transform: translateY(-2px);
}

.period-pill {
  color: #e76f2b;
  background-color: rgba(231, 111, 43, 0.1);
  padding: 3px 10px;
  border-radius: 20px;
}

.role-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
}

.badge-skill-tag {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: #f3f4f6;
  color: #374151;
}

:global(.dark) .badge-skill-tag {
  background-color: #1f1f2a;
  color: #d1d5db;
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
  cursor: pointer;
}

.modal-backdrop-custom {
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
}

.modal-card-custom {
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

.btn-close-modal {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #9ca3af;
  cursor: pointer;
}

.fs-7 { font-size: 0.85rem; }
.fs-8 { font-size: 0.75rem; }
</style>
