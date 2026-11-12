<template>
  <main>
    <!-- 1. Hero Section -->
    <HeroSection />

    <!-- 2. Skills Slider/Grid Section -->
    <SkillsSection />

    <!-- 3. About Me Section -->
    <AboutSection />

    <!-- 4. Projects Portfolio Section with Filter & Popup Modal -->
    <ProjectsSection />

    <!-- 5. Latest Services Interactive Accordion -->
    <ServicesSection />

    <!-- 6. Testimonial Section with Carousel -->
    <TestimonialSection />

    <!-- 7. Infinite Outline/Solid Marquee Banner -->
    <MarqueeSection />

    <!-- 8. Pricing Packages Section -->
    <PricingSection />

    <!-- 9. Trusted Brands Logo Row -->
    <BrandsSection />

    <!-- 10. Latest Blog Interactive Preview -->
    <LatestBlogSection />
  </main>
</template>

<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'
import SkillsSection from '~/components/home/SkillsSection.vue'
import AboutSection from '~/components/home/AboutSection.vue'
import ProjectsSection from '~/components/home/ProjectsSection.vue'
import ServicesSection from '~/components/home/ServicesSection.vue'
import TestimonialSection from '~/components/home/TestimonialSection.vue'
import MarqueeSection from '~/components/home/MarqueeSection.vue'
import PricingSection from '~/components/home/PricingSection.vue'
import BrandsSection from '~/components/home/BrandsSection.vue'
import LatestBlogSection from '~/components/home/LatestBlogSection.vue'

useHead({
  title: 'Textio - Personal Portfolio Template',
  meta: [
    {
      name: 'description',
      content:
        'Discover Textio, a versatile personal portfolio template by Creativemela. Sleek design, multiple layouts, and comprehensive UI/UX services.'
    }
  ]
})
</script>
