<template>
  <section id="about" class="about-me-section min-vh-100 d-flex align-items-center position-relative overflow-hidden py-5 py-lg-6">
    <div class="container position-relative z-1">
      <div class="row align-items-center">
        <!-- Left Column: Portrait with Badge & Sparkle -->
        <div class="col-lg-5 col-12 mb-5 mb-lg-0 d-flex justify-content-center justify-content-lg-start">
          <div class="about-image-wrapper position-relative">
            <!-- Decorative Star / Sparkle Accent -->
            <div class="sparkle-accent" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#f3c442">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/>
              </svg>
            </div>

            <!-- Portrait Image Card -->
            <div class="portrait-card overflow-hidden position-relative">
              <img
                :src="about.portraitImg"
                alt="Leang Honghav - Product Designer Portrait"
                class="portrait-img w-100 h-100"
                loading="lazy"
              />

              <!-- "Available for Work" Pill Badge -->
              <div v-if="about.isAvailableForWork" class="available-badge position-absolute d-inline-flex align-items-center gap-2">
                <span class="badge-text">{{ about.availableBadgeText }}</span>
                <span class="pulse-indicator">
                  <span class="pulse-ring"></span>
                  <span class="pulse-dot"></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Heading, Bio & Specialties -->
        <div class="col-lg-7 col-12 ps-lg-5">
          <div class="about-content-box">
            <!-- Small Category Label -->
            <span class="about-tag d-inline-block mb-3">{{ about.categoryTag }}</span>

            <!-- Main Headline with Golden Accents -->
            <h2 class="about-headline mb-4">
              A passionate <span class="highlight-accent">web designer</span> turning <span class="highlight-accent">ideas</span> into visually stunning, user-friendly websites.
            </h2>

            <!-- Biography / Intro Paragraph -->
            <p class="about-intro-text mb-4 mb-lg-5">
              {{ about.bioText }}
            </p>

            <!-- Specialties Grid in Two Columns -->
            <div class="row g-3">
              <!-- Left Column Specialties -->
              <div class="col-sm-6 col-12">
                <ul class="specialty-list list-unstyled mb-0">
                  <li
                    v-for="(item, idx) in about.leftSpecialties"
                    :key="idx"
                    class="specialty-item d-flex align-items-center"
                  >
                    <span class="specialty-arrow me-2.5">→</span>
                    <span class="specialty-name">{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Right Column Specialties -->
              <div class="col-sm-6 col-12">
                <ul class="specialty-list list-unstyled mb-0">
                  <li
                    v-for="(item, idx) in about.rightSpecialties"
                    :key="idx"
                    class="specialty-item d-flex align-items-center"
                  >
                    <span class="specialty-arrow me-2.5">→</span>
                    <span class="specialty-name">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { aboutMeData } from '~/model'
import type { AboutMe } from '~/model'

withDefaults(
  defineProps<{
    about?: AboutMe
  }>(),
  {
    about: () => aboutMeData
  }
)
</script>

<style scoped>
/* Full Section: Dark Theme Aligned with Project */
.about-me-section {
  background-color: #0c0c0e;
  color: #ffffff;
  min-height: 100vh;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

/* Image Wrapper and Relative Positioning */
.about-image-wrapper {
  max-width: 380px;
  width: 100%;
}

/* Sparkle Star Decorative Accent */
.sparkle-accent {
  position: absolute;
  left: -28px;
  top: 42%;
  transform: translateY(-50%);
  animation: floatSparkle 4s ease-in-out infinite alternate;
  z-index: 2;
}

@keyframes floatSparkle {
  0% {
    transform: translateY(-50%) rotate(0deg) scale(1);
  }
  100% {
    transform: translateY(-60%) rotate(15deg) scale(1.15);
  }
}

/* Portrait Card */
.portrait-card {
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #141416;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
  position: relative;
}

.portrait-img {
  object-fit: contain;
  display: block;
}

/* "Available for Work" Pill Badge */
.available-badge {
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f3c442;
  color: #0a0a0b;
  border-radius: 9999px;
  padding: 8px 18px;
  box-shadow: 0 10px 20px -5px rgba(243, 196, 66, 0.4);
  white-space: nowrap;
  z-index: 3;
}

.badge-text {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* Pulsing Green Indicator Dot */
.pulse-indicator {
  position: relative;
  width: 10px;
  height: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #15803d;
  opacity: 0.75;
  animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.pulse-dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #166534;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

/* Content Box */
.about-content-box {
  max-width: 680px;
}

/* Category Label */
.about-tag {
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.04em;
  text-transform: none;
}

/* Main Headline */
.about-headline {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: clamp(2rem, 3.4vw, 2.85rem);
  font-weight: 700;
  line-height: 1.25;
  color: #ffffff;
  letter-spacing: -0.02em;
}

/* Yellow Accent Matching the Project */
.highlight-accent {
  color: #f3c442;
}

/* Bio Description Text */
.about-intro-text {
  font-family: var(--ff-manrope), 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
}

/* Specialty Items List */
.specialty-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.specialty-item {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  transition: transform 0.25s ease, color 0.25s ease;
  cursor: default;
}

.specialty-item:hover {
  transform: translateX(4px);
  color: #f3c442;
}

.specialty-arrow {
  color: #f3c442;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  transition: transform 0.25s ease;
}

.specialty-item:hover .specialty-arrow {
  transform: translateX(3px);
}

.specialty-name {
  letter-spacing: -0.01em;
}

@media (max-width: 991.98px) {
  .sparkle-accent {
    display: none;
  }
  .about-image-wrapper {
    max-width: 320px;
  }
}
</style>
