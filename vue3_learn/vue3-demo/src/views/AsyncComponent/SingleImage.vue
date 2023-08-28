<script setup lang="ts">
import { ref } from 'vue';
let url = ref('');

await fetch('https://picsum.photos/150')
  .then((res) => res.blob())
  .then((blob) => {
    url.value = URL.createObjectURL(blob);
  });
</script>

<template>
  <div class="w-32 h-32 border rounded-lg overflow-hidden shadow-lg">
    <img :src="url" alt="" />
  </div>
</template>
