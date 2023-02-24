<script lang="ts" setup>
  import comp from "./Tsx";
  const handleEmit = (ctx:any)=>{
    console.log('[ctx]: ',ctx)
  }
</script>
<template>
<comp @on-click="handleEmit" :user="{name:'jay',age:18}"/>
</template>