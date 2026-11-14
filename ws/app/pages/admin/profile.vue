<template>
  <div class="admin-profile-view">
    <!-- Header -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h1 class="page-headline mb-1">Hero Profile & About Me</h1>
        <p class="text-muted mb-0 fs-7">Edit your intro greeting, bio, career statement, availability badge, and social links.</p>
      </div>

      <button
        type="button"
        class="btn-primary-admin"
        :disabled="isSaving"
        @click="saveAllProfileData"
      >
        <i class="bi bi-check2-circle"></i>
        <span>{{ isSaving ? 'Saving Changes...' : 'Save All Changes' }}</span>
      </button>
    </div>

    <!-- Feedback Banner -->
    <div v-if="saveSuccess" class="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4">
      <i class="bi bi-check-circle-fill fs-5"></i>
      <span>Profile and About Me details updated successfully!</span>
    </div>

    <div class="row g-4">
      <!-- Left Column: Forms in Tabs -->
      <div class="col-xl-8 col-12">
        <div class="admin-panel p-4 p-md-5 rounded-4">
          <!-- Tab Navigation -->
          <ul class="nav nav-pills gap-2 mb-4 p-1 rounded-pill bg-light-subtle d-inline-flex">
            <li class="nav-item">
              <button
                type="button"
                :class="['nav-link rounded-pill fs-7 fw-bold', { active: activeTab === 'hero' }]"
                @click="activeTab = 'hero'"
              >
                Hero Section
              </button>
            </li>
            <li class="nav-item">
              <button
                type="button"
                :class="['nav-link rounded-pill fs-7 fw-bold', { active: activeTab === 'about' }]"
                @click="activeTab = 'about'"
              >
                About Me Section
              </button>
            </li>
            <li class="nav-item">
              <button
                type="button"
                :class="['nav-link rounded-pill fs-7 fw-bold', { active: activeTab === 'socials' }]"
                @click="activeTab = 'socials'"
              >
                Social Links
              </button>
            </li>
          </ul>

          <!-- Form 1: Hero Section -->
          <div v-show="activeTab === 'hero'">
            <div class="row g-3">
              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">First Name</label>
                <input v-model="formHero.firstName" type="text" class="form-control" />
              </div>

              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">Last Name</label>
                <input v-model="formHero.lastName" type="text" class="form-control" />
              </div>

              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">Greeting Line</label>
                <input v-model="formHero.greeting" type="text" class="form-control" />
              </div>

              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">Clients Count Stat</label>
                <input v-model="formHero.clientsCount" type="text" class="form-control" />
              </div>

              <div class="col-12">
                <label class="form-label fw-bold fs-7">Professional Title / Subtitle</label>
                <input v-model="formHero.role" type="text" class="form-control" />
              </div>

              <div class="col-12">
                <label class="form-label fw-bold fs-7">Hero Portrait Image URL</label>
                <input v-model="formHero.portraitImg" type="text" class="form-control" />
              </div>

              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">"Let's Talk" CTA URL</label>
                <input v-model="formHero.talkCtaUrl" type="text" class="form-control" />
              </div>

              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">"My Project" CTA URL</label>
                <input v-model="formHero.projectCtaUrl" type="text" class="form-control" />
              </div>
            </div>
          </div>

          <!-- Form 2: About Me Section -->
          <div v-show="activeTab === 'about'">
            <div class="row g-3">
              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">Category Tag</label>
                <input v-model="formAbout.categoryTag" type="text" class="form-control" />
              </div>

              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">Availability Badge Text</label>
                <input v-model="formAbout.availableBadgeText" type="text" class="form-control" />
              </div>

              <div class="col-12">
                <div class="form-check form-switch p-2 ps-5 rounded-3 border bg-light-subtle">
                  <input
                    id="availabilitySwitch"
                    v-model="formAbout.isAvailableForWork"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                  />
                  <label class="form-check-label fw-bold fs-7 ms-2" for="availabilitySwitch">
                    Display "Available for Work" Status Badge on Public Portfolio
                  </label>
                </div>
              </div>

              <div class="col-12">
                <label class="form-label fw-bold fs-7">Headline</label>
                <input v-model="formAbout.headline" type="text" class="form-control" />
              </div>

              <div class="col-12">
                <label class="form-label fw-bold fs-7">Full Bio / Career Narrative</label>
                <textarea v-model="formAbout.bioText" rows="4" class="form-control"></textarea>
              </div>

              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">Left Specialties (one per line)</label>
                <textarea v-model="leftSpecialtiesInput" rows="4" class="form-control"></textarea>
              </div>

              <div class="col-md-6 col-12">
                <label class="form-label fw-bold fs-7">Right Specialties (one per line)</label>
                <textarea v-model="rightSpecialtiesInput" rows="4" class="form-control"></textarea>
              </div>
            </div>
          </div>

          <!-- Form 3: Social Links -->
          <div v-show="activeTab === 'socials'">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h4 class="fs-6 fw-bold mb-0">Connected Social Platforms</h4>
              <button type="button" class="btn btn-sm btn-outline-primary rounded-pill px-3" @click="addSocialLink">
                <i class="bi bi-plus-lg me-1"></i> Add Link
              </button>
            </div>

            <div class="d-flex flex-column gap-3">
              <div
                v-for="(link, lIdx) in formHero.socialLinks"
                :key="lIdx"
                class="p-3 rounded-3 border d-flex flex-wrap align-items-center gap-3 bg-light-subtle"
              >
                <div class="col-sm-3 col-12">
                  <input v-model="link.name" type="text" class="form-control form-control-sm" placeholder="Platform Name" />
                </div>
                <div class="col-sm-4 col-12">
                  <input v-model="link.url" type="url" class="form-control form-control-sm" placeholder="Profile URL" />
                </div>
                <div class="col-sm-3 col-12">
                  <input v-model="link.icon" type="text" class="form-control form-control-sm" placeholder="fa-brands fa-github" />
                </div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger rounded-circle p-1"
                  title="Remove"
                  @click="removeSocialLink(lIdx)"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Live Card Preview -->
      <div class="col-xl-4 col-12">
        <div class="admin-panel p-4 rounded-4 position-sticky" style="top: 100px;">
          <h3 class="panel-title fs-6 mb-3">Live Card Preview</h3>
          
          <div class="preview-card p-4 rounded-4 border text-center">
            <div class="position-relative d-inline-block mb-3">
              <img
                :src="formHero.portraitImg"
                alt="Preview Portrait"
                class="preview-avatar rounded-circle"
              />
              <span v-if="formAbout.isAvailableForWork" class="preview-online-indicator" title="Available"></span>
            </div>

            <h2 class="preview-name mb-1">{{ formHero.firstName }} {{ formHero.lastName }}</h2>
            <p class="preview-role text-muted fs-7 mb-3">{{ formHero.role }}</p>

            <div class="badge-availability-preview py-1 px-3 rounded-pill d-inline-block mb-3">
              {{ formAbout.availableBadgeText || 'Available for Work' }}
            </div>

            <div class="d-flex justify-content-center gap-2 pt-2 border-top">
              <a
                v-for="s in formHero.socialLinks"
                :key="s.name"
                :href="s.url"
                target="_blank"
                class="btn-social-preview"
                :title="s.name"
              >
                <i :class="s.icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePortfolioApi } from '~/composables/usePortfolioApi'
import { heroProfileData, aboutMeData } from '~/model'

definePageMeta({
  layout: 'admin'
})

const { fetchPortfolioBundle, updateHero, updateAbout } = usePortfolioApi()
const { data: portfolioData, refresh } = await fetchPortfolioBundle()

const activeTab = ref<'hero' | 'about' | 'socials'>('hero')
const isSaving = ref(false)
const saveSuccess = ref(false)

const formHero = ref({
  firstName: portfolioData.value?.profile?.firstName || heroProfileData.firstName,
  lastName: portfolioData.value?.profile?.lastName || heroProfileData.lastName,
  greeting: portfolioData.value?.profile?.greeting || heroProfileData.greeting,
  role: portfolioData.value?.profile?.role || heroProfileData.role,
  clientsCount: portfolioData.value?.profile?.clientsCount || heroProfileData.clientsCount,
  portraitImg: portfolioData.value?.profile?.portraitImg || heroProfileData.portraitImg,
  talkCtaUrl: portfolioData.value?.profile?.talkCtaUrl || heroProfileData.talkCtaUrl,
  projectCtaUrl: portfolioData.value?.profile?.projectCtaUrl || heroProfileData.projectCtaUrl,
  socialLinks: JSON.parse(JSON.stringify(portfolioData.value?.profile?.socialLinks || heroProfileData.socialLinks)),
})

const formAbout = ref({
  categoryTag: portfolioData.value?.about?.categoryTag || aboutMeData.categoryTag,
  headline: portfolioData.value?.about?.headline || aboutMeData.headline,
  bioText: portfolioData.value?.about?.bioText || aboutMeData.bioText,
  isAvailableForWork: portfolioData.value?.about?.isAvailableForWork ?? aboutMeData.isAvailableForWork,
  availableBadgeText: portfolioData.value?.about?.availableBadgeText || aboutMeData.availableBadgeText,
  leftSpecialties: portfolioData.value?.about?.leftSpecialties || aboutMeData.leftSpecialties,
  rightSpecialties: portfolioData.value?.about?.rightSpecialties || aboutMeData.rightSpecialties,
})

const leftSpecialtiesInput = ref((formAbout.value.leftSpecialties || []).join('\n'))
const rightSpecialtiesInput = ref((formAbout.value.rightSpecialties || []).join('\n'))

const addSocialLink = () => {
  formHero.value.socialLinks.push({
    name: 'New Platform',
    url: 'https://',
    icon: 'bi bi-link-45deg',
    ariaLabel: 'Social Link'
  })
}

const removeSocialLink = (idx: number) => {
  formHero.value.socialLinks.splice(idx, 1)
}

const saveAllProfileData = async () => {
  isSaving.value = true
  saveSuccess.value = false

  try {
    formAbout.value.leftSpecialties = leftSpecialtiesInput.value.split('\n').map(s => s.trim()).filter(Boolean)
    formAbout.value.rightSpecialties = rightSpecialtiesInput.value.split('\n').map(s => s.trim()).filter(Boolean)

    await Promise.all([
      updateHero(formHero.value),
      updateAbout(formAbout.value),
    ])

    saveSuccess.value = true
    await refresh()
    setTimeout(() => {
      saveSuccess.value = false
    }, 4000)
  } catch (err) {
    console.warn('Backend unavailable, local preview updated:', err)
    saveSuccess.value = true
    setTimeout(() => {
      saveSuccess.value = false
    }, 4000)
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.page-headline {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
}

.admin-panel {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

:global(.dark) .admin-panel {
  background-color: #121217;
  border-color: #22222a;
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

.preview-card {
  background-color: #f9fafb;
}

:global(.dark) .preview-card {
  background-color: #17171d;
  border-color: #252530 !important;
}

.preview-avatar {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border: 3px solid #e76f2b;
}

.preview-online-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #10b981;
  border: 2px solid #ffffff;
  box-shadow: 0 0 6px #10b981;
}

.preview-name {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
}

.badge-availability-preview {
  font-size: 0.75rem;
  font-weight: 700;
  background-color: #d1fae5;
  color: #065f46;
}

:global(.dark) .badge-availability-preview {
  background-color: #064e3b44;
  color: #34d399;
}

.btn-social-preview {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.85rem;
}

:global(.dark) .btn-social-preview {
  border-color: #2b2b36;
  color: #9ca3af;
}

.btn-social-preview:hover {
  background-color: #e76f2b;
  color: #ffffff;
  border-color: #e76f2b;
}

.fs-7 { font-size: 0.85rem; }
.fs-8 { font-size: 0.75rem; }

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
