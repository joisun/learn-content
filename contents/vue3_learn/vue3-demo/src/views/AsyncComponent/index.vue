<script setup lang="ts">
// import Gallery from "./Gallery.vue";
import { defineAsyncComponent, ref } from 'vue';
let show = ref(false);
const SingleImage = defineAsyncComponent(() => import('./SingleImage.vue'));
</script>

<template>
  <div class="m-5 flex flex-wrap gap-4">
    <button @click="show = true">SHOW Gallery</button>
    <Suspense v-if="show">
      <template #default>
        <SingleImage v-for="i in 100" />
      </template>
      <template #fallback> loading... </template>
    </Suspense>
  </div>
</template>
