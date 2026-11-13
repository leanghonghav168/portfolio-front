<template>
  <section class="hero-section-custom position-relative overflow-hidden">
    <div class="container position-relative">
      <div class="row align-items-center min-vh-hero">
        <!-- Left Content Column -->
        <div class="col-lg-6 col-12 py-5 z-2">
          <!-- Greeting line with dash and peace sign -->
          <div class="hero-greeting d-flex align-items-center mb-3">
            <span class="greeting-dash me-2"></span>
            <span>Hello, I'm</span>
            <span class="ms-2 fs-5">✌️</span>
          </div>

          <!-- Big Name with Accent Circle Behind First Letter -->
          <div class="hero-name-container position-relative mb-3">
            <!-- Amber Circle Accent Behind First Letter -->
            <span class="name-circle-accent" aria-hidden="true"></span>
            
            <h1 class="hero-name-title mb-0">
              {{ profile.firstName }}<br />{{ profile.lastName }}
            </h1>
          </div>

          <!-- Subtitle / Role -->
          <p class="hero-subtitle mb-4">
            {{ profile.role }}
          </p>

          <!-- Action Buttons -->
          <div class="d-flex align-items-center gap-3 mb-5">
            <a :href="profile.talkCtaUrl" class="btn-hero-talk text-decoration-none">
              <span>Let's Talk</span>
              <i class="bi bi-arrow-up-right"></i>
            </a>

            <a :href="profile.projectCtaUrl" class="btn-hero-work text-decoration-none">
              <span>My Project</span>
              <i class="bi bi-arrow-up-right"></i>
            </a>
          </div>

          <!-- Bottom Meta: Clients Count & Social Links -->
          <div class="hero-bottom-bar d-flex align-items-center flex-wrap gap-3 pt-2">
            <div class="client-stat">
              <span class="stat-number">{{ profile.clientsCount }}</span>
              <span class="stat-label">Worldwide client</span>
            </div>

            <span class="meta-pipe text-muted d-none d-sm-inline">|</span>

            <div class="social-icons-row d-flex align-items-center gap-3">
              <a
                v-for="social in profile.socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="social-icon-item"
                :title="social.name"
                :aria-label="social.ariaLabel || social.name"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>

        </div>

        <!-- Right Visual / Portrait Column -->
        <div class="col-lg-6 col-12 position-relative text-center d-flex justify-content-center align-items-center py-4 z-1">
          <div class="hero-visual-frame position-relative">
            <!-- Reference Art Image / Composition -->
            <img
              :src="profile.portraitImg"
              alt="Leang Honghav - Lead Product Designer Portrait"
              class="img-fluid hero-portrait-img"
              width="512"
              height="512"
            />

            <!-- Interactive Rotating Contact Badge (Bottom Right) -->
            <a href="#contact" class="hero-badge-link" title="Contact Me">
              <div class="hero-badge-wrapper position-relative">
                <!-- Circular Rotating Text SVG -->
                <svg viewBox="0 0 100 100" class="badge-svg-rotate">
                  <path
                    id="heroBadgePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text font-size="9" font-weight="700" letter-spacing="2.6" fill="#ffffff">
                    <textPath href="#heroBadgePath" startOffset="0%">
                      • CONTACT ME • CONTACT ME 
                    </textPath>
                  </text>
                </svg>

                <!-- Center Down Arrow Circle -->
                <div class="badge-center-circle">
                  <i class="bi bi-arrow-down"></i>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { heroProfileData } from '~/model'
import type { HeroProfile } from '~/model'

withDefaults(
  defineProps<{
    profile?: HeroProfile
  }>(),
  {
    profile: () => heroProfileData
  }
)
</script>

<style scoped>
/* Hero Section Background */
.hero-section-custom {
  min-height: 520px;
  position: relative;
}

.min-vh-hero {
  min-height: 480px;
}

/* Greeting */
.hero-greeting {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #0f0e0e;
}

.greeting-dash {
  display: inline-block;
  width: 28px;
  height: 2px;
  background-color: #0f0e0e;
}

/* Big Name with Circle Accent */
.hero-name-container {
  display: inline-block;
}

.name-circle-accent {
  position: absolute;
  top: 4px;
  left: -8px;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background-color: #feb83c;
  z-index: 1;
}

.hero-name-title {
  position: relative;
  z-index: 2;
  font-family: var(--ff-syne), 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(3.2rem, 5.5vw, 5.2rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -1.5px;
  color: #0f0e0e;
}

/* Subtitle */
.hero-subtitle {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #2b2b2b;
}

/* Buttons */
.btn-hero-talk {
  background: #0f0e0e;
  color: #ffffff !important;
  font-family: var(--ff-manrope), sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 13px 26px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-hero-talk:hover {
  background: #262626;
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.btn-hero-work {
  background: transparent;
  color: #0f0e0e !important;
  border: 1px solid rgba(15, 14, 14, 0.3);
  font-family: var(--ff-manrope), sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 13px 26px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-hero-work:hover {
  border-color: #0f0e0e;
  background: rgba(15, 14, 14, 0.05);
  transform: translateY(-2px);
}

/* Bottom Stats & Socials */
.client-stat {
  font-family: var(--ff-manrope), sans-serif;
}

.stat-number {
  font-size: 20px;
  font-weight: 800;
  color: #0f0e0e;
  margin-right: 6px;
}

.stat-label {
  font-size: 14px;
  color: #555555;
  font-weight: 500;
}

.meta-pipe {
  font-size: 18px;
  opacity: 0.4;
}

.social-icon-item {
  color: #0f0e0e !important;
  font-size: 16px;
  transition: transform 0.25s ease, color 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.social-icon-item:hover {
  color: #feb83c !important;
  transform: translateY(-2px);
}

/* Right Visual Frame */
.hero-visual-frame {
  max-width: 480px;
  width: 100%;
}

.hero-portrait-img {
  width: 100%;
  height: auto;
  border-radius: 20px;
}

/* Rotating Badge */
.hero-badge-link {
  position: absolute;
  bottom: 12px;
  right: 18px;
  z-index: 5;
  text-decoration: none;
}

.hero-badge-wrapper {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: #0f0e0e;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.hero-badge-wrapper:hover {
  transform: scale(1.08);
}

.badge-svg-rotate {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: rotateBadge 12s linear infinite;
}

.badge-center-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #feb83c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f0e0e;
  font-size: 16px;
  font-weight: bold;
  z-index: 2;
  transition: background 0.3s ease;
}

.hero-badge-wrapper:hover .badge-center-circle {
  background: #ffffff;
}

@keyframes rotateBadge {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Tweaks */
@media (max-width: 991px) {
  .hero-section-custom {
    padding-bottom: 40px;
  }
  .hero-name-title {
    font-size: 3.5rem;
  }
  .name-circle-accent {
    width: 65px;
    height: 65px;
  }
  .hero-badge-link {
    bottom: 5px;
    right: 5px;
  }
}

/* Dark Mode Theme */
:global(.dark) .hero-section-custom {
  background-color: #0f0f12;
  color: #ffffff;
}

:global(.dark) .hero-greeting {
  color: #ffffff;
}

:global(.dark) .greeting-dash {
  background-color: #ffffff;
}

:global(.dark) .hero-name-title {
  color: #ffffff;
}

:global(.dark) .hero-subtitle {
  color: #a1a1aa;
}

:global(.dark) .btn-hero-talk {
  background: #feb83c;
  color: #0f0e0e !important;
}

:global(.dark) .btn-hero-talk:hover {
  background: #f5a623;
}

:global(.dark) .btn-hero-work {
  border-color: rgba(255, 255, 255, 0.25);
  color: #ffffff !important;
}

:global(.dark) .btn-hero-work:hover {
  border-color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

:global(.dark) .stat-number {
  color: #ffffff;
}

:global(.dark) .stat-label {
  color: #9ca3af;
}

:global(.dark) .meta-pipe {
  color: rgba(255, 255, 255, 0.2);
}

:global(.dark) .social-icon-item {
  color: #ffffff !important;
}

:global(.dark) .social-icon-item:hover {
  color: #feb83c !important;
}

:global(.dark) .hero-badge-wrapper {
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
</style>
