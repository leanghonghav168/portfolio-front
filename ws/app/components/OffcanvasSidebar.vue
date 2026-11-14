<template>
  <div>
    <!-- Overlay backdrop -->
    <div
      v-if="isOpen"
      class="offcanvas-backdrop fade show"
      style="z-index: 99998; background: rgba(0,0,0,0.5);"
      @click="$emit('close')"
    ></div>

    <!-- Slide-out Sidebar -->
    <div :class="['subside-barmenu sub-contact', { active: isOpen }]">
      <div class="remove-click d-flex justify-content-center align-items-center" @click="$emit('close')">
        <i class="bi bi-x-lg text-white"></i>
      </div>
      <div class="sub-contact-wrapper d-grid">
        <NuxtLink to="/" class="logo side-logo" @click="$emit('close')">
          <h4>T<span class="txt-orange">e</span>xtio</h4>
        </NuxtLink>
        <p>
          Discover Textio, a versatile personal portfolio template. Ideal for showcasing your work, sleek design, multiple layouts, and modern UI/UX services.
        </p>
        <div class="sub-contact-left d-grid">
          <div class="sub-contac-item">
            <div class="address-widget">
              <span class="address d-block text-uppercase text-muted fw-bold" style="font-size: 12px; letter-spacing: 1px;">Address</span>
              <span class="textp">Victoria Street, London</span>
            </div>
          </div>
          <div class="sub-contac-item">
            <div class="address-widget">
              <span class="address d-block text-uppercase text-muted fw-bold" style="font-size: 12px; letter-spacing: 1px;">Email</span>
              <a href="mailto:textio@email.com" class="textp">textio@email.com</a>
            </div>
          </div>
          <div class="sub-contac-item">
            <div class="address-widget">
              <span class="address d-block text-uppercase text-muted fw-bold" style="font-size: 12px; letter-spacing: 1px;">Phone</span>
              <a href="tel:7045550127" class="textp">(704) 555-0127</a>
            </div>
          </div>
        </div>

        <!-- Social Icons -->
        <ul class="social d-flex align-items-center gap-2 list-unstyled mt-4">
          <li>
            <a href="#" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
          </li>
          <li>
            <a href="#" target="_blank"><i class="fa-brands fa-twitter"></i></a>
          </li>
          <li>
            <a href="#" target="_blank"><i class="fa-brands fa-instagram"></i></a>
          </li>
          <li>
            <a href="#" target="_blank"><i class="fa-brands fa-dribbble"></i></a>
          </li>
        </ul>

        <!-- Admin Dashboard Shortcut -->
        <div class="mt-4 pt-3 border-top">
          <NuxtLink
            to="/admin"
            class="btn btn-outline-warning btn-sm w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
            @click="$emit('close')"
          >
            <i class="bi bi-shield-lock-fill"></i>
            <span>Admin CMS Dashboard</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits(['close'])
</script>

