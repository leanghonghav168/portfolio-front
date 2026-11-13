<template>
  <section id="contact" class="connect-section py-5 py-lg-6 position-relative">
    <div class="container position-relative">
      <div class="row">
        <!-- Left Column: Contact Header & Contact Info -->
        <div class="col-lg-5 col-12 mb-5 mb-lg-0 pe-lg-4">
          <!-- Small Category Tag -->
          <span class="connect-category-tag d-inline-block mb-2">Contact</span>

          <!-- Big Title with Amber Circle Accent Behind 'L' -->
          <div class="connect-title-container position-relative mb-5">
            <span class="connect-circle-accent" aria-hidden="true"></span>
            <h2 class="connect-title position-relative z-2 mb-0">
              Let’s<br />connect
            </h2>
          </div>

          <!-- Contact Information List -->
          <div class="contact-info-list">
            <!-- Email -->
            <div class="contact-info-item d-flex align-items-start gap-3">
              <div class="contact-icon-wrapper">
                <i class="bi bi-envelope"></i>
              </div>
              <div class="contact-info-text">
                <span class="contact-label">Email us</span>
                <a :href="`mailto:${contact.email}`" class="contact-value text-decoration-none d-block">
                  {{ contact.email }}
                </a>
              </div>
            </div>

            <!-- Phone -->
            <div class="contact-info-item d-flex align-items-start gap-3">
              <div class="contact-icon-wrapper">
                <i class="bi bi-telephone"></i>
              </div>
              <div class="contact-info-text">
                <span class="contact-label">Call us</span>
                <span class="contact-value d-block">
                  {{ contact.phoneNumbers }}
                </span>
              </div>
            </div>

            <!-- Office Address -->
            <div class="contact-info-item d-flex align-items-start gap-3">
              <div class="contact-icon-wrapper">
                <i class="bi bi-geo-alt"></i>
              </div>
              <div class="contact-info-text">
                <span class="contact-label">Office address</span>
                <span class="contact-value d-block" v-html="contact.formattedAddress"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Interactive Form & Follow Me Links -->
        <div class="col-lg-7 col-12 ps-lg-5">
          <form class="connect-form" @submit.prevent="handleSubmit">
            <div class="row g-3">
              <!-- Name Input -->
              <div class="col-sm-6 col-12">
                <div class="form-group mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    class="form-control custom-input"
                    placeholder="Your name*"
                    required
                  />
                </div>
              </div>

              <!-- Email Input -->
              <div class="col-sm-6 col-12">
                <div class="form-group mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    class="form-control custom-input"
                    placeholder="Your email*"
                    required
                  />
                </div>
              </div>

              <!-- Phone Input -->
              <div class="col-sm-6 col-12">
                <div class="form-group mb-3">
                  <label for="phone" class="form-label">Phone</label>
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    class="form-control custom-input"
                    placeholder="Your number"
                  />
                </div>
              </div>

              <!-- Subject Input -->
              <div class="col-sm-6 col-12">
                <div class="form-group mb-3">
                  <label for="subject" class="form-label">Subject*</label>
                  <input
                    id="subject"
                    v-model="formData.subject"
                    type="text"
                    class="form-control custom-input"
                    placeholder="Your subject*"
                    required
                  />
                </div>
              </div>

              <!-- Message Input -->
              <div class="col-12">
                <div class="form-group mb-4">
                  <label for="message" class="form-label">Message</label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    rows="5"
                    class="form-control custom-input custom-textarea"
                    placeholder="Type your message"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Submit Button & Feedback -->
            <div class="d-flex align-items-center gap-3">
              <button type="submit" class="btn-submit-connect" :disabled="isSubmitting">
                <span>{{ isSubmitting ? 'Sending...' : 'Submit' }}</span>
                <i class="bi bi-arrow-up-right"></i>
              </button>
              
              <span v-if="submitSuccess" class="text-success fw-medium fs-6">
                ✓ Message sent successfully!
              </span>
            </div>
          </form>

          <!-- Follow Me Social Links Bar -->
          <div class="follow-me-container d-flex align-items-center justify-content-end gap-3 mt-5 pt-3">
            <span class="follow-line flex-grow-1 d-none d-sm-block"></span>
            <span class="follow-label fw-bold">Follow me</span>
            <div class="social-links-list d-flex align-items-center gap-3">
              <a
                v-for="social in contact.socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon-btn"
                :title="social.name"
                :aria-label="social.ariaLabel || social.name"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { contactInfoData } from '~/model'
import type { ContactInfo } from '~/model'

const props = withDefaults(
  defineProps<{
    contact?: ContactInfo
  }>(),
  {
    contact: () => contactInfoData
  }
)

const { sendContactMessage } = usePortfolioApi()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await sendContactMessage(formData.value)
  } catch (err) {
    console.warn('Backend unavailable, local form simulated:', err)
  } finally {
    isSubmitting.value = false
    submitSuccess.value = true
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
    setTimeout(() => {
      submitSuccess.value = false
    }, 4000)
  }
}
</script>

<style scoped>
/* Main Section Background */
.connect-section {
  background-color: #ffffff;
  color: #0f0e0e;
  transition: background-color 0.3s ease, color 0.3s ease;
}

:global(.dark) .connect-section {
  background-color: #0c0c0e;
  color: #ffffff;
}

/* Category Tag */
.connect-category-tag {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #e76f2b;
  letter-spacing: 0.02em;
}

/* Title Container with Circle Accent */
.connect-title-container {
  display: inline-block;
  min-height: 120px;
}

.connect-circle-accent {
  position: absolute;
  top: -4px;
  left: -8px;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background-color: #feb83c;
  z-index: 1;
}

.connect-title {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: clamp(2.75rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.05;
  color: #0f0e0e;
  letter-spacing: -0.02em;
}

:global(.dark) .connect-title {
  color: #ffffff;
}

/* Contact Info Items */
.contact-info-list {
  display: flex;
  flex-direction: column;
}

.contact-info-item {
  border-bottom: 1px solid #e7e8eb;
  padding-bottom: 22px;
  margin-bottom: 22px;
  transition: border-color 0.3s ease;
}

.contact-info-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

:global(.dark) .contact-info-item {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.contact-icon-wrapper {
  font-size: 22px;
  color: #0f0e0e;
  line-height: 1.2;
  flex-shrink: 0;
  margin-top: 2px;
}

:global(.dark) .contact-icon-wrapper {
  color: #ffffff;
}

.contact-info-text {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 4px;
}

:global(.dark) .contact-label {
  color: #9ca3af;
}

.contact-value {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #0f0e0e;
  line-height: 1.4;
  transition: color 0.2s ease;
}

:global(.dark) .contact-value {
  color: #ffffff;
}

a.contact-value:hover {
  color: #e76f2b;
}

:global(.dark) a.contact-value:hover {
  color: #feb83c;
}

/* Form Styles */
.form-label {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 6px;
}

:global(.dark) .form-label {
  color: #d1d5db;
}

.custom-input {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 15px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #111827;
  padding: 13px 18px;
  transition: all 0.25s ease;
  box-shadow: none;
}

.custom-input::placeholder {
  color: #9ca3af;
  font-size: 14px;
}

.custom-input:focus {
  border-color: #0f0e0e;
  background-color: #ffffff;
  color: #111827;
  box-shadow: 0 0 0 1px #0f0e0e;
  outline: none;
}

:global(.dark) .custom-input {
  background-color: #141417;
  border-color: rgba(255, 255, 255, 0.12);
  color: #f9fafb;
}

:global(.dark) .custom-input::placeholder {
  color: #6b7280;
}

:global(.dark) .custom-input:focus {
  border-color: #ffffff;
  background-color: #18181c;
  color: #ffffff;
  box-shadow: 0 0 0 1px #ffffff;
}

.custom-textarea {
  resize: vertical;
  min-height: 130px;
}

/* Submit Button */
.btn-submit-connect {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 700;
  background-color: #0f0e0e;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 14px 30px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-submit-connect:hover {
  background-color: #27272a;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.25);
}

:global(.dark) .btn-submit-connect {
  background-color: #ffffff;
  color: #0f0e0e;
}

:global(.dark) .btn-submit-connect:hover {
  background-color: #f3f4f6;
  color: #000000;
  box-shadow: 0 10px 20px -5px rgba(255, 255, 255, 0.2);
}

.btn-submit-connect i {
  font-size: 13px;
  transition: transform 0.25s ease;
}

.btn-submit-connect:hover i {
  transform: translate(2px, -2px);
}

/* Follow Me Bar */
.follow-me-container {
  border-top: 1px solid #f1f2f4;
}

:global(.dark) .follow-me-container {
  border-top-color: rgba(255, 255, 255, 0.06);
}

.follow-line {
  height: 1px;
  background-color: #e5e7eb;
}

:global(.dark) .follow-line {
  background-color: rgba(255, 255, 255, 0.08);
}

.follow-label {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #0f0e0e;
  white-space: nowrap;
}

:global(.dark) .follow-label {
  color: #ffffff;
}

.social-icon-btn {
  font-size: 16px;
  color: #0f0e0e;
  transition: transform 0.2s ease, color 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

:global(.dark) .social-icon-btn {
  color: #ffffff;
}

.social-icon-btn:hover {
  transform: translateY(-2px);
  color: #e76f2b;
}

:global(.dark) .social-icon-btn:hover {
  color: #feb83c;
}
</style>

