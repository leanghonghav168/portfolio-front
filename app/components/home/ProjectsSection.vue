<template>
  <section id="portfolio" class="projects section-mt">
    <div class="projects-wrapper">
      <div class="container">
        <!-- Section Header -->
        <div class="section-title-wrapper row align-items-center mb-4">
          <div class="col-xxl-5 col-12">
            <div class="section-title">
              <h3>Latest Project</h3>
              <span></span>
            </div>
          </div>
          <div class="col-xxl-7 col-12 mt-3 mt-xxl-0">
            <nav class="project-filter">
              <ul class="d-flex flex-wrap justify-content-xxl-end list-unstyled gap-2 gap-md-3 mb-0">
                <li
                  v-for="(item, idx) in filterTabs"
                  :key="idx"
                  style="cursor: pointer"
                  @click="activeFilter = item.filter"
                >
                  <span :class="['filter-btn', { active: activeFilter === item.filter }]">
                    {{ item.label }}
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- 2x2 High-Tech Blueprint Grid -->
        <div class="projects-grid-frame border rounded-3 overflow-hidden bg-white">
          <div class="row g-0">
            <div
              v-for="(project, idx) in filteredProjects"
              :key="project.id"
              :class="[
                'col-lg-6 col-12 project-grid-cell p-4 p-md-5 d-flex flex-column justify-content-between',
                {
                  'cell-border-right': idx % 2 === 0,
                  'cell-border-bottom': idx < 2
                }
              ]"
            >
              <div>
                <!-- Top Meta Bar -->
                <div class="d-flex align-items-center justify-content-between mb-3 font-monospace">
                  <span class="project-num-tag">
                    {{ project.num }} // {{ project.categoryLabel }}
                  </span>
                  <span class="project-perf-badge">
                    {{ project.metric }}
                  </span>
                </div>

                <!-- Project Screenshot Container -->
                <div class="project-thumb-box position-relative overflow-hidden rounded-2 mb-4">
                  <img
                    :src="project.img"
                    :alt="project.title"
                    class="img-fluid w-100 object-fit-cover project-img"
                    style="aspect-ratio: 2.18 / 1; min-height: 220px;"
                  />
                  <!-- Subtle hover overlay -->
                  <div class="project-img-overlay"></div>
                </div>

                <!-- Project Title -->
                <h4 class="project-card-title mb-2">
                  {{ project.title }}
                </h4>

                <!-- Project Description -->
                <p class="project-desc mb-4">
                  {{ project.description }}
                </p>

                <!-- Tech Stack Tags -->
                <div class="project-tags d-flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="(tech, tIdx) in project.techStack"
                    :key="tIdx"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="project-actions d-flex align-items-center gap-3 pt-3 border-top">
                <a
                  :href="project.demoUrl"
                  target="_blank"
                  class="btn-live-demo"
                  @click.prevent="openModal(project)"
                >
                  <span>LIVE DEMO</span>
                  <i class="bi bi-arrow-up-right"></i>
                </a>

                <a
                  :href="project.repoUrl"
                  target="_blank"
                  class="btn-repo"
                  @click.prevent="openModal(project)"
                >
                  <span>REPOSITORY</span>
                  <span class="repo-bracket">&lt; &gt;</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom Blueprint Matrix Indicator -->
          <div class="matrix-bottom-bar px-4 py-3 border-top d-flex align-items-center justify-content-between font-monospace">
            <span class="text-muted" style="font-size: 11px; letter-spacing: 1px;">
              05 // TECHNICAL MATRIX
            </span>
            <span class="text-muted" style="font-size: 11px; letter-spacing: 1px;">
              PROD-READY ARCHITECTURES
            </span>
          </div>
        </div>

        <!-- View All Button -->
        <div class="view-all-btn-wrapper text-center mt-5">
          <NuxtLink to="/blog-list" class="bttn-round text-decoration-none">
            <span class="btn-txt">
              View All Works <i class="bi bi-arrow-up-right"></i>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Project Details Modal -->
    <div
      v-if="isModalOpen && selectedProject"
      class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3"
      @click.self="isModalOpen = false"
    >
      <div class="popup_modal_content bg-white text-dark rounded-4 p-4 p-md-5 position-relative shadow-lg" style="max-width: 780px; width: 100%;">
        <button
          type="button"
          class="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          @click="isModalOpen = false"
        ></button>
        <div class="project-info-wrapper">
          <div class="d-flex align-items-center justify-content-between mb-3 font-monospace">
            <span class="text-muted fw-bold" style="font-size: 12px; letter-spacing: 1px;">
              {{ selectedProject.num }} // {{ selectedProject.categoryLabel }}
            </span>
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1" style="font-size: 11px;">
              {{ selectedProject.metric }}
            </span>
          </div>

          <div class="thumbnail-wrapper mb-4 overflow-hidden rounded-3 border">
            <img
              :src="selectedProject.img"
              :alt="selectedProject.title"
              class="img-fluid w-100 object-fit-cover"
              style="max-height: 380px;"
            />
          </div>

          <h3 class="fw-bold mb-2" style="font-family: var(--ff-syne); font-size: 24px;">
            {{ selectedProject.title }}
          </h3>
          <p class="text-muted mb-4" style="font-size: 15px; line-height: 1.6;">
            {{ selectedProject.description }}
          </p>

          <div class="d-flex flex-wrap gap-2 mb-4">
            <span
              v-for="(tech, idx) in selectedProject.techStack"
              :key="idx"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>

          <div class="d-flex gap-3">
            <a :href="selectedProject.demoUrl" target="_blank" class="btn-live-demo">
              <span>LIVE DEMO</span>
              <i class="bi bi-arrow-up-right"></i>
            </a>
            <a :href="selectedProject.repoUrl" target="_blank" class="btn-repo">
              <span>REPOSITORY</span>
              <span class="repo-bracket">&lt; &gt;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Project {
  id: number
  num: string
  category: string[]
  categoryLabel: string
  metric: string
  img: string
  title: string
  description: string
  techStack: string[]
  demoUrl: string
  repoUrl: string
}

const activeFilter = ref('all')
const isModalOpen = ref(false)
const selectedProject = ref<Project | null>(null)

const filterTabs = [
  { label: 'All Projects', filter: 'all' },
  { label: 'Fintech & Enterprise', filter: 'fintech' },
  { label: 'Full-Stack & Cloud', filter: 'fullstack' },
  { label: 'Real-Time Systems', filter: 'realtime' },
  { label: 'E-Commerce', filter: 'ecommerce' }
]

const projects: Project[] = [
  {
    id: 1,
    num: '01',
    category: ['fintech', 'fullstack'],
    categoryLabel: 'ENTERPRISE FINTECH',
    metric: '<10MS LATENCY',
    img: '/images/projects/project-loan.png',
    title: 'LOAN MANAGEMENT SYSTEM',
    description:
      'Web-based enterprise platform automating borrower evaluation workflows, risk metrics, and multi-tier approval authorization. Reduced processing turnaround time by 40%.',
    techStack: ['Nuxt 3', 'NestJS', 'PostgreSQL', 'Tailwind CSS'],
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: 2,
    num: '02',
    category: ['fullstack'],
    categoryLabel: 'CAMPUS TRACKING AWARD WINNER',
    metric: 'REAL-TIME QR/NFC',
    img: '/images/projects/project-attendance.png',
    title: 'SCHOOL ATTENDANCE MANAGEMENT',
    description:
      'Automated campus tracking architecture integrating contactless hardware scans, live session registration, parent notifications, and automated academic ledger generation.',
    techStack: ['Next.js', 'Laravel', 'MySQL', 'Redis'],
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: 3,
    num: '03',
    category: ['realtime', 'fullstack'],
    categoryLabel: 'HOSPITALITY REAL-TIME SYSTEMS',
    metric: 'WEBSOCKET SYNC',
    img: '/images/projects/project-restaurant.png',
    title: 'RESTAURANT E-MENU & ORDERING',
    description:
      'Contactless digital restaurant suite featuring tabletop QR ordering, bi-directional kitchen display terminal dispatch, and instant point-of-sale receipt issuance.',
    techStack: ['Vue.js', 'Laravel', 'WebSockets', 'Tailwind CSS'],
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: 4,
    num: '04',
    category: ['ecommerce', 'fullstack'],
    categoryLabel: 'E-COMMERCE ARCHITECTURE',
    metric: 'PAYMENT GATEWAY',
    img: '/images/projects/project-food.png',
    title: 'PAPA FOOD E-COMMERCE',
    description:
      'High-conversion delivery storefront optimized for zero-delay route hydration, dynamic Pinia cart mutation, promo validation rules, and multi-vendor checkout.',
    techStack: ['Nuxt 3', 'Vue 3', 'Pinia', 'Stripe API'],
    demoUrl: '#',
    repoUrl: '#'
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter(p => p.category.includes(activeFilter.value))
})

const openModal = (project: Project) => {
  selectedProject.value = project
  isModalOpen.value = true
}
</script>

<style scoped>
/* Filter Buttons */
.filter-btn {
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  background: var(--clr-light-gray);
  color: var(--clr-black);
}

.filter-btn.active,
.filter-btn:hover {
  background: var(--clr-orange);
  color: #fff;
}

/* Grid Outer Frame */
.projects-grid-frame {
  border-color: rgba(15, 14, 14, 0.1) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

/* Cell Borders */
@media (min-width: 992px) {
  .cell-border-right {
    border-right: 1px solid rgba(15, 14, 14, 0.1);
  }
}

.cell-border-bottom {
  border-bottom: 1px solid rgba(15, 14, 14, 0.1);
}

.project-grid-cell {
  background: #ffffff;
  transition: background 0.3s ease;
}

.project-grid-cell:hover {
  background: #fbfbfb;
}

/* Top Meta Bar */
.project-num-tag {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #64748b;
}

.project-perf-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #0284c7;
}

/* Screenshot Box */
.project-thumb-box {
  border: 1px solid rgba(15, 14, 14, 0.08);
  background: #0f172a;
}

.project-img {
  transition: transform 0.5s ease;
}

.project-grid-cell:hover .project-img {
  transform: scale(1.03);
}

/* Title & Description */
.project-card-title {
  font-family: var(--ff-syne), sans-serif;
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--clr-black);
  line-height: 1.3;
}

.project-desc {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 13.5px;
  line-height: 1.6;
  color: #545b63;
}

/* Tech Stack Tags */
.tech-tag {
  font-family: var(--ff-manrope), monospace;
  font-size: 11px;
  font-weight: 500;
  color: #475569;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 3px 10px;
  border-radius: 4px;
  letter-spacing: 0.3px;
}

/* Action Buttons */
.btn-live-demo {
  background: #0f0e0e;
  color: #ffffff !important;
  font-family: var(--ff-manrope), monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  padding: 7px 16px;
  border-radius: 4px;
  border: 1px solid #0f0e0e;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-live-demo:hover {
  background: var(--clr-orange);
  border-color: var(--clr-orange);
  transform: translateY(-1px);
}

.btn-repo {
  background: transparent;
  color: #0f0e0e !important;
  font-family: var(--ff-manrope), monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  padding: 7px 16px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-repo:hover {
  border-color: #0f0e0e;
  background: rgba(15, 14, 14, 0.04);
  transform: translateY(-1px);
}

.repo-bracket {
  font-weight: 800;
  letter-spacing: 1px;
}

/* Matrix Bottom Bar */
.matrix-bottom-bar {
  background: #f8fafc;
  border-color: rgba(15, 14, 14, 0.1) !important;
}

/* Modal Popup */
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 999999;
}

/* Dark Mode Overrides */
:global(.dark) .projects-grid-frame {
  background: #141313 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

:global(.dark) .project-grid-cell {
  background: #141313;
}

:global(.dark) .project-grid-cell:hover {
  background: #1a1919;
}

:global(.dark) .cell-border-right {
  border-right-color: rgba(255, 255, 255, 0.1);
}

:global(.dark) .cell-border-bottom {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

:global(.dark) .project-card-title {
  color: #ffffff;
}

:global(.dark) .project-desc {
  color: rgba(255, 255, 255, 0.65);
}

:global(.dark) .project-num-tag {
  color: rgba(255, 255, 255, 0.5);
}

:global(.dark) .tech-tag {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

:global(.dark) .btn-live-demo {
  background: #ffffff;
  color: #0f0e0e !important;
  border-color: #ffffff;
}

:global(.dark) .btn-live-demo:hover {
  background: var(--clr-orange);
  border-color: var(--clr-orange);
  color: #ffffff !important;
}

:global(.dark) .btn-repo {
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.2);
}

:global(.dark) .btn-repo:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: #ffffff;
}

:global(.dark) .matrix-bottom-bar {
  background: #0f0e0e;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

:global(.dark) .filter-btn {
  background: var(--clr-white-06);
  color: #fff;
}

:global(.dark) .filter-btn.active,
:global(.dark) .filter-btn:hover {
  background: var(--clr-orange);
}

:global(.dark) .popup_modal_content {
  background: #1d1c1c !important;
  color: #fff !important;
}

:global(.dark) .popup_modal_content h3 {
  color: #fff;
}
</style>
