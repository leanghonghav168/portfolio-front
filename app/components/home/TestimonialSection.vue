<template>
  <section id="testimonial" class="testimonial position-relative section-pt">
    <div class="container position-relative">
      <span class="title d-block mb-3 fw-bold" style="font-family: var(--ff-syne); font-size: 16px; color: var(--clr-orange); text-transform: uppercase; letter-spacing: 2px;">
        Testimonial
      </span>

      <!-- Decorative Figures -->
      <figure class="quate-wrapper mb-4">
        <img
          width="104"
          height="76"
          src="/images/testimonial/quate.png"
          alt="quote icon"
          class="img-fluid"
        />
      </figure>

      <!-- Testimonial Slider Card -->
      <div class="slider-wrapper position-relative py-4">
        <div class="card p-4 p-md-5 rounded-4 border-0 shadow-sm" style="background: var(--clr-light-gray);">
          <div class="row align-items-center">
            <div class="col-md-3 text-center mb-4 mb-md-0">
              <img
                :src="currentTestimonial.img"
                alt="Client"
                width="140"
                height="140"
                class="rounded-circle object-fit-cover shadow"
              />
            </div>
            <div class="col-md-9">
              <h4 class="mb-4" style="font-family: var(--ff-syne); line-height: 1.5; font-weight: 500;">
                "{{ currentTestimonial.text }}"
              </h4>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <h6 class="fw-bold mb-0">Cameron Williamson</h6>
                  <span class="text-muted" style="font-size: 14px;">Product Director, Envato</span>
                </div>
                <!-- Controls -->
                <div class="buttons d-flex gap-2">
                  <button
                    type="button"
                    class="btn rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 48px; height: 48px; background: #fff; border: 1px solid rgba(0,0,0,0.1);"
                    @click="prevSlide"
                  >
                    <i class="fa-solid fa-arrow-left"></i>
                  </button>
                  <button
                    type="button"
                    class="btn rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 48px; height: 48px; background: #fff; border: 1px solid rgba(0,0,0,0.1);"
                    @click="nextSlide"
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const testimonials = [
  {
    id: 1,
    img: '/images/testimonial/image3.png',
    text: 'Working with Cameron Williamson has been a game changer. Their ability to understand our vision and translate it into design was impressive. The design solutions provided by Cameron improved our user engagement.'
  },
  {
    id: 2,
    img: '/images/testimonial/image2.png',
    text: 'Cameron delivered an exceptional design system that elevated our entire brand identity. The communication was effortless and the turnaround was remarkably fast.'
  },
  {
    id: 3,
    img: '/images/testimonial/image1.png',
    text: 'Incredible attention to detail and high-fidelity UX prototyping. Our conversions increased by 40% following Cameron’s dashboard redesign.'
  }
]

const currentIndex = ref(0)

const currentTestimonial = computed(() => testimonials[currentIndex.value])

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length
}
</script>

<style scoped>
:global(.dark) .card {
  background: var(--clr-white-06) !important;
  color: #fff;
}
:global(.dark) .buttons button {
  background: var(--clr-white-10) !important;
  color: #fff !important;
  border-color: transparent !important;
}
</style>

