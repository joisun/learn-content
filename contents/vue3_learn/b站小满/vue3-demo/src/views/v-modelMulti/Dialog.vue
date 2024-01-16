<script setup lang="ts">
type Props = {
  modelValue: boolean;
  title: string;
};
// defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
  title: "我是默认值",
});
// (defineProps<Props>(),

const emit = defineEmits(["update:modelValue", "update:title"]);
const handleClose = () => {
  emit("update:modelValue", false);
};
const handleChange = () => {
  emit("update:title", "改了改了");
};
const handleChangeBack = () => {
  emit("update:title", props.title.value);
};
</script>
<template>
  <div v-if="modelValue" class="model-wrapper flex justify-center items-center">
    <div class="dialog border w-96 min-h-48 bg-white rounded">
      <div
        class="header flex justify-between items-center px-2 border-b-2 border-gray-500"
      >
        <div class="title">{{ title }}</div>
        <div class="close"><button @click="handleClose">close</button></div>
      </div>
      <div class="content p-5">
        <button @click="handleChange">改个title</button>
        <button @click="handleChangeBack">改回去</button>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis atque facilis
        culpa est quibusdam vitae, maiores sunt eveniet eaque omnis assumenda minima
        dignissimos nihil eligendi. Deserunt, rem atque. Totam, laborum!
      </div>
    </div>
  </div>
</template>
