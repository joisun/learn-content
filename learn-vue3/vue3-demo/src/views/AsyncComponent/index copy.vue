<script setup lang="ts">
// import Gallery from "./Gallery.vue";
import { defineAsyncComponent, ref } from 'vue';
let show = ref(false);
const MockAsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:8081/Hello.vue').then((res) => {
      res.text().then((parse) => {
        resolve({
          template: parse,
        });
      });
    });
  });
});
</script>

<template>
  <div class="m-5 flex flex-wrap gap-4">
    <button @click="show = true">SHOW Gallery</button>
    <MockAsyncComp v-if="show" />
  </div>
</template>
