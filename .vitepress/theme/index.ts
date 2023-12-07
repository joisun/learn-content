// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { vscode_base_url } from "./const"
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.config.globalProperties.$vscode_base_url = vscode_base_url
  }
} satisfies Theme