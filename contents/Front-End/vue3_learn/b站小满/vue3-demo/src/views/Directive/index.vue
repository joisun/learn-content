<script setup lang="ts">
import Compa from "./Compa.vue";
import type { Directive, DirectiveBinding } from "vue";
import { ref } from "vue";
// const vcolor: Directive = {
//   created() {
//     console.log("created");
//   },
//   // 定义范型以获得代码提示
//   beforeMount(
//     el: HTMLElement,
//     binding: DirectiveBinding
//   ) {
//     console.log("(指令绑定元素后调用)beforeMount");
//     el.style.background = binding.value.background;
//   },
//   mounted() {
//     console.log("(元素插入父级Dom后)mounted");
//   },
//   beforeUpdate() {
//     console.log("(虚拟Dom更新前)beforeUpdate");
//   },
//   updated() {
//     console.log("updated");
//   },
//   beforeUnmount() {
//     console.log("(卸载之前)beforeUnmount");
//   },
//   unmounted() {
//     console.log("unmounted");
//   },
// };

// 函数简写
const vColor: Directive = (
  el: HTMLElement,
  binding: DirectiveBinding
) => {
  el.style.background = binding.value.background;
};

const color = ref("green");
</script>
<template>
  <!-- <Compa v-move></Compa> -->
  <!-- 传参 -->
  <!-- <Compa v-move="{background:'red'}"></Compa> -->
  <!-- 自定义参数 -->
  <!-- <Compa v-move:aaa="{background:'red'}"></Compa> -->
  <!-- 自定义修饰符 -->
  <input type="text" v-model="color" />
  <Compa v-color:aaa.jayce="{ background: color }"></Compa>
</template>
