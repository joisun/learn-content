<script setup lang="ts">
const flag = ref(false);
</script>
<template>
  <button @click="flag = !flag">{{ flag }}</button>
</template>
