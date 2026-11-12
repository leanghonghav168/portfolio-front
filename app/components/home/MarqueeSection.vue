<template>
  <div class="marquee section-pt overflow-hidden">
    <h2>
      <span class="marquee-wrapper">
        <span v-for="n in 3" :key="n" class="marquee-title">
          <span
            v-for="(item, idx) in marqueeItems"
            :key="idx"
            :class="item.stroke ? 'text-stroke-black' : ''"
          >
            {{ item.text }}&nbsp;
          </span>
        </span>
      </span>
    </h2>
  </div>
</template>

<script setup lang="ts">
const marqueeItems = [
  { text: 'User Interface _', stroke: false },
  { text: 'User Experience', stroke: true },
  { text: 'Branding _ Marketing', stroke: false },
  { text: 'User Interface _', stroke: true },
  { text: 'User Experience _', stroke: false },
  { text: 'User Interface _', stroke: true },
  { text: 'User Experience', stroke: false },
  { text: 'Branding _ Marketing', stroke: true },
  { text: 'User Interface _', stroke: false },
  { text: 'User Experience _', stroke: true }
]
</script>

<style scoped>
.text-stroke-black {
  -webkit-text-stroke: 1px var(--clr-black);
  color: transparent;
}

:global(.dark) .text-stroke-black {
  -webkit-text-stroke: 1px #fff;
  color: transparent;
}
</style>

