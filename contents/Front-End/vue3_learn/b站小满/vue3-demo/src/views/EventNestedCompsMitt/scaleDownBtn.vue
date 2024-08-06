<script setup lang="ts">
// 获取当前组件实例
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const handleClick = ()=>{
  instance?.proxy?.$Bus.emit('scaleDown',1)
}
</script>
<template>
  <button @click="handleClick">Scale Down</button>
</template>
