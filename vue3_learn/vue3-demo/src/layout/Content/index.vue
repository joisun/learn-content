<script setup lang="ts">
import { useRouter, RouterLink, RouterView } from "vue-router";
const {
  options: { routes },
} = useRouter();
</script>

<template>
  <div>
    <nav class="w-full text-xs flex flex-wrap gap-3 mx-5 my-3 underline underline-offset-2">
      <RouterLink v-for="(route, index) in routes" :to="route.path" :key="route.name">{{ index }}. {{ route.meta.desc }}</RouterLink>
    </nav>
    <hr />
    <RouterView></RouterView>
  </div>
</template>
