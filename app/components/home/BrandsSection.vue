<template>
  <div class="brands section-mt py-5">
    <div class="container text-center">
      <span class="text-uppercase fw-bold text-muted mb-4 d-block" style="letter-spacing: 2px; font-size: 13px;">
        More Than 200+ companies trusted Worldwide
      </span>
      <div class="row justify-content-center align-items-center g-4 mt-2">
        <div
          v-for="brand in brands"
          :key="brand.id"
          class="col-6 col-md-3 col-lg-2 text-center"
        >
          <div class="brand-item p-3">
            <img
              :src="brand.src"
              alt="Brand logo"
              width="140"
              height="45"
              class="img-fluid opacity-75 brand-logo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const brands = [
  { id: 1, src: '/images/brands/brand-1.png' },
  { id: 2, src: '/images/brands/brand-2.png' },
  { id: 3, src: '/images/brands/brand-3.png' },
  { id: 4, src: '/images/brands/brand-4.png' },
  { id: 5, src: '/images/brands/brand-2.png' },
  { id: 6, src: '/images/brands/brand-1.png' }
]
</script>

<style scoped>
.brand-logo {
  filter: grayscale(100%);
  transition: all 0.3s ease;
}

.brand-logo:hover {
  filter: grayscale(0%);
  opacity: 1 !important;
  transform: scale(1.08);
}

:global(.dark) .brand-logo {
  filter: invert(1) grayscale(100%);
}
:global(.dark) .brand-logo:hover {
  filter: invert(1) grayscale(0%);
}
</style>

