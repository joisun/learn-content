// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { github_base_url } from "./const"
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.config.globalProperties.$github_base_url = github_base_url
  }
} satisfies Theme