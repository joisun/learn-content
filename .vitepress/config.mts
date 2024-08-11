import { defineConfig } from 'vitepress'
import { generateSidebar } from "vitepress-sidebar";

const getSideBar = (): any => {
  /*
     * For detailed instructions, see the links below:
     * https://vitepress-sidebar.jooy2.com/guide/api
     */
  const generatedSidebar = generateSidebar([
    {
      documentRootPath: "contents",
      useTitleFromFileHeading: true,
      collapsed: true,// 是否默认折叠
      collapseDepth: 2,// 结合上面的配置，折叠第二层
      hyphenToSpace: true,//文件名 -  转为空格 作为标题
      underscoreToSpace: true,//文件名 _  转为空格 作为标题
      capitalizeFirst: true,// 强制大写首字母
      capitalizeEachWords: true,// 强制大写每个单词首字母
      keepMarkdownSyntaxFromTitle: true,
      sortMenusOrderByDescending: false,
      includeRootIndexFile: false,// 包含 顶层 index.md
      includeFolderIndexFile: false,// 包含 目录下的 index.md
      useFolderTitleFromIndexFile: false,// 将当前目录中 index.md 的以及标题作为menu 名
      // sortMenusOrderNumerically: true, // 如果目录名中前面有数字，按照数字顺序排列
      sortMenusByFrontmatterOrder: true,// 如果目录下 Index.md frontmatter 中有 order 字段则按照这个字段排列, 我们仅在某个学习话题下使用这个规则
      excludeFolders: ["code", "codes", "react_learn", "sprintboot_learn", "clang_learn", "c_sharp_learn", "ai_script_learn", "mini_vue"],
      // 手动排序（优先级比较高）
      manualSortFileNameByPriority: [// 这个字段要写目录名/文件名 
        "Front-End", "Back-End", "FE-Engineering", "Basic", "Algo",// 现有一级目录手动排序
        "nextjs_learn", "vue3_learn", "svelte_learn",// 现有 Front-End 目录 手动排序
        "nestjs_learn", "golang_learn",// 现有 Back-End 目录 手动排序
      ]
    },
  ]);

  return generatedSidebar ?? [];
};
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "sunzy.learn",
  description: "personal learning content",
  srcDir: 'contents',
  base: "/learn-content/", //https://vitepress.dev/reference/site-config#base
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: "icon", type: "image/svg+xml", href: "/learn-content/assets/icon.svg" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'sunzy.fun', link: 'https://sunzy.fun/' },
      { text: 'cnblog', link: 'https://www.cnblogs.com/jaycethanks/' },
      { text: 'github.io', link: 'https://joisun.github.io/' },
      {
        text: 'Tools',
        items: [
          { text: 'Svg Convert', link: 'https://joisun.github.io/demos/Others/svgConvert/dist/' },
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
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 14.316l7.454-5.88l-2.022-1.625L12 11.1l-.004.003l-5.432-4.288l-2.02 1.624l7.452 5.88Zm0-7.247l2.89-2.298L12 2.453l-.004-.005l-2.884 2.318l2.884 2.3Zm0 11.266l-.005.002l-9.975-7.87L0 12.088l.194.156l11.803 9.308l7.463-5.885L24 12.085l-2.023-1.624Z"/></svg>' }, link: 'https://juejin.cn/user/1838039175009038' }
    ],
    outline: 'deep'
  },
  markdown: {
    // toc: { level: [1, 2, 3, 4], },

  }
})
