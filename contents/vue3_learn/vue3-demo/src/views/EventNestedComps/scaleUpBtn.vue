<script setup lang="ts">
import Bus from "@/utils/Bus";
</script>
<template>
  <button @click="Bus.emit('scaleUp', 1)">Scale Up</button>
</template>
