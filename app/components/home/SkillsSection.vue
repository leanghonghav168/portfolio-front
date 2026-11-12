<template>
  <section class="skills section-pt z-3">
    <div class="container">
      <div class="skills-wrapper d-flex align-items-center gap-4 overflow-x-auto py-3 no-scrollbar">
        <div
          v-for="(skill, idx) in skills"
          :key="idx"
          class="skill-item flex-shrink-0"
        >
          <figure class="mb-2 text-center">
            <img
              width="73"
              height="73"
              :src="skill.img"
              :alt="skill.name"
              class="img-fluid"
            />
          </figure>
          <div class="skill-txt text-center">
            <h4 class="mb-1 fw-bold" style="font-family: var(--ff-syne); font-size: 20px;">
              {{ skill.percent }}
            </h4>
            <span class="text-muted" style="font-size: 14px;">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skills = [
  { img: '/images/skills/xd.png', percent: '90%', name: 'Adobe XD' },
  { img: '/images/skills/figma.png', percent: '80%', name: 'Figma' },
  { img: '/images/skills/photoshop.png', percent: '75%', name: 'Photoshop' },
  { img: '/images/skills/canva.png', percent: '90%', name: 'Canva' },
  { img: '/images/skills/wordpress.png', percent: '85%', name: 'WordPress' },
  { img: '/images/skills/html.png', percent: '95%', name: 'HTML' },
  { img: '/images/skills/bootstrap.png', percent: '75%', name: 'Bootstrap' },
  { img: '/images/skills/xd.png', percent: '90%', name: 'Adobe XD' },
  { img: '/images/skills/figma.png', percent: '80%', name: 'Figma' }
]
</script>

<style scoped>
.skills-wrapper {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.skills-wrapper::-webkit-scrollbar {
  display: none;
}

.skill-item {
  width: 130px;
  padding: 20px 10px;
  background: var(--clr-light-gray);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-5px);
  background: var(--clr-orange);
  color: #fff;
}

.skill-item:hover .text-muted,
.skill-item:hover h4 {
  color: #fff !important;
}

:global(.dark) .skill-item {
  background: var(--clr-white-06);
}
:global(.dark) .skill-item:hover {
  background: var(--clr-orange);
}
</style>

