<script setup lang="ts">
type Props = {
  title: string
}
defineProps<Props>()

// 或者这样写
// defineProps({
//   title: {
//     default: ''
//   }
// })
</script>

<template>
  <div>
    <div class=" h-full w-[200px] flex justify-center items-center">
      <h1 class="text-lg font-bold">{{ title }}</h1>
    </div>
  </div>
</template>