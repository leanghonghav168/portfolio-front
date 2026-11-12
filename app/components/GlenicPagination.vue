<template>
  <div class="glenic-pagination">
    <ul class="d-flex align-items-center mb-0 list-unstyled">
      <li>
        <a href="#" :class="{ disabled: currentPage <= 1 }" @click.prevent="setPage(currentPage - 1)">
          <i class="bi bi-arrow-left"></i>
        </a>
      </li>
      <li v-for="p in totalPages" :key="p">
        <span v-if="p === currentPage">{{ formatNumber(p) }}</span>
        <a v-else href="#" @click.prevent="setPage(p)">
          {{ formatNumber(p) }}
        </a>
      </li>
      <li>
        <a href="#" :class="{ disabled: currentPage >= totalPages }" @click.prevent="setPage(currentPage + 1)">
          <i class="bi bi-arrow-right"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    totalPages?: number
    modelValue?: number
  }>(),
  {
    totalPages: 3,
    modelValue: 2
  }
)

const emit = defineEmits(['update:modelValue', 'page-change'])

const currentPage = ref(props.modelValue)

const formatNumber = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`
}

const setPage = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  currentPage.value = page
  emit('update:modelValue', page)
  emit('page-change', page)
}
</script>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>

