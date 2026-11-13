<template>
  <section id="skills" class="skills-section position-relative py-5 overflow-hidden" aria-label="Core Skills & Technologies">
    <div class="container position-relative">
      <h2 class="visually-hidden">Core Skills & Technologies</h2>
      <div class="carousel-wrapper">
        <UCarousel
          :items="skills"

          class="skills-carousel"
          :ui="{
            root: 'w-full overflow-hidden',
            viewport: 'overflow-hidden w-full py-2',
            container: 'd-flex flex-row align-items-center gap-4 ml-4',
            item: 'flex-shrink-0'
          }"
        >
          <template #default="{ item }">
            <div class="skill-pill-card">
              <!-- Top Circle Icon -->
              <div class="skill-icon-bubble">
                <img
                  :src="item.img"
                  :alt="item.name"
                  class="skill-logo"
                  loading="lazy"
                  draggable="false"
                />
              </div>

              <!-- Skill Meta: Percentage & Name -->
              <div class="skill-meta text-center">
                <span class="skill-percentage">{{ item.percent }}</span>
                <span class="skill-title">{{ item.name }}</span>
              </div>
            </div>
          </template>
        </UCarousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { skillsData } from '~/model'
import type { Skill } from '~/model'

const props = withDefaults(
  defineProps<{
    skills?: Skill[]
  }>(),
  {
    skills: () => skillsData
  }
)
</script>

<style scoped>
.skills-section {
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

:global(.dark) .skills-section {
  background-color: #0e0e10;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
}

/* Force UCarousel container to be horizontal flex-row */
:deep([data-slot="viewport"]) {
  overflow: hidden !important;
  width: 100% !important;
}

:deep([data-slot="container"]) {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 20px !important;
  margin-left: 0 !important;
  will-change: transform;
}

:deep([data-slot="item"]) {
  display: flex !important;
  flex: 0 0 auto !important;
  flex-shrink: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

/* Stadium / Pill Shaped Card */
.skill-pill-card {
  width: 136px;
  height: 242px;
  border-radius: 9999px;
  border: 1px solid #e7e8eb;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 12px 24px;
  box-sizing: border-box;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: grab;
  user-select: none;
}

.skill-pill-card:active {
  cursor: grabbing;
}

.skill-pill-card:hover {
  transform: translateY(-5px);
  border-color: #111827;
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.08);
}

:global(.dark) .skill-pill-card {
  background-color: #161618;
  border-color: rgba(255, 255, 255, 0.08);
}

:global(.dark) .skill-pill-card:hover {
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.4);
}

/* Circular Top Icon Bubble */
.skill-icon-bubble {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  flex-shrink: 0;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

:global(.dark) .skill-icon-bubble {
  background-color: #242428;
}

.skill-pill-card:hover .skill-icon-bubble {
  transform: scale(1.06);
}

/* Logo Image inside Bubble */
.skill-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

/* Text Container inside Card */
.skill-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
}

/* Percentage Number */
.skill-percentage {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  color: #0f0e0e;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
}

:global(.dark) .skill-percentage {
  color: #f9fafb;
}

/* Skill Name Label */
.skill-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
  margin-top: 6px;
  transition: color 0.3s ease;
}

:global(.dark) .skill-title {
  color: #9ca3af;
}

.skill-pill-card:hover .skill-title {
  color: #111827;
}

:global(.dark) .skill-pill-card:hover .skill-title {
  color: #ffffff;
}
</style>
