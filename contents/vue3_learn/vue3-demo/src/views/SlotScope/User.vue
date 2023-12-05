<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
let userinfo: any = ref(null)
let userId = ref('')
const props = defineProps({
  gender: {
    default: 'male'
  },
  country: {
    default: 'us'
  }
})
const { gender, country } = props
onBeforeMount(() => {
  // https://randomuser.me/documentation#howto
  fetch(`https://randomuser.me/api/?gender=${gender}?nat=${country}`).then(res => {
    res.json().then(parse => {
      userinfo.value = parse.results[0]
      userId.value = parse.results[0].id.value
    })
  })
})
</script>
<template>
  <div class="w-96 border shadow-md rounded-lg m-10 p-4" v-if="userinfo != null">
    <div class="text-red-400">
      <slot :id="userId"></slot>
    </div>
    <div class="mt-5 text-sm text-gray-500">
      <slot name="userinfo" :user="userinfo"></slot>
    </div>
  </div>
</template> 