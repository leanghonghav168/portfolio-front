<template>
  <section id="pricing" class="pricing section-mt">
    <div class="pricing-wrapper">
      <div class="container">
        <div class="section-title mb-5">
          <h3>Pricing</h3>
          <span></span>
        </div>

        <div class="pricing-item-wrapper row g-lg-5 g-md-4 g-4">
          <div
            v-for="pkg in pricingPackages"
            :key="pkg.id"
            class="col-xl-4 col-md-6"
          >
            <div class="pricing-item d-flex flex-column justify-content-between p-4 p-md-5 rounded-4 h-100 shadow-sm">
              <div>
                <h6 class="text-uppercase fw-bold text-muted mb-3" style="letter-spacing: 1px; font-size: 13px;">
                  {{ pkg.title }}
                </h6>
                <h3 class="fw-bold mb-2" style="font-family: var(--ff-syne); font-size: 32px;">
                  {{ pkg.price.split(' ')[0] }}
                  <span class="fs-6 fw-normal text-muted"> {{ pkg.price.replace(/^\$\d+\s*/, '') }}</span>
                </h3>
                <p class="text-muted mb-4" style="font-size: 14px;">{{ pkg.yearly }}</p>

                <div class="feature border-top pt-3 mb-3">
                  <h6 class="fw-bold mb-3" style="font-size: 14px;">Includes:</h6>
                  <ul class="list-unstyled mb-0">
                    <li
                      v-for="(feat, fIdx) in pkg.features"
                      :key="fIdx"
                      class="mb-2 d-flex align-items-start gap-2"
                      style="font-size: 14px; color: var(--clr-gray);"
                    >
                      <i class="bi bi-check2 text-success mt-1"></i>
                      <span>{{ feat }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mt-4 pt-3 border-top">
                <button
                  type="button"
                  class="btn w-100 py-3 fw-bold rounded-pill text-uppercase"
                  style="background: var(--clr-black); color: #fff; font-size: 13px; letter-spacing: 1px; transition: all 0.3s ease;"
                  @click="alertPackage(pkg.title)"
                >
                  Pick This Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const pricingPackages = [
  {
    id: 1,
    title: 'Basic Package',
    price: '$112 / Per Hours',
    yearly: 'Or $199 Yearly',
    features: [
      'Initial consultation and scoping',
      'User Experience (UX) audit',
      'Basic User Interface (UI) design',
      'One round of revisions',
      'Interactive prototype',
      'Delivery within 2 weeks'
    ]
  },
  {
    id: 2,
    title: 'Standard Package',
    price: '$152 / Per Hours',
    yearly: 'Or $199 Yearly',
    features: [
      'Everything in the Basic Package',
      'Detailed UX research and personas',
      'Complete UI design',
      'Interactive prototype',
      'Two rounds of revisions',
      'Delivery within 4 weeks'
    ]
  },
  {
    id: 3,
    title: 'Premium Package',
    price: '$192 / Per Hours',
    yearly: 'Or $199 Yearly',
    features: [
      'Everything in the Standard Package',
      'In-depth user testing and analysis',
      'Comprehensive design system',
      'Unlimited revisions',
      'Advanced UI animations',
      'Delivery within 6 weeks'
    ]
  }
]

const alertPackage = (title: string) => {
  alert(`You selected the ${title}! Please reach out via the contact form below.`)
}
</script>

<style scoped>
.pricing-item {
  background: var(--clr-light-gray);
  border: 1px solid rgba(15, 14, 14, 0.05);
  transition: all 0.3s ease;
}

.pricing-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
}

.pricing-item:hover button {
  background: var(--clr-orange) !important;
  color: #fff !important;
}

:global(.dark) .pricing-item {
  background: var(--clr-white-06);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}
:global(.dark) .pricing-item h3 {
  color: #fff;
}
:global(.dark) .pricing-item button {
  background: #fff !important;
  color: #000 !important;
}
:global(.dark) .pricing-item:hover button {
  background: var(--clr-orange) !important;
  color: #fff !important;
}
</style>

