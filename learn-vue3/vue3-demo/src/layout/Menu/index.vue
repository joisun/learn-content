<script setup lang="ts">
import MenuItem from "@/components/MenuItem/index.vue"

type TreeList = {
  name: string
  children?: TreeList[] | []
}

type Props = {
  menuList: TreeList[]
}

defineProps<Props>()


</script>
<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<template>
  <div class="divide-y">
    <div v-for="item in menuList">
      <MenuItem :text="item.name" />
      <Menu class="ml-5" v-if="item?.children?.length" :menuList="item.children" />

    </div>

  </div>
</template>