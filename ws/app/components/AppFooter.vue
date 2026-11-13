<template>
  <footer>
    <div class="container">
      <div class="footer-content d-flex justify-content-between align-items-center">
        <h4 class="d-none d-md-block mb-0">
          T<span class="txt-orange">e</span>xtio
        </h4>
        <p class="copy-right mx-auto mx-md-0 mb-0">
          © 2026
          <a href="#" class="text-decoration-none">Textio </a>
          - All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #ffffff;
  border-top: 1px solid #f1f2f4;
  padding: 30px 0;
  transition: all 0.3s ease;
}

.footer-content h4 {
  font-family: var(--ff-syne), sans-serif;
  font-weight: 700;
  color: #0f0e0e;
}

.copy-right {
  font-family: var(--ff-manrope), sans-serif;
  font-size: 14px;
  color: #6b7280;
}

.copy-right a {
  color: #0f0e0e;
  font-weight: 600;
}

:global(.dark) footer {
  background-color: #09090b;
  border-top-color: rgba(255, 255, 255, 0.08);
}

:global(.dark) .footer-content h4 {
  color: #ffffff;
}

:global(.dark) .copy-right {
  color: #9ca3af;
}

:global(.dark) .copy-right a {
  color: #ffffff;
}
</style>

