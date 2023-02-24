<script setup lang="ts">
import Bus from "@/utils/Bus";
</script>
<template>
  <button @click="Bus.emit('scaleDown', 1)">Scale Down</button>
</template>
