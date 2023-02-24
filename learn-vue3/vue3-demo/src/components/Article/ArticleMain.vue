<template>
  <div class="mt-5">
    <!-- &emsp;是制表符 tab缩进 -->
    &emsp;&emsp;
    <slot name="main-intro"></slot>
  </div>
  <hr>
  <div class="mt-2">
    &emsp;&emsp;
    <slot name="main-body"></slot>
  </div>
  <hr>
  <div class="mt-2">
    &emsp;&emsp;
    <slot name="main-summary"></slot>
  </div>
</template>