<script setup lang="ts">
import Dialog from "./Dialog.vue";
import { ref } from "vue";
const show = ref<boolean>(false);
const title = ref<string>("呵呵呵哈哈哈");
</script>
<template>
  <button @click="show = !show">Show Dialog</button>
  <Dialog v-model="show" v-model:title="title" />
</template>
