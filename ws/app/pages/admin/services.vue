<template>
  <div class="admin-services-view">
    <!-- Header -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h1 class="page-headline mb-1">Special Services</h1>
        <p class="text-muted mb-0 fs-7">Manage the tailored service offerings and iconography shown on your homepage.</p>
      </div>

      <button type="button" class="btn-primary-admin" @click="openAddServiceModal">
        <i class="bi bi-plus-circle"></i>
        <span>Add New Service</span>
      </button>
    </div>

    <!-- Services Grid -->
    <div class="row g-4">
      <div
        v-for="service in servicesList"
        :key="service.id"
        class="col-lg-4 col-md-6 col-12"
      >
        <div class="service-admin-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between">
          <div>
            <div class="service-icon-box mb-3 d-inline-flex p-3 rounded-3">
              <i v-if="service.iconType === 'yinyang'" class="bi bi-yin-yang fs-4"></i>
              <i v-else-if="service.iconType === 'layout'" class="bi bi-grid-1x2 fs-4"></i>
              <i v-else-if="service.iconType === 'layers'" class="bi bi-stack fs-4"></i>
              <i v-else class="bi bi-lightning-charge fs-4"></i>
            </div>

            <h3 class="service-title mb-2">{{ service.title }}</h3>
            <p class="service-desc text-muted fs-7 mb-0">{{ service.description }}</p>
          </div>

          <div class="d-flex align-items-center justify-content-end gap-2 pt-3 border-top mt-4">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary rounded-pill px-3"
              @click="openEditServiceModal(service)"
            >
              <i class="bi bi-pencil me-1"></i> Edit
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger rounded-circle p-1 px-2"
              @click="confirmDeleteService(service.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Modal -->
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
          {{ editingService.id ? 'Edit Service' : 'Add New Service' }}
        </h3>

        <form @submit.prevent="handleSaveService">
          <div class="d-flex flex-column gap-3">
            <div>
              <label class="form-label fw-bold fs-7">Service Title *</label>
              <input v-model="editingService.title" type="text" class="form-control" placeholder="e.g. Website Design" required />
            </div>

            <div>
              <label class="form-label fw-bold fs-7">Icon Style</label>
              <select v-model="editingService.iconType" class="form-select">
                <option value="layout">Layout / Bounding Box</option>
                <option value="yinyang">Yin-Yang / Brand Harmony</option>
                <option value="layers">Layers / Application Stack</option>
                <option value="custom">Custom / Lightning</option>
              </select>
            </div>

            <div>
              <label class="form-label fw-bold fs-7">Description</label>
              <textarea v-model="editingService.description" rows="3" class="form-control" required></textarea>
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-end gap-3 mt-4 pt-3 border-top">
            <button type="button" class="btn btn-secondary rounded-pill px-4" @click="isModalOpen = false">
              Cancel
            </button>
            <button type="submit" class="btn-primary-admin" :disabled="isSaving">
              <span>{{ isSaving ? 'Saving...' : 'Save Service' }}</span>
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
import type { Service } from '~/model'

definePageMeta({
  layout: 'admin'
})

const { fetchPortfolioBundle, saveService, deleteService } = usePortfolioApi()
const { data: portfolioData, refresh } = await fetchPortfolioBundle()

const isModalOpen = ref(false)
const isSaving = ref(false)

const editingService = ref<Partial<Service>>({
  title: '',
  description: '',
  iconType: 'layout',
})

const servicesList = computed(() => {
  return portfolioData.value?.services || []
})

const openAddServiceModal = () => {
  editingService.value = {
    title: '',
    description: 'We craft high-performance websites and intuitive UI kits that scale with your brand.',
    iconType: 'layout',
  }
  isModalOpen.value = true
}

const openEditServiceModal = (s: Service) => {
  editingService.value = JSON.parse(JSON.stringify(s))
  isModalOpen.value = true
}

const handleSaveService = async () => {
  isSaving.value = true
  try {
    await saveService(editingService.value)
    isModalOpen.value = false
    await refresh()
  } catch (err) {
    if (portfolioData.value) {
      if (editingService.value.id) {
        const idx = portfolioData.value.services.findIndex(s => s.id === editingService.value.id)
        if (idx !== -1) portfolioData.value.services[idx] = editingService.value as Service
      } else {
        portfolioData.value.services.push({ ...editingService.value, id: Date.now() } as Service)
      }
    }
    isModalOpen.value = false
  } finally {
    isSaving.value = false
  }
}

const confirmDeleteService = async (id: number) => {
  if (confirm('Delete this service?')) {
    try {
      await deleteService(id)
      await refresh()
    } catch {
      if (portfolioData.value) {
        portfolioData.value.services = portfolioData.value.services.filter(s => s.id !== id)
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

.service-admin-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

:global(.dark) .service-admin-card {
  background-color: #121217;
  border-color: #22222a;
}

.service-admin-card:hover {
  border-color: #e76f2b;
  transform: translateY(-2px);
}

.service-icon-box {
  background-color: rgba(231, 111, 43, 0.12);
  color: #e76f2b;
}

.service-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
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
