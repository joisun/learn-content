import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from 'mitt'//EventBus Library

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";


const app = createApp(App);
const Mit = mitt();
// 定义 Ts type
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof Mit
  }
}
app.config.globalProperties.$Bus = Mit

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

import card from "@/components/GlobalComponents/Card.vue";
app.component("cus-card", card);

app.mount("#app");
