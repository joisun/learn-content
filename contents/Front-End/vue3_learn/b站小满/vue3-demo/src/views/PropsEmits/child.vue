
<script setup lang="ts">
const emit = defineEmits(['cusEmit01', 'cusEmit02'])

const handleClick = () => {
  emit('cusEmit01', [1, 2, 3, 4, 5])

}
const handleClick02 = () => {
  emit('cusEmit02', { a: 1, b: 2, c: 3 })
}
</script>

<template>
  <button @click="handleClick">EmitEvent Test 01</button>
  <button @click="handleClick02">EmitEvent Test 02</button>
</template>