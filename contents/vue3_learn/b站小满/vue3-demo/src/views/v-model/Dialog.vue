<script setup lang="ts">
type Props = {
  modelValue: boolean;
};
defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const handleClose = () => {
  emit("update:modelValue", false);
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
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis atque facilis
        culpa est quibusdam vitae, maiores sunt eveniet eaque omnis assumenda minima
        dignissimos nihil eligendi. Deserunt, rem atque. Totam, laborum!
      </div>
    </div>
  </div>
</template>
