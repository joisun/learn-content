<script setup lang="ts">
import MoveBox from "./MoveBox.vue";
import type { Directive, DirectiveBinding } from "vue";
const timeStamp = new Date().getTime();
const boxClassName = `box-${timeStamp}`;
const pointerClassName = `pointer-${timeStamp}`;
const vDrag: Directive<any, void> = (el: HTMLElement, binding: DirectiveBinding) => {
  const { indicator, keep } = binding.modifiers;
  let moveElement: HTMLDivElement = el.firstElementChild as HTMLDivElement;
  attachRelatedClass(el);
  const mouseDown = (e: MouseEvent) => {
    indicator && addPointerIndicator();
    let x = e.clientX - el.offsetLeft;
    let y = e.clientY - el.offsetTop;
    const move = (e: MouseEvent) => {
      indicator && updatePointerIndicator(e);
      el.style.left = e.clientX - x + "px";
      el.style.top = e.clientY - y + "px";
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", () => {
      !keep && removePointerIndicator();
      document.removeEventListener("mousemove", move);
    });
  };
  moveElement.addEventListener("mousedown", mouseDown);
};
const addPointerIndicator = () => {
  const pointer: HTMLDivElement = document.querySelector(`.${pointerClassName}`) || document.createElement("div");
  pointer.classList.add(boxClassName, pointerClassName);
  document.body.appendChild(pointer);
};
const updatePointerIndicator = (e: MouseEvent) => {
  const pointer: HTMLDivElement = document.querySelector(`.${pointerClassName}`) || document.createElement("div");
  pointer.style.left = e.clientX + "px";
  pointer.style.top = e.clientY + "px";
};
const removePointerIndicator = () => {
  const pointer: HTMLDivElement = document.querySelector(`.${pointerClassName}`);
  pointer && document.body.removeChild(pointer);
};
const attachRelatedClass = (el: HTMLElement) => {
  el.classList.add(boxClassName);
  const style = document.createElement("style");
  style.textContent = `
.${boxClassName} {
  position: absolute;
}
.${boxClassName}::before {
  content: "";
  width: 1px;
  border-top: 1px dashed;
  left: -100vw;
  width: 200vw;
  top: -2px;
  position: absolute;
}
.${boxClassName}::after {
  content: "";
  width: 1px;
  border-right: 1px dashed;
  left: -2px;
  height: 200vh;
  top: -100vh;
  position: absolute;
}
.${pointerClassName}::before {
  border-top: 1px dashed red;
}
.${pointerClassName}::after {
  border-right: 1px dashed red;
}
`;
  document.body.appendChild(style);
};
</script>
<template>
  <div class="h-full bg-gray-200">
    <MoveBox v-drag.indicator.keep></MoveBox>
  </div>
</template>
