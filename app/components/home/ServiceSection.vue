<template>
  <section id="services" class="service-section min-vh-100 d-flex align-items-center position-relative overflow-hidden">
    <div class="container position-relative z-1 w-100">
      <!-- Section Header -->
      <div class="section-header text-center mb-5">
        <h2 class="service-headline">
          My <span class="highlight-accent">Special Service</span> For your Website Development
        </h2>
      </div>

      <!-- Service Cards Grid -->
      <div class="row g-4 justify-content-center">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="col-lg-4 col-md-6 col-12"
        >
          <div class="service-card">
            <!-- Icon Bubble -->
            <div class="service-icon-bubble">
              <!-- Yin-Yang Icon for Brand Identity -->
              <svg
                v-if="service.iconType === 'yinyang'"
                class="service-icon-svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1 0-16 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 0-4 4 4 4 0 0 0 4 4zm0-14a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 8a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
              </svg>

              <!-- Vector / Bounding Box Icon for Website Design -->
              <svg
                v-else-if="service.iconType === 'layout'"
                class="service-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="5" height="5" rx="1" fill="currentColor" stroke="none" />
                <rect x="16" y="3" width="5" height="5" rx="1" fill="currentColor" stroke="none" />
                <rect x="3" y="16" width="5" height="5" rx="1" fill="currentColor" stroke="none" />
                <rect x="16" y="16" width="5" height="5" rx="1" fill="currentColor" stroke="none" />
                <line x1="8" y1="5.5" x2="16" y2="5.5" />
                <line x1="8" y1="18.5" x2="16" y2="18.5" />
                <line x1="5.5" y1="8" x2="5.5" y2="16" />
                <line x1="18.5" y1="8" x2="18.5" y2="16" />
              </svg>

              <!-- Layers / Stack Icon for Application Design -->
              <svg
                v-else-if="service.iconType === 'layers'"
                class="service-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>

              <!-- Default Fallback Icon -->
              <i v-else :class="service.iconClass || 'bi bi-lightning-charge'"></i>
            </div>

            <!-- Card Title -->
            <h3 class="service-card-title">
              {{ service.title }}
            </h3>

            <!-- Card Description -->
            <p class="service-card-desc mb-0">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { servicesData } from '~/model'
import type { Service } from '~/model'

const props = withDefaults(
  defineProps<{
    services?: Service[]
  }>(),
  {
    services: () => servicesData
  }
)
</script>

<style scoped>
/* Full Section Background: Pure Black with Full Viewport Height */
.service-section {
  background-color: #000000;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

/* Headline Styling */
.service-headline {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: clamp(2rem, 3.8vw, 3rem);
  font-weight: 700;
  line-height: 1.25;
  color: #ffffff;
  letter-spacing: -0.02em;
  max-width: 820px;
  margin: 0 auto;
}

/* Highlight accent matching the warm golden/yellow in design */
.highlight-accent {
  color: #f3c442;
}

/* Service Card Container: Black Background with White Text */
.service-card {
  background-color: #0d0d0e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 38px 32px 42px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.service-card:hover {
  transform: translateY(-8px);
  border-color: #f3c442;
  background-color: #141416;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
}

/* Circular Top Icon Bubble */
.service-icon-bubble {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1f1f23;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.service-card:hover .service-icon-bubble {
  background-color: #f3c442;
  color: #000000;
  border-color: #f3c442;
  transform: scale(1.08);
}

.service-icon-svg {
  width: 26px;
  height: 26px;
}

/* Card Title: Crisp White */
.service-card-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 14px;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

/* Card Description: Light Grey / White Readable Text */
.service-card-desc {
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

.service-card:hover .service-card-desc {
  color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 767.98px) {
  .service-section {
    padding: 60px 0;
  }
  .service-card {
    padding: 30px 24px 34px;
  }
}
</style>
