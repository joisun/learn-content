<script setup lang="ts">
import Dialog from "./Dialog.vue";
import { ref } from "vue";
const show = ref<boolean>(false);
</script>
<template>
  <button @click="show = !show">Show Dialog</button>
  <Dialog v-model="show" />
</template>
