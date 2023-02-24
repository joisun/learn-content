<script setup lang="ts">
import Header from "./Header/index.vue";
import Menu from "./Menu/index.vue";
import Content from "./Content/index.vue";
import { ref } from "vue";
type TreeList = {
  name: string;
  children?: TreeList[] | [];
};
const menuList: TreeList[] = [
  {
    name: "财务管理",
    children: [
      {
        name: "日度报告",
      },
      {
        name: "月度报告",
      },
      {
        name: "年度报告",
      },
      {
        name: "统计管理",
        children: [
          {
            name: "数据导入",
          },
          {
            name: "数据导出",
          },
        ],
      },
    ],
  },
  {
    name: "设备管理",
    children: [
      {
        name: "网关管理",
      },
      {
        name: "IP分配",
      },
      {
        name: "机房分布",
      },
    ],
  },
  {
    name: "个人中心",
  },
  {
    name: "市场管理",
  },
  {
    name: "组织架构",
  },
  {
    name: "系统管理",
    children: [
      {
        name: "权限控制",
      },
      {
        name: "菜单管理",
      },
      {
        name: "首页部署",
      },
    ],
  },
];
</script>
<template>
  <div class="layout-wrapper h-full">
    <Header
      title="Learn-Vue3"
      class="fixed w-full h-12 top-0 shadow-md bg-white"
    ></Header>
    <div class="w-full flex mt-12 h-full">
      <!-- <Menu :menuList="menuList" class="min-w-[200px] h-full border-gray-300 border-r"></Menu> -->
      <Content class="w-full min-h-min"></Content>
    </div>
  </div>
</template>
