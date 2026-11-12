<template>
  <section class="hero section-pt position-relative">
    <div class="section-wrapper">
      <div class="container position-relative">
        <div class="bg-line"></div>

        <!-- Profile Pictures Wrapper -->
        <div class="profile-pic-wrapper">
          <img
            width="652"
            height="594"
            class="profile-bg img-fluid"
            src="/images/hero/profile-pic-bg.png"
            alt="background shape"
          />
          <img
            width="501"
            height="526"
            class="profile-pic img-fluid"
            src="/images/hero/profile-pic.png"
            alt="Cameron Williamson"
          />
        </div>

        <!-- Rotating Contact Badge -->
        <div class="contact-rotate-wrapper">
          <img
            width="128"
            height="128"
            class="contact-me-rotate"
            src="/images/hero/contact-me-txt.svg"
            alt="contact me"
          />
          <a href="#contact" class="contact-me-arrow">
            <img
              width="74"
              height="74"
              src="/images/hero/contact-me-arrow.svg"
              alt="arrow"
            />
          </a>
        </div>

        <!-- Intro Greeting -->
        <div class="d-flex align-items-center mb-2">
          <h6 class="mb-0 fw-medium">Hi there!&nbsp;</h6>
          <img
            width="20"
            height="20"
            class="hi-icon"
            src="/images/hero/hi.svg"
            alt="hi"
          />
          <h6 class="mb-0 fw-medium">&nbsp;I'm</h6>
        </div>

        <!-- Name Title -->
        <h1 class="hero-name">Cameron Williamson</h1>

        <!-- Short Description -->
        <div class="row">
          <div class="col-xl-4 col-lg-4"></div>
          <div class="col-xl-6 col-lg-8">
            <h6 class="intro-info d-none d-md-block text-muted">
              I believe that collaboration and creativity are the essence of progress. And I am dedicated to bringing a fresh perspective to every project I undertake.
            </h6>
          </div>
          <div class="col-xl-2"></div>
        </div>

        <!-- Buttons and Social Media -->
        <div class="d-none d-md-block mt-4">
          <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-8">
              <div class="d-flex align-items-center flex-wrap flex-xxl-nowrap gap-4 gap-lg-5">
                <div class="btn-wrapper d-flex align-items-center gap-3">
                  <a href="#contact" class="bttn bttn-primary text-decoration-none">
                    Let’s Talk <i class="bi bi-arrow-up-right"></i>
                  </a>
                  <a href="#" class="bttn bttn-secondary text-decoration-none">
                    Download CV <i class="bi bi-arrow-up-right"></i>
                  </a>
                </div>

                <img
                  width="133"
                  height="20"
                  class="lg-arrow d-none d-xl-block"
                  src="/images/hero/lg-arrow.svg"
                  alt="arrow decoration"
                />

                <ul class="social-media d-flex align-items-center list-unstyled gap-3 mb-0">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-name {
  font-family: var(--ff-syne);
  font-weight: 700;
  font-size: calc(2.2rem + 2.5vw);
  line-height: 1.1;
  margin-bottom: 20px;
}

.intro-info {
  font-family: var(--ff-manrope);
  font-size: 16px;
  line-height: 1.6;
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

