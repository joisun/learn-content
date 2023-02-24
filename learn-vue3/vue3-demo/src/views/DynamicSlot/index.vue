<script setup lang="ts">
import Child from './Child.vue';
import { ref } from 'vue'
let slotName = ref('bar')
</script>
<template>
  <Child>
    <template #[slotName]>
      Hello Dynamic Slot
    </template>
  </Child>
</template>