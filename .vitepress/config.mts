import { defineConfig } from 'vitepress'
import { generateSidebar } from "vitepress-sidebar";

const getSideBar = (): any => {
  const generatedSidebar = generateSidebar([
    {
      documentRootPath: "contents",
      useTitleFromFileHeading: true,
      collapsed: true,
      hyphenToSpace: true,
      keepMarkdownSyntaxFromTitle: true,
      sortMenusOrderByDescending:true,
    },
  ]);
  return generatedSidebar ?? [];
};
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "sunzy.learn",
  description: "personal learning content",
  srcDir:'contents',
  base:"/learn-content/", //https://vitepress.dev/reference/site-config#base
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/' },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/' },
          { text: 'Item B', link: '/' },
          { text: 'Item C', link: '/' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    sidebar: getSideBar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jaycethanks' },
      { icon: {svg:'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 14.316l7.454-5.88l-2.022-1.625L12 11.1l-.004.003l-5.432-4.288l-2.02 1.624l7.452 5.88Zm0-7.247l2.89-2.298L12 2.453l-.004-.005l-2.884 2.318l2.884 2.3Zm0 11.266l-.005.002l-9.975-7.87L0 12.088l.194.156l11.803 9.308l7.463-5.885L24 12.085l-2.023-1.624Z"/></svg>'}, link: 'https://juejin.cn/user/1838039175009038' }
    ]
  }
})
