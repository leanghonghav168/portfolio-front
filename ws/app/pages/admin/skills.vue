<template>
  <div class="admin-skills-view">
    <!-- Header -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h1 class="page-headline mb-1">Skills & Technologies</h1>
        <p class="text-muted mb-0 fs-7">Manage your core skills, proficiency levels, and logo badges displayed in the skills carousel.</p>
      </div>

      <button
        type="button"
        class="btn-primary-admin"
        @click="openAddSkillModal"
      >
        <i class="bi bi-plus-circle"></i>
        <span>Add New Skill</span>
      </button>
    </div>

    <!-- Skills Grid -->
    <div class="row g-3 g-lg-4">
      <div
        v-for="skill in skillsList"
        :key="skill.name + skill.id"
        class="col-xl-3 col-lg-4 col-sm-6 col-12"
      >
        <div class="skill-admin-card p-4 rounded-4 text-center d-flex flex-column justify-content-between h-100">
          <div>
            <div class="skill-icon-bubble mx-auto mb-3">
              <img :src="skill.img" :alt="skill.name" class="skill-logo-img" />
            </div>

            <h3 class="skill-name mb-1">{{ skill.name }}</h3>
            <span class="skill-category-badge mb-2 d-inline-block">{{ skill.category || 'General' }}</span>
            <div class="skill-percent-display fw-bold mb-3">{{ skill.percent }}</div>

            <!-- Visual Progress Bar -->
            <div class="progress mb-3" style="height: 6px;">
              <div
                class="progress-bar bg-warning"
                role="progressbar"
                :style="{ width: skill.percent }"
              ></div>
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-center gap-2 pt-2 border-top">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary rounded-pill px-3"
              @click="openEditSkillModal(skill)"
            >
              <i class="bi bi-pencil me-1"></i> Edit
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger rounded-circle p-1 px-2"
              title="Delete Skill"
              @click="confirmDeleteSkill(skill.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Skill Modal -->
    <div
      v-if="isModalOpen"
      class="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-50 p-3"
      @click.self="isModalOpen = false"
    >
      <div class="modal-card-custom p-4 p-md-5 rounded-4 shadow-lg w-100 position-relative" style="max-width: 520px;">
        <button
          type="button"
          class="btn-close-modal position-absolute top-3 end-3"
          aria-label="Close"
          @click="isModalOpen = false"
        >
          <i class="bi bi-x-lg"></i>
        </button>

        <h3 class="modal-headline mb-4">
          {{ editingSkill.id ? 'Edit Skill' : 'Add New Skill' }}
        </h3>

        <form @submit.prevent="handleSaveSkill">
          <div class="d-flex flex-column gap-3">
            <div>
              <label class="form-label fw-bold fs-7">Skill / Tool Name *</label>
              <input v-model="editingSkill.name" type="text" class="form-control" placeholder="e.g. FIGMA" required />
            </div>

            <div>
              <label class="form-label fw-bold fs-7">Proficiency Percentage *</label>
              <input v-model="editingSkill.percent" type="text" class="form-control" placeholder="e.g. 90%" required />
            </div>

            <div>
              <label class="form-label fw-bold fs-7">Icon Image URL *</label>
              <input v-model="editingSkill.img" type="text" class="form-control" placeholder="/images/skills/figma.png" required />
            </div>

            <div>
              <label class="form-label fw-bold fs-7">Category</label>
              <input v-model="editingSkill.category" type="text" class="form-control" placeholder="Design, Frontend, Creative..." />
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-end gap-3 mt-4 pt-3 border-top">
            <button type="button" class="btn btn-secondary rounded-pill px-4" @click="isModalOpen = false">
              Cancel
            </button>
            <button type="submit" class="btn-primary-admin" :disabled="isSaving">
              <span>{{ isSaving ? 'Saving...' : 'Save Skill' }}</span>
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
import type { Skill } from '~/model'

definePageMeta({
  layout: 'admin'
})

const { fetchPortfolioBundle, saveSkill, deleteSkill } = usePortfolioApi()
const { data: portfolioData, refresh } = await fetchPortfolioBundle()

const isModalOpen = ref(false)
const isSaving = ref(false)

const editingSkill = ref<Partial<Skill>>({
  name: '',
  percent: '85%',
  img: '/images/skills/html.png',
  category: 'Frontend',
})

const skillsList = computed(() => {
  const skills = portfolioData.value?.skills || []
  // De-duplicate if looped
  const seen = new Set()
  return skills.filter(item => {
    if (seen.has(item.name)) return false
    seen.add(item.name)
    return true
  })
})

const openAddSkillModal = () => {
  editingSkill.value = {
    name: '',
    percent: '85%',
    img: '/images/skills/html.png',
    category: 'Frontend',
  }
  isModalOpen.value = true
}

const openEditSkillModal = (skill: Skill) => {
  editingSkill.value = JSON.parse(JSON.stringify(skill))
  isModalOpen.value = true
}

const handleSaveSkill = async () => {
  isSaving.value = true
  try {
    await saveSkill(editingSkill.value)
    isModalOpen.value = false
    await refresh()
  } catch (err) {
    if (portfolioData.value) {
      if (editingSkill.value.id) {
        const idx = portfolioData.value.skills.findIndex(s => s.id === editingSkill.value.id)
        if (idx !== -1) portfolioData.value.skills[idx] = editingSkill.value as Skill
      } else {
        portfolioData.value.skills.push({ ...editingSkill.value, id: Date.now() } as Skill)
      }
    }
    isModalOpen.value = false
  } finally {
    isSaving.value = false
  }
}

const confirmDeleteSkill = async (id?: string | number) => {
  if (!id) return
  if (confirm('Are you sure you want to delete this skill?')) {
    try {
      await deleteSkill(Number(id))
      await refresh()
    } catch {
      if (portfolioData.value) {
        portfolioData.value.skills = portfolioData.value.skills.filter(s => s.id !== id)
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

.skill-admin-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

:global(.dark) .skill-admin-card {
  background-color: #121217;
  border-color: #22222a;
}

.skill-admin-card:hover {
  border-color: #e76f2b;
  transform: translateY(-2px);
}

.skill-icon-bubble {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

:global(.dark) .skill-icon-bubble {
  background-color: #1c1c24;
}

.skill-logo-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.skill-name {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
}

.skill-category-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  background-color: #e5e7eb;
  color: #4b5563;
}

:global(.dark) .skill-category-badge {
  background-color: #242430;
  color: #9ca3af;
}

.skill-percent-display {
  font-size: 1.5rem;
  font-family: var(--ff-syne), 'Syne', sans-serif;
  color: #e76f2b;
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

.btn-close-modal {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #9ca3af;
  cursor: pointer;
}

.fs-7 { font-size: 0.85rem; }

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
