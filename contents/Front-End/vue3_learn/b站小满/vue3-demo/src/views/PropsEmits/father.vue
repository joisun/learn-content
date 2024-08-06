<script setup lang="ts">
import child from "./child.vue"
const handleEmit01 = (e:any)=>{
  alert(e)
}
const handleEmit02 = (e:any)=>{
  alert(JSON.stringify(e))
}
</script>
<template>
<child @cus-emit01="handleEmit01" @cus-emit02="handleEmit02"/>
</template>