<script lang="ts" setup>
import { ref } from 'vue';
import 'animate.css';
let toggle = ref(false);
let toggle0 = ref(false);
let toggle1 = ref(false);
let toggle2 = ref(false);
</script>
<template>
  <button @click="toggle = !toggle">基本使用</button>
  <button @click="toggle0 = !toggle0">基本使用，绑定类名改写</button>
  <button @click="toggle1 = !toggle1">结合animation属性</button>
  <button @click="toggle2 = !toggle2">结合animation.css动画库</button>
  <transition name="any">
    <div class="box" v-if="toggle"></div>
  </transition>
  <transition
    enter-from-class="a"
    enter-active-class="aa"
    enter-to-class="aaa"
    leave-from-class="b"
    leave-active-class="bb"
    leave-to-class="bbb"
  >
    <div class="box" v-if="toggle0"></div>
  </transition>

  <transition name="any1">
    <div class="box1" v-if="toggle1"></div>
  </transition>
  <transition
    name="any2"
    :duration="{ enter: 2000, leave: 300 }"
    enter-active-class="animate__animated animate__backInDown"
    leave-active-class="animate__animated animate__backOutUp"
  >
    <div class="box2" v-if="toggle2"></div>
  </transition>
</template>
<style>
.box {
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3);
}
.any-enter-from {
  width: 0;
  height: 0;
  background-color: rgb(0, 0, 0);
  transform: translate(0, 0) scale(0) rotate(1960deg);
}
.any-enter-active {
  transition: all 0.8s ease-in-out;
}
.any-enter-to {
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3) rotate(0);
}
.any-leave-from {
  /* 这里写不写都可以，和 .any-enter-to 一样的, 所以也可以写在一起*/
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3) rotate(0);
}
.any-leave-active {
  transition: all 0.8s ease-in-out;
}
.any-leave-to {
  width: 0;
  height: 0;
  background-color: rgb(0, 0, 0);
  transform: translate(0, 0) scale(0) rotate(1960deg);
}
</style>
<style>
.box {
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3);
}
.a {
  width: 0;
  height: 0;
  background-color: rgb(0, 0, 0);
  transform: translate(0, 0) scale(0) rotate(1960deg);
}
.aa {
  transition: all 0.8s ease-in-out;
}
.aaa {
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3) rotate(0);
}
.b {
  /* 这里写不写都可以，和 .any-enter-to 一样的, 所以也可以写在一起*/
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3) rotate(0);
}
.bb {
  transition: all 0.8s ease-in-out;
}
.bbb {
  width: 0;
  height: 0;
  background-color: rgb(0, 0, 0);
  transform: translate(0, 0) scale(0) rotate(1960deg);
}
</style>
<style>
.box1 {
  width: 100px;
  height: 100px;
  border: 1px solid;
}
.any1-enter-active {
  animation: bounce-in 0.5s;
}
.any1-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
<style>
.box2 {
  width: 200px;
  height: 100px;
  border: 1px solid;
}
</style>
