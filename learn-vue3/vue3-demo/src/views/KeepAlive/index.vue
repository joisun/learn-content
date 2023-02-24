<template>
  <div><el-button @click="toggle = !toggle">Toggle</el-button></div>
  <keep-alive>
    <Compa v-if="toggle" />
    <Compb v-else />
  </keep-alive>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Compa from "./Compa.vue";
import Compb from "./Compb.vue";
let toggle = ref(false);
</script>
