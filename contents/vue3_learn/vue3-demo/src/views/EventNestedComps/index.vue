<!-- prettier-ignore -->
<script setup lang="ts">
import { ref } from "vue";
import Bus from "@/utils/Bus";
import ScaleUpBtn from "./scaleUpBtn.vue";
import ScaleDownBtn from "./scaleDownBtn.vue";
let size = ref(14);
Bus.on('scaleUp',(e:number)=>{size.value += e})
Bus.on('scaleDown',(e:number)=>{size.value -= e})
</script>
<template>
  <ScaleUpBtn></ScaleUpBtn>
  <ScaleDownBtn></ScaleDownBtn>
  font size: {{ size }}px
  <div class="content" :style="{ fontSize: `${size}px` }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, veritatis!</div>
</template>
