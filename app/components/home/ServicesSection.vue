<template>
  <section id="services" class="services section-pt">
    <div class="container">
      <div class="section-title">
        <h3>Latest Services</h3>
        <span></span>
      </div>

      <div class="service-item-wrapper mt-5">
        <div
          v-for="(service, idx) in services"
          :key="service.id"
          :class="['service-item d-flex flex-wrap align-items-center justify-content-between p-4 mb-3 rounded', { 'is-active': activeId === idx }]"
          style="cursor: pointer; transition: all 0.3s ease;"
          @click="toggleItem(idx)"
        >
          <div class="service-txt">
            <span class="service-thumb d-block fw-bold" style="font-family: var(--ff-syne); font-size: 24px;">
              {{ service.title }}
            </span>
            <div v-show="activeId === idx" class="mt-3">
              <ul class="service-panel list-unstyled mb-0">
                <li
                  v-for="(feat, fIdx) in service.features"
                  :key="fIdx"
                  class="text-muted mb-1"
                  style="font-size: 15px;"
                >
                  + {{ feat }}
                </li>
              </ul>
            </div>
          </div>

          <div v-show="activeId === idx" class="btn-wrapper ms-auto mt-3 mt-md-0">
            <a href="#services" class="bttn-round text-decoration-none">
              <span class="btn-txt">
                View <i class="bi bi-arrow-up-right"></i>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div class="view-all-btn-wrapper text-center mt-5">
        <a href="#services" class="bttn-round text-decoration-none">
          <span class="btn-txt">
            View All <i class="bi bi-arrow-up-right"></i>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeId = ref<number | null>(0)

const toggleItem = (idx: number) => {
  activeId.value = activeId.value === idx ? null : idx
}

const services = [
  {
    id: 1,
    title: 'Visual Design',
    features: [
      'Design Systems and Guidelines',
      'Prototyping and User Testing',
      'Product Strategy and Consulting'
    ]
  },
  {
    id: 2,
    title: 'Product Strategy',
    features: [
      'Design Systems and Guidelines',
      'Prototyping and User Testing',
      'Product Strategy and Consulting'
    ]
  },
  {
    id: 3,
    title: 'User Testing',
    features: [
      'Design Systems and Guidelines',
      'Prototyping and User Testing',
      'Product Strategy and Consulting'
    ]
  },
  {
    id: 4,
    title: 'UI/UX Design',
    features: [
      'Design Systems and Guidelines',
      'Prototyping and User Testing',
      'Product Strategy and Consulting'
    ]
  }
]
</script>

<style scoped>
.service-item {
  background: var(--clr-light-gray);
  border-left: 4px solid transparent;
}

.service-item.is-active,
.service-item:hover {
  background: #fff;
  border-left-color: var(--clr-orange);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

:global(.dark) .service-item {
  background: var(--clr-white-06);
}
:global(.dark) .service-item.is-active,
:global(.dark) .service-item:hover {
  background: #1c1b1b;
  border-left-color: var(--clr-orange);
}
</style>

