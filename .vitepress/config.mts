import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "sunzy.learn",
  description: "personal learning content",
  srcDir:'contents',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text:'clang_learn',
        items:[
          {text:'001.数据类型',link:'/clang_learn/note/001.数据类型'},
          {text:'002.定义常量',link:'/clang_learn/note/002.定义常量'},
          {text:'003.浮点数整数运算',link:'/clang_learn/note/003.浮点数整数运算'},
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
