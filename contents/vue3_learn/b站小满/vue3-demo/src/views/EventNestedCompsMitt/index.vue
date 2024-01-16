<!-- prettier-ignore -->
<script setup lang="ts">
import { ref } from "vue";
import {getCurrentInstance} from "vue"
import ScaleUpBtn from "./scaleUpBtn.vue";
import ScaleDownBtn from "./scaleDownBtn.vue";
let size = ref(14);

const instance = getCurrentInstance();
instance?.proxy?.$Bus.on("scaleDown",(e:number)=>{size.value -= e})
instance?.proxy?.$Bus.on("scaleUp",(e:number)=>{size.value += e})

</script>
<template>
  <ScaleUpBtn></ScaleUpBtn>
  <ScaleDownBtn></ScaleDownBtn>
  font size: {{ size }}px
  <div class="content" :style="{ fontSize: `${size}px` }">Mitt Implement <br/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, veritatis!</div>
</template>
