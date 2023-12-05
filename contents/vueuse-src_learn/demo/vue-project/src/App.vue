<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
import { useTitle } from '@vueuse/core';
const title = useTitle();
console.log('[title]: ', title);
title.value = 'Hello';
document.title;
setInterval(() => {
  // title.value
  document.title = new Date().toLocaleTimeString();
}, 1000);
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>
