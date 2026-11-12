<template>
  <section id="contact" class="contact section-mt position-relative overflow-hidden">
    <!-- Continuous Marquee Ticker -->
    <div class="marquee section-pt">
      <h3>
        <span class="marquee-wrapper">
          <span v-for="n in 4" :key="n" class="marquee-title">
            <span v-for="(item, idx) in marqueeItems" :key="idx">
              <span class="text-stroke-white">{{ item.email }} _&nbsp;</span>
              {{ item.phone }} _&nbsp;
            </span>
          </span>
        </span>
      </h3>
    </div>

    <!-- Contact Form & Details -->
    <div class="container position-relative py-5">
      <div class="contact-content row align-items-center">
        <div class="col-lg-6">
          <span class="large-txt d-block fw-bold mb-3" style="font-family: var(--ff-syne); font-size: calc(1.8rem + 1.5vw); line-height: 1.2;">
            Let’s Contact!
          </span>
          <p class="text-muted mb-4" style="font-size: 16px; line-height: 1.6;">
            I am always open to discussing new projects, creative ideas, or opportunities to be a part of your vision. Feel free to reach out through the form below.
          </p>

          <form id="contact-form" @submit.prevent="handleSubmit">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-medium" for="first-name">First Name</label>
                <input
                  id="first-name"
                  v-model="form.firstName"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium" for="last-name">Last Name</label>
                <input
                  id="last-name"
                  v-model="form.lastName"
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium" for="email">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  placeholder="example@mail.com"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium" for="phone">Phone</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="form-control"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div class="col-12">
                <label class="form-label fw-medium" for="message">Your Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  class="form-control"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              <div class="col-12 mt-4">
                <button type="submit" class="lets-talk-btn border-0">
                  Send Message &nbsp;<i class="bi bi-arrow-up-right"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Right Side: Rotating Badge & Decorative Accent -->
        <div class="col-lg-6 d-none d-lg-flex justify-content-center align-items-center position-relative" style="min-height: 400px;">
          <div class="contact-rotate-wrapper">
            <div class="contact-me-rotate">
              <img src="/images/hero/contact-me-txt.svg" alt="Contact Me" width="180" height="180" />
            </div>
            <div class="contact-me-arrow">
              <img src="/images/hero/contact-me-arrow.svg" alt="arrow" width="30" height="30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const marqueeItems = [
  { email: 'textio@gmail.com', phone: '(704) 555-0127' },
  { email: 'textio@gmail.com', phone: '(704) 555-0127' },
  { email: 'textio@gmail.com', phone: '(704) 555-0127' }
]

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

const handleSubmit = () => {
  alert(`Thank you, ${form.firstName}! Your message has been sent.`)
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}
</script>

<style scoped>
.contact {
  background: var(--clr-black);
  color: var(--clr-white);
  padding-bottom: 80px;
}

.contact-content {
  color: var(--clr-white);
}

.contact .form-label {
  color: var(--clr-white);
  font-size: 14px;
}

.contact .form-control {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--clr-white);
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.contact .form-control:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--clr-orange);
  box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.25);
  color: #fff;
}

.contact .form-control::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.text-stroke-white {
  -webkit-text-stroke: 1px #fff;
  color: transparent;
}

.contact-rotate-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-me-rotate {
  animation: rotate360 12s linear infinite;
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

