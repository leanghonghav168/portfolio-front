<template>
  <section id="portfolio" class="project-section py-5 py-lg-6 position-relative">
    <div class="container position-relative">
      <!-- Section Header -->
      <div class="text-center mb-5">
        <!-- Small Category Tag -->
        <span class="project-category-tag d-inline-block mb-2">Portfolio</span>

        <!-- Large Title with Amber Circle Accent Behind 'work' -->
        <h2 class="project-headline mb-0">
          My recent
          <span class="work-word-wrapper">
            <span class="work-circle-accent" aria-hidden="true"></span>
            <span class="work-text">work</span>
          </span>
        </h2>
      </div>

      <!-- Project Cards Grid -->
      <div class="row g-4 justify-content-center">
        <div
          v-for="project in visibleProjects"
          :key="project.id"
          class="col-lg-6 col-12"
        >
          <div class="project-card">
            <!-- Card Thumbnail Container (clickable to open details) -->
            <div
              class="project-thumbnail-wrapper overflow-hidden mb-3 position-relative"
              role="button"
              tabindex="0"
              :aria-label="`View details for ${project.title}`"
              @click="openProjectDetail(project)"
              @keydown.enter="openProjectDetail(project)"
              @keydown.space.prevent="openProjectDetail(project)"
            >
              <img
                :src="project.img"
                :alt="project.title"
                class="project-thumbnail-img w-100 h-100"
                loading="lazy"
              />

              <!-- Hover Quick View Overlay Badge -->
              <div class="project-hover-overlay d-flex align-items-center justify-content-center">
                <span class="btn-quick-view d-inline-flex align-items-center gap-2">
                  <i class="bi bi-eye"></i>
                  <span>View Details</span>
                </span>
              </div>
            </div>

            <!-- Tags Row (Categories & Technology Stack) -->
            <div class="project-tags-row d-flex flex-wrap align-items-center gap-2 mb-3">
              <!-- Primary Category Badges (as in UI) -->
              <span
                v-for="(tag, tIdx) in project.categoryTags"
                :key="`cat-${tIdx}`"
                class="tag-pill tag-primary"
              >
                {{ tag }}
              </span>

              <!-- Technology Stack Badges (Requested) -->
              <span
                v-for="(tech, sIdx) in project.techStack"
                :key="`tech-${sIdx}`"
                class="tag-pill tag-tech"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Title & Up-Right Arrow (Button opening details) -->
            <button
              type="button"
              class="project-title-btn text-start p-0 bg-transparent border-0 w-100 d-flex align-items-center justify-content-between"
              @click="openProjectDetail(project)"
            >
              <h3 class="project-title mb-0">
                {{ project.title }}
              </h3>
              <div class="project-arrow-circle" aria-hidden="true">
                <i class="bi bi-arrow-up-right"></i>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom View All Button -->
      <div class="text-center mt-5 pt-2">
        <button
          type="button"
          class="btn-view-all-projects d-inline-flex align-items-center justify-content-center gap-2"
          @click="toggleShowAll"
        >
          <span>{{ showAll ? 'Show Less' : 'View All Project' }}</span>
          <i
            :class="[
              'bi',
              showAll ? 'bi-arrow-up' : 'bi-arrow-up-right'
            ]"
          ></i>
        </button>
      </div>
    </div>

    <!-- Interactive Project Detail Modal Popup -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="isModalOpen && selectedProject"
          class="project-modal-backdrop d-flex align-items-center justify-content-center p-3 p-md-4"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`project-dialog-title-${selectedProject.id}`"
          @click.self="closeProjectDetail"
        >
          <div class="project-modal-dialog position-relative">
            <!-- Close Button -->
            <button
              type="button"
              class="btn-modal-close"
              aria-label="Close project details"
              @click="closeProjectDetail"
            >
              <i class="bi bi-x-lg"></i>
            </button>

            <!-- Modal Content Body -->
            <div class="project-modal-body p-4 p-md-5">
              <!-- High-res Image Showcase -->
              <div class="modal-thumbnail-wrapper overflow-hidden mb-4">
                <img
                  :src="selectedProject.img"
                  :alt="selectedProject.title"
                  class="modal-thumbnail-img w-100"
                />
              </div>

              <!-- Tags Header Row -->
              <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
                <span
                  v-for="(cat, cIdx) in selectedProject.categoryTags"
                  :key="`modal-cat-${cIdx}`"
                  class="tag-pill tag-primary"
                >
                  {{ cat }}
                </span>
                <span
                  v-for="(tech, tIdx) in selectedProject.techStack"
                  :key="`modal-tech-${tIdx}`"
                  class="tag-pill tag-tech"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Project Title & Subtitle -->
              <h2 :id="`project-dialog-title-${selectedProject.id}`" class="modal-project-title mb-2">
                {{ selectedProject.title }}
              </h2>
              <p v-if="selectedProject.subtitle" class="modal-project-subtitle mb-4">
                {{ selectedProject.subtitle }}
              </p>

              <!-- Project Metadata Strip (Client, Timeline, Role, Outcome) -->
              <div class="project-meta-strip row g-3 mb-4">
                <div v-if="selectedProject.client" class="col-sm-6 col-md-3 col-6">
                  <div class="meta-card">
                    <span class="meta-card-label">CLIENT</span>
                    <span class="meta-card-value">{{ selectedProject.client }}</span>
                  </div>
                </div>
                <div v-if="selectedProject.role" class="col-sm-6 col-md-3 col-6">
                  <div class="meta-card">
                    <span class="meta-card-label">ROLE</span>
                    <span class="meta-card-value">{{ selectedProject.role }}</span>
                  </div>
                </div>
                <div v-if="selectedProject.timeline" class="col-sm-6 col-md-3 col-6">
                  <div class="meta-card">
                    <span class="meta-card-label">TIMELINE</span>
                    <span class="meta-card-value">{{ selectedProject.timeline }}</span>
                  </div>
                </div>
                <div v-if="selectedProject.impact" class="col-sm-6 col-md-3 col-6">
                  <div class="meta-card">
                    <span class="meta-card-label">OUTCOME</span>
                    <span class="meta-card-value text-highlight">{{ selectedProject.impact }}</span>
                  </div>
                </div>
              </div>

              <!-- In-depth Description -->
              <div class="modal-section-block mb-4">
                <h4 class="modal-block-heading mb-2">Project Overview</h4>
                <p class="modal-description-text mb-0">
                  {{ selectedProject.description }}
                </p>
              </div>

              <!-- Key Highlights & Architecture Deliverables -->
              <div v-if="selectedProject.deliverables?.length" class="modal-section-block mb-4">
                <h4 class="modal-block-heading mb-3">Key Highlights & Architecture</h4>
                <ul class="modal-deliverables-list list-unstyled mb-0">
                  <li
                    v-for="(item, dIdx) in selectedProject.deliverables"
                    :key="dIdx"
                    class="deliverable-item d-flex align-items-start mb-2"
                  >
                    <span class="deliverable-bullet me-2.5">→</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Action Buttons (Live Preview & Repository) -->
              <div class="modal-actions-bar d-flex flex-wrap align-items-center gap-3 pt-4 border-top">
                <a
                  v-if="selectedProject.demoUrl && selectedProject.demoUrl !== '#'"
                  :href="selectedProject.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-modal-demo text-decoration-none d-inline-flex align-items-center gap-2"
                >
                  <span>Live Preview</span>
                  <i class="bi bi-arrow-up-right"></i>
                </a>
                <a
                  v-if="selectedProject.repoUrl && selectedProject.repoUrl !== '#'"
                  :href="selectedProject.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-modal-repo text-decoration-none d-inline-flex align-items-center gap-2"
                >
                  <i class="bi bi-github"></i>
                  <span>Source Code</span>
                </a>
                <button
                  type="button"
                  class="btn-modal-dismiss ms-auto"
                  @click="closeProjectDetail"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { projectsData } from '~/model'
import type { Project } from '~/model'

const props = withDefaults(
  defineProps<{
    projects?: Project[]
  }>(),
  {
    projects: () => projectsData
  }
)

const showAll = ref(false)
const isModalOpen = ref(false)
const selectedProject = ref<Project | null>(null)

const allProjects = computed(() => props.projects)

const visibleProjects = computed(() => {
  return showAll.value ? allProjects.value : allProjects.value.slice(0, 2)
})

const toggleShowAll = () => {
  showAll.value = !showAll.value
}

const openProjectDetail = (project: Project) => {
  selectedProject.value = project
  isModalOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeProjectDetail = () => {
  isModalOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeProjectDetail()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Main Section: Clean White Background */
.project-section {
  background-color: #ffffff;
  color: #0f0e0e;
  transition: background-color 0.3s ease, color 0.3s ease;
}

:global(.dark) .project-section {
  background-color: #0c0c0e;
  color: #ffffff;
}

/* Category Label */
.project-category-tag {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #e76f2b;
  letter-spacing: 0.02em;
}

/* Main Headline */
.project-headline {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: clamp(2.4rem, 4.2vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  color: #0f0e0e;
  letter-spacing: -0.02em;
}

:global(.dark) .project-headline {
  color: #ffffff;
}

/* Accent Circle Behind 'work' */
.work-word-wrapper {
  position: relative;
  display: inline-block;
}

.work-circle-accent {
  position: absolute;
  top: 50%;
  left: 28%;
  transform: translate(-50%, -50%);
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: #feb83c;
  z-index: 1;
}

.work-text {
  position: relative;
  z-index: 2;
}

/* Project Card */
.project-card {
  transition: transform 0.35s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}

/* Card Thumbnail Wrapper */
.project-thumbnail-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9.8;
  border-radius: 20px;
  background-color: #1a1a1e;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  position: relative;
}

:global(.dark) .project-thumbnail-wrapper {
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4);
}

.project-thumbnail-img {
  object-fit: cover;
  display: block;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-thumbnail-wrapper:hover .project-thumbnail-img {
  transform: scale(1.04);
}

/* Hover Quick View Overlay */
.project-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 14, 14, 0.45);
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
}

.project-thumbnail-wrapper:hover .project-hover-overlay {
  opacity: 1;
}

.btn-quick-view {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #0f0e0e;
  background: #ffffff;
  padding: 8px 18px;
  border-radius: 9999px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(6px);
  transition: transform 0.3s ease;
}

.project-thumbnail-wrapper:hover .btn-quick-view {
  transform: translateY(0);
}

:global(.dark) .btn-quick-view {
  background: #feb83c;
  color: #0f0e0e;
}

/* Project Title Button */
.project-title-btn {
  cursor: pointer;
  padding-top: 4px;
}

.project-title-btn:hover .project-title {
  color: #e76f2b;
}

:global(.dark) .project-title-btn:hover .project-title {
  color: #feb83c;
}

.project-title-btn:hover .project-arrow-circle {
  transform: translate(3px, -3px);
  color: #e76f2b;
}

:global(.dark) .project-title-btn:hover .project-arrow-circle {
  color: #feb83c;
}

/* Tag Pills */
.tag-pill {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 9999px;
  padding: 4px 12px;
  letter-spacing: 0.04em;
  transition: all 0.25s ease;
  white-space: nowrap;
}

/* Primary Category Badges (as in reference image) */
.tag-primary {
  border: 1px solid #d1d5db;
  color: #4b5563;
  background-color: #ffffff;
}

:global(.dark) .tag-primary {
  border-color: rgba(255, 255, 255, 0.2);
  color: #e5e7eb;
  background-color: rgba(255, 255, 255, 0.04);
}

/* Technology Stack Badges (Requested) */
.tag-tech {
  border: 1px solid #f3c442;
  color: #92400e;
  background-color: #fefce8;
}

:global(.dark) .tag-tech {
  border-color: rgba(243, 196, 66, 0.4);
  color: #f3c442;
  background-color: rgba(243, 196, 66, 0.08);
}

/* Project Title & Arrow */
.project-title-link {
  color: #0f0e0e;
  cursor: pointer;
  padding-top: 4px;
}

:global(.dark) .project-title-link {
  color: #ffffff;
}

.project-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: clamp(1.3rem, 2.2vw, 1.65rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  transition: color 0.25s ease;
}

.project-title-link:hover .project-title {
  color: #e76f2b;
}

:global(.dark) .project-title-link:hover .project-title {
  color: #feb83c;
}

.project-arrow-circle {
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
  color: #0f0e0e;
  transition: transform 0.3s ease, color 0.25s ease;
  margin-left: 12px;
  flex-shrink: 0;
}

:global(.dark) .project-arrow-circle {
  color: #ffffff;
}

.project-title-link:hover .project-arrow-circle {
  transform: translate(3px, -3px);
  color: #e76f2b;
}

:global(.dark) .project-title-link:hover .project-arrow-circle {
  color: #feb83c;
}

/* View All Projects Button (Wide Black Bar) */
.btn-view-all-projects {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 700;
  background-color: #0f0e0e;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 16px 48px;
  max-width: 900px;
  width: 100%;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.btn-view-all-projects:hover {
  background-color: #27272a;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

:global(.dark) .btn-view-all-projects {
  background-color: #ffffff;
  color: #0f0e0e;
}

:global(.dark) .btn-view-all-projects:hover {
  background-color: #f3f4f6;
  color: #000000;
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.15);
}

.btn-view-all-projects i {
  font-size: 14px;
  transition: transform 0.25s ease;
}

.btn-view-all-projects:hover i {
  transform: translate(2px, -2px);
}

@media (max-width: 767.98px) {
  .work-circle-accent {
    width: 44px;
    height: 44px;
  }
  .btn-view-all-projects {
    padding: 14px 28px;
  }
}

/* ==========================================================================
   Project Detail Modal Popup
   ========================================================================== */
.project-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999999;
  overflow-y: auto;
  transition: opacity 0.3s ease;
}

.project-modal-dialog {
  background-color: #ffffff;
  color: #0f0e0e;
  border-radius: 24px;
  max-width: 820px;
  width: 100%;
  margin: auto;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.35);
  border: 1px solid #e7e8eb;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
}

:global(.dark) .project-modal-dialog {
  background-color: #141417;
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8);
}

/* Modal Close Button */
.btn-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(15, 14, 14, 0.1);
  background: #ffffff;
  color: #0f0e0e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-modal-close:hover {
  background: #0f0e0e;
  color: #ffffff;
  transform: rotate(90deg);
}

:global(.dark) .btn-modal-close {
  background: #242428;
  border-color: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

:global(.dark) .btn-modal-close:hover {
  background: #feb83c;
  color: #0f0e0e;
}

/* Modal Thumbnail Frame */
.modal-thumbnail-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  background-color: #1a1a1e;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

:global(.dark) .modal-thumbnail-wrapper {
  border-color: rgba(255, 255, 255, 0.1);
}

.modal-thumbnail-img {
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Modal Title & Subtitle */
.modal-project-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f0e0e;
}

:global(.dark) .modal-project-title {
  color: #ffffff;
}

.modal-project-subtitle {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  line-height: 1.5;
}

:global(.dark) .modal-project-subtitle {
  color: #a1a1aa;
}

/* Metadata Cards Grid */
.meta-card {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

:global(.dark) .meta-card {
  background-color: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.meta-card-label {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #9ca3af;
  margin-bottom: 4px;
}

.meta-card-value {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #0f0e0e;
  line-height: 1.3;
}

:global(.dark) .meta-card-value {
  color: #ffffff;
}

.text-highlight {
  color: #e76f2b !important;
}

:global(.dark) .text-highlight {
  color: #feb83c !important;
}

/* Section Blocks */
.modal-block-heading {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #0f0e0e;
}

:global(.dark) .modal-block-heading {
  color: #ffffff;
}

.modal-description-text {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: #4b5563;
}

:global(.dark) .modal-description-text {
  color: rgba(255, 255, 255, 0.75);
}

/* Deliverables / Highlights */
.modal-deliverables-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.deliverable-item {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: #374151;
}

:global(.dark) .deliverable-item {
  color: rgba(255, 255, 255, 0.82);
}

.deliverable-bullet {
  color: #feb83c;
  font-weight: 800;
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
}

/* Action Buttons Bar */
.modal-actions-bar {
  border-top-color: #e5e7eb !important;
}

:global(.dark) .modal-actions-bar {
  border-top-color: rgba(255, 255, 255, 0.08) !important;
}

.btn-modal-demo {
  background-color: #0f0e0e;
  color: #ffffff !important;
  font-family: var(--ff-manrope), sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 10px;
  transition: all 0.25s ease;
}

.btn-modal-demo:hover {
  background-color: #27272a;
  transform: translateY(-2px);
}

:global(.dark) .btn-modal-demo {
  background-color: #feb83c;
  color: #0f0e0e !important;
}

:global(.dark) .btn-modal-demo:hover {
  background-color: #f5a623;
  box-shadow: 0 6px 18px rgba(254, 184, 60, 0.35);
}

.btn-modal-repo {
  background: transparent;
  color: #0f0e0e !important;
  border: 1px solid rgba(15, 14, 14, 0.2);
  font-family: var(--ff-manrope), sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 10px;
  transition: all 0.25s ease;
}

.btn-modal-repo:hover {
  border-color: #0f0e0e;
  background-color: rgba(15, 14, 14, 0.05);
}

:global(.dark) .btn-modal-repo {
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.25);
}

:global(.dark) .btn-modal-repo:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: #ffffff;
}

.btn-modal-dismiss {
  background: transparent;
  border: none;
  font-family: var(--ff-manrope), sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  padding: 8px 16px;
  transition: color 0.2s ease;
}

.btn-modal-dismiss:hover {
  color: #0f0e0e;
}

:global(.dark) .btn-modal-dismiss:hover {
  color: #ffffff;
}

/* Modal Fade Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .project-modal-dialog,
.modal-fade-leave-active .project-modal-dialog {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.modal-fade-enter-from .project-modal-dialog,
.modal-fade-leave-to .project-modal-dialog {
  transform: scale(0.95) translateY(18px);
  opacity: 0;
}

</style>

