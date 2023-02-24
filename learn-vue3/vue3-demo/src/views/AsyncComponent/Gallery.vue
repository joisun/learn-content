

<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";
let url = ref("");
let list: any = ref([]);

for (let i = 0; i < 10; i++) {
  fetch("https://picsum.photos/150").then((res) => {
    console.log("trigger");
    list.value.push(res.url);
  });
}
</script>

<template>
  <div v-for="(it, ind) in list" :key="ind">
    <div class="w-32 h-32 border rounded-lg overflow-hidden shadow-lg">
      <img :src="it" alt="" />
    </div>
  </div>
</template>

