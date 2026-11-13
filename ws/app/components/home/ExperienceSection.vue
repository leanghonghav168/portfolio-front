<template>
  <section id="experience" class="experience-section py-5 py-lg-6 position-relative overflow-hidden">
    <div class="container position-relative z-1">
      <!-- Section Header -->
      <div class="row align-items-end mb-5 gy-4">
        <div class="col-lg-7 col-12">
          <!-- Small Category Tag -->
          <span class="experience-category-tag d-inline-block mb-2">Resume & Experience</span>

          <!-- Main Headline with Signature Amber Circle Accent Behind 'Experience' -->
          <h2 class="experience-headline mb-0">
            Work
            <span class="experience-word-wrapper">
              <span class="experience-circle-accent" aria-hidden="true"></span>
              <span class="experience-text">Experience</span>
            </span>
          </h2>
        </div>

        <!-- Filter Tabs & Actions -->
        <div class="col-lg-5 col-12 d-flex flex-wrap justify-content-lg-end align-items-center gap-3">
          <!-- Tab Navigation (Experience vs Education) -->
          <div class="experience-tabs-nav d-inline-flex p-1 rounded-pill">
            <button
              type="button"
              :class="['tab-btn rounded-pill', { active: activeTab === 'work' }]"
              @click="activeTab = 'work'"
            >
              <i class="bi bi-briefcase me-1.5"></i>
              <span>Experience</span>
            </button>
            <button
              type="button"
              :class="['tab-btn rounded-pill', { active: activeTab === 'education' }]"
              @click="activeTab = 'education'"
            >
              <i class="bi bi-mortarboard me-1.5"></i>
              <span>Education</span>
            </button>
          </div>

          <!-- Download CV CTA -->
          <a
            href="#"
            class="btn-cv-download text-decoration-none d-inline-flex align-items-center gap-2"
            title="Download Curriculum Vitae"
            @click.prevent="handleDownloadCV"
          >
            <span>Get CV</span>
            <i class="bi bi-arrow-down-circle"></i>
          </a>
        </div>
      </div>

      <!-- Experience Cards List -->
      <div class="experience-list d-flex flex-column gap-4">
        <!-- Work Experience Tab Content -->
        <template v-if="activeTab === 'work'">
          <div
            v-for="item in workExperiences"
            :key="item.id"
            class="experience-card"
          >
            <div class="row g-4 align-items-start">
              <!-- Left Column: Period Badge, Company & Location -->
              <div class="col-lg-4 col-md-5 col-12">
                <div class="experience-company-box">
                  <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="period-pill">
                      {{ item.period }}
                    </span>
                    <span v-if="item.isCurrent" class="current-pulse-badge">
                      <span class="pulse-ring"></span>
                      <span class="pulse-dot"></span>
                      <span class="ms-1.5 fw-bold" style="font-size: 11px;">Current</span>
                    </span>
                  </div>

                  <h3 class="company-title mb-1">
                    {{ item.company }}
                  </h3>
                  <div class="company-meta d-flex align-items-center gap-2">
                    <span class="company-location">
                      <i class="bi bi-geo-alt me-1"></i>{{ item.location }}
                    </span>
                    <span class="meta-dot">•</span>
                    <span class="employment-type">{{ item.type }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Column: Role Title, Summary, Key Achievements & Skills -->
              <div class="col-lg-8 col-md-7 col-12">
                <div class="experience-details-box ps-lg-3">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <h4 class="role-headline mb-0">
                      {{ item.role }}
                    </h4>
                    <span class="arrow-indicator" aria-hidden="true">
                      <i class="bi bi-arrow-up-right"></i>
                    </span>
                  </div>

                  <p class="role-description mb-3">
                    {{ item.description }}
                  </p>

                  <!-- Key Achievements List with Golden Arrow Bullets -->
                  <ul v-if="item.highlights?.length" class="highlights-list list-unstyled mb-3">
                    <li
                      v-for="(point, pIdx) in item.highlights"
                      :key="pIdx"
                      class="highlight-item d-flex align-items-start mb-1.5"
                    >
                      <span class="highlight-arrow me-2">→</span>
                      <span>{{ point }}</span>
                    </li>
                  </ul>

                  <!-- Technology Stack Badges (matching tag-tech in ProjectSection) -->
                  <div class="tech-tags-row d-flex flex-wrap align-items-center gap-2 pt-1">
                    <span
                      v-for="(tech, tIdx) in item.skills"
                      :key="tIdx"
                      class="tag-pill tag-tech"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Education & Credentials Tab Content -->
        <template v-else>
          <div
            v-for="edu in educations"
            :key="edu.id"
            class="experience-card"
          >
            <div class="row g-4 align-items-start">
              <!-- Left Column: Period Badge & Institution -->
              <div class="col-lg-4 col-md-5 col-12">
                <div class="experience-company-box">
                  <div class="mb-3">
                    <span class="period-pill">
                      {{ edu.period }}
                    </span>
                  </div>
                  <h3 class="company-title mb-1">
                    {{ edu.institution }}
                  </h3>
                  <div class="company-meta d-flex align-items-center gap-2">
                    <span class="company-location">
                      <i class="bi bi-geo-alt me-1"></i>{{ edu.location }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Right Column: Degree, Field, Summary & Key Focus -->
              <div class="col-lg-8 col-md-7 col-12">
                <div class="experience-details-box ps-lg-3">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <h4 class="role-headline mb-0">
                      {{ edu.degree }}
                    </h4>
                    <span class="arrow-indicator" aria-hidden="true">
                      <i class="bi bi-arrow-up-right"></i>
                    </span>
                  </div>

                  <p class="role-description mb-3">
                    {{ edu.description }}
                  </p>

                  <!-- Skills / Topics Studied -->
                  <div class="tech-tags-row d-flex flex-wrap align-items-center gap-2 pt-1">
                    <span
                      v-for="(topic, oIdx) in edu.skills"
                      :key="oIdx"
                      class="tag-pill tag-tech"
                    >
                      {{ topic }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { workExperiencesData, educationsData } from '~/model'
import type { WorkExperience, Education } from '~/model'

const props = withDefaults(
  defineProps<{
    workExperiences?: WorkExperience[]
    educations?: Education[]
  }>(),
  {
    workExperiences: () => workExperiencesData,
    educations: () => educationsData
  }
)

const activeTab = ref<'work' | 'education'>('work')

const handleDownloadCV = () => {
  if (typeof window !== 'undefined') {
    alert('Thank you for your interest! The CV download has been initiated.')
  }
}
</script>

<style scoped>
/* Main Section Background & Transition */
.experience-section {
  background-color: #ffffff;
  color: #0f0e0e;
  transition: background-color 0.35s ease, color 0.35s ease;
}

:global(.dark) .experience-section {
  background-color: #0c0c0e;
  color: #ffffff;
}

/* Category Label (matches ProjectSection & ConnectSection) */
.experience-category-tag {
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #e76f2b;
  letter-spacing: 0.02em;
}

/* Main Headline */
.experience-headline {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: clamp(2.4rem, 4.2vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  color: #0f0e0e;
  letter-spacing: -0.02em;
  transition: color 0.35s ease;
}

:global(.dark) .experience-headline {
  color: #ffffff;
}

/* Accent Circle Behind 'Experience' */
.experience-word-wrapper {
  position: relative;
  display: inline-block;
}

.experience-circle-accent {
  position: absolute;
  top: 50%;
  left: 24%;
  transform: translate(-50%, -50%);
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: #feb83c;
  z-index: 1;
}

.experience-text {
  position: relative;
  z-index: 2;
}

/* Tab Navigation Container */
.experience-tabs-nav {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

:global(.dark) .experience-tabs-nav {
  background-color: #16161a;
  border-color: rgba(255, 255, 255, 0.1);
}

.tab-btn {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 18px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #0f0e0e;
}

:global(.dark) .tab-btn:hover {
  color: #ffffff;
}

.tab-btn.active {
  background-color: #0f0e0e;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

:global(.dark) .tab-btn.active {
  background-color: #ffffff;
  color: #0f0e0e;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
}

/* Download CV CTA Button */
.btn-cv-download {
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #0f0e0e;
  border: 1px solid rgba(15, 14, 14, 0.25);
  border-radius: 9999px;
  padding: 9px 20px;
  background-color: transparent;
  transition: all 0.3s ease;
}

.btn-cv-download:hover {
  background-color: #0f0e0e;
  color: #ffffff !important;
  border-color: #0f0e0e;
  transform: translateY(-2px);
}

:global(.dark) .btn-cv-download {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.25);
}

:global(.dark) .btn-cv-download:hover {
  background-color: #feb83c;
  color: #0f0e0e !important;
  border-color: #feb83c;
  box-shadow: 0 6px 18px rgba(254, 184, 60, 0.3);
}

/* Experience Card */
.experience-card {
  background-color: #ffffff;
  border: 1px solid #e7e8eb;
  border-radius: 24px;
  padding: 32px 36px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.experience-card:hover {
  transform: translateY(-4px);
  border-color: #0f0e0e;
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.08);
}

:global(.dark) .experience-card {
  background-color: #141417;
  border-color: rgba(255, 255, 255, 0.08);
}

:global(.dark) .experience-card:hover {
  border-color: #feb83c;
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.5);
}

/* Period Pill */
.period-pill {
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 9999px;
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
  display: inline-block;
  transition: all 0.3s ease;
}

:global(.dark) .period-pill {
  background-color: rgba(255, 255, 255, 0.06);
  color: #e5e7eb;
  border-color: rgba(255, 255, 255, 0.12);
}

/* Pulse Dot for Current Job */
.current-pulse-badge {
  display: inline-flex;
  align-items: center;
  position: relative;
  color: #15803d;
}

:global(.dark) .current-pulse-badge {
  color: #4ade80;
}

.pulse-ring {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #22c55e;
  opacity: 0.75;
  animation: pingDot 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #16a34a;
  position: absolute;
  left: 1px;
}

@keyframes pingDot {
  75%, 100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

/* Company Title & Meta */
.company-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #0f0e0e;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

:global(.dark) .company-title {
  color: #ffffff;
}

.company-meta {
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  font-size: 14px;
  color: #6b7280;
}

:global(.dark) .company-meta {
  color: #9ca3af;
}

.meta-dot {
  opacity: 0.4;
}

/* Role Headline */
.role-headline {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  font-weight: 700;
  color: #0f0e0e;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.experience-card:hover .role-headline {
  color: #e76f2b;
}

:global(.dark) .role-headline {
  color: #ffffff;
}

:global(.dark) .experience-card:hover .role-headline {
  color: #feb83c;
}

/* Arrow Indicator (matching project title arrow) */
.arrow-indicator {
  font-size: 20px;
  color: #9ca3af;
  transition: all 0.3s ease;
}

.experience-card:hover .arrow-indicator {
  transform: translate(3px, -3px);
  color: #e76f2b;
}

:global(.dark) .arrow-indicator {
  color: #6b7280;
}

:global(.dark) .experience-card:hover .arrow-indicator {
  color: #feb83c;
}

/* Role Description */
.role-description {
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  font-size: 15px;
  line-height: 1.65;
  color: #4b5563;
  transition: color 0.3s ease;
}

:global(.dark) .role-description {
  color: rgba(255, 255, 255, 0.7);
}

/* Highlight Items List */
.highlights-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.highlight-item {
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  transition: color 0.3s ease;
}

:global(.dark) .highlight-item {
  color: rgba(255, 255, 255, 0.82);
}

.highlight-arrow {
  color: #feb83c;
  font-weight: 800;
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

.experience-card:hover .highlight-arrow {
  transform: translateX(2px);
}

/* Technology Stack Badges (Matching ProjectSection tag-tech styling) */
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

.experience-card:hover .tag-tech {
  border-color: #feb83c;
  transform: translateY(-1px);
}

@media (max-width: 767.98px) {
  .experience-card {
    padding: 24px 20px;
  }
  .experience-circle-accent {
    width: 44px;
    height: 44px;
  }
}
</style>

