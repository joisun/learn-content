<script setup lang="ts">
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const handleClick = ()=>{
  instance?.proxy?.$Bus.emit('scaleUp',1)
}
</script>
<template>
  <button @click="handleClick">Scale Up</button>
</template>
 