<script setup lang="ts">
defineProps({
  text: {
    default: ''
  }
})
</script>

<template>
  <div class="w-full h-12 flex items-center p-5 ">{{ text }}</div>
</template>