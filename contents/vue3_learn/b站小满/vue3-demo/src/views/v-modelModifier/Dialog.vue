<script setup lang="ts">
type Props = {
  modelValue: boolean;
  modelModifiers?: {
    jayce: boolean;
  };
};
const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const content = ref(
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore amet adipisci distinctio pariatur eveniet maiores quidem sed voluptatum corrupti, beatae veniam nobis fugit praesentium consequuntur aperiam nemo doloremque voluptas. Dolor."
);

const handleClose = () => {
  emit("update:modelValue", false);
};

const checkModelModifiers = () => {
  console.log("[props.modelModifiers]: ", props.modelModifiers);
};
const doSomethingDependOnModifier = () => {
  if (props.modelModifiers?.jayce) {
    content.value =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quam.";
  }
};
</script>
<template>
  <div v-if="modelValue" class="model-wrapper flex justify-center items-center">
    <div class="dialog border w-96 min-h-48 bg-white rounded">
      <div
        class="header flex justify-between items-center px-2 border-b-2 border-gray-500"
      >
        <div class="title">This is a Dialig title</div>
        <div class="close"><button @click="handleClose">close</button></div>
      </div>
      <div class="content p-5">
        <button @click="checkModelModifiers">看一下Modifiers</button>
        <button @click="doSomethingDependOnModifier">判断Modifiers并做点什么</button>
        {{ content }}
      </div>
    </div>
  </div>
</template>
