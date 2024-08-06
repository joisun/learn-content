<script setup lang="ts">
import Dialog from "./Dialog.vue";
import { ref } from "vue";
const show = ref<boolean>(false);
const title = ref<string>("呵呵呵哈哈哈");
</script>
<template>
  <button @click="show = !show">Show Dialog</button>
  <!-- vue2 中支持一些 v-model 修饰符 例如： -->
  <!-- <Dialog v-model.trim="show" /> -->
  <!-- <Dialog v-model.number="show" /> -->
  <!-- 现在我们可以自定义修饰符 -->
  <Dialog v-model.jayce="show" />
</template>
