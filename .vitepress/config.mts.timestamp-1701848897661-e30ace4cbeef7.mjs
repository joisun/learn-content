// .vitepress/config.mts
import { defineConfig } from "file:///home/jayce/workspace_personal/learn-content/node_modules/.pnpm/vitepress@1.0.0-rc.31_@algolia+client-search@4.20.0_@types+node@20.10.3_search-insights@2.11.0_typescript@5.3.2/node_modules/vitepress/dist/node/index.js";
import { generateSidebar } from "file:///home/jayce/workspace_personal/learn-content/node_modules/.pnpm/vitepress-sidebar@1.18.0/node_modules/vitepress-sidebar/dist/index.js";
var getSideBar = () => {
  const generatedSidebar = generateSidebar([
    {
      documentRootPath: "contents",
      useTitleFromFileHeading: true,
      collapsed: true,
      hyphenToSpace: true,
      keepMarkdownSyntaxFromTitle: true,
      sortMenusOrderByDescending: true
    }
  ]);
  return generatedSidebar ?? [];
};
var config_default = defineConfig({
  title: "sunzy.learn",
  description: "personal learning content",
  srcDir: "contents",
  base: "/learn-content/",
  //https://vitepress.dev/reference/site-config#base
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Guide", link: "/" },
      {
        text: "Dropdown Menu",
        items: [
          { text: "Item A", link: "/" },
          { text: "Item B", link: "/" },
          { text: "Item C", link: "/" }
        ]
      }
    ],
    search: {
      provider: "local"
    },
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    },
    sidebar: getSideBar(),
    socialLinks: [
      { icon: "github", link: "https://github.com/jaycethanks" },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 14.316l7.454-5.88l-2.022-1.625L12 11.1l-.004.003l-5.432-4.288l-2.02 1.624l7.452 5.88Zm0-7.247l2.89-2.298L12 2.453l-.004-.005l-2.884 2.318l2.884 2.3Zm0 11.266l-.005.002l-9.975-7.87L0 12.088l.194.156l11.803 9.308l7.463-5.885L24 12.085l-2.023-1.624Z"/></svg>' }, link: "https://juejin.cn/user/1838039175009038" }
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvamF5Y2Uvd29ya3NwYWNlX3BlcnNvbmFsL2xlYXJuLWNvbnRlbnQvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamF5Y2Uvd29ya3NwYWNlX3BlcnNvbmFsL2xlYXJuLWNvbnRlbnQvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2pheWNlL3dvcmtzcGFjZV9wZXJzb25hbC9sZWFybi1jb250ZW50Ly52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcbmltcG9ydCB7IGdlbmVyYXRlU2lkZWJhciB9IGZyb20gXCJ2aXRlcHJlc3Mtc2lkZWJhclwiO1xuXG5jb25zdCBnZXRTaWRlQmFyID0gKCk6IGFueSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRlZFNpZGViYXIgPSBnZW5lcmF0ZVNpZGViYXIoW1xuICAgIHtcbiAgICAgIGRvY3VtZW50Um9vdFBhdGg6IFwiY29udGVudHNcIixcbiAgICAgIHVzZVRpdGxlRnJvbUZpbGVIZWFkaW5nOiB0cnVlLFxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgaHlwaGVuVG9TcGFjZTogdHJ1ZSxcbiAgICAgIGtlZXBNYXJrZG93blN5bnRheEZyb21UaXRsZTogdHJ1ZSxcbiAgICAgIHNvcnRNZW51c09yZGVyQnlEZXNjZW5kaW5nOnRydWUsXG4gICAgfSxcbiAgXSk7XG4gIHJldHVybiBnZW5lcmF0ZWRTaWRlYmFyID8/IFtdO1xufTtcbi8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2Uvc2l0ZS1jb25maWdcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRpdGxlOiBcInN1bnp5LmxlYXJuXCIsXG4gIGRlc2NyaXB0aW9uOiBcInBlcnNvbmFsIGxlYXJuaW5nIGNvbnRlbnRcIixcbiAgc3JjRGlyOidjb250ZW50cycsXG4gIGJhc2U6XCIvbGVhcm4tY29udGVudC9cIiwgLy9odHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnI2Jhc2VcbiAgdGhlbWVDb25maWc6IHtcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6ICdHdWlkZScsIGxpbms6ICcvJyB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnRHJvcGRvd24gTWVudScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnSXRlbSBBJywgbGluazogJy8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnSXRlbSBCJywgbGluazogJy8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnSXRlbSBDJywgbGluazogJy8nIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0sXG4gICAgc2VhcmNoOiB7XG4gICAgICBwcm92aWRlcjogJ2xvY2FsJ1xuICAgIH0sXG4gICAgbGFzdFVwZGF0ZWQ6IHtcbiAgICAgIHRleHQ6ICdVcGRhdGVkIGF0JyxcbiAgICAgIGZvcm1hdE9wdGlvbnM6IHtcbiAgICAgICAgZGF0ZVN0eWxlOiAnZnVsbCcsXG4gICAgICAgIHRpbWVTdHlsZTogJ21lZGl1bSdcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2lkZWJhcjogZ2V0U2lkZUJhcigpLFxuXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vamF5Y2V0aGFua3MnIH0sXG4gICAgICB7IGljb246IHtzdmc6JzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIm0xMiAxNC4zMTZsNy40NTQtNS44OGwtMi4wMjItMS42MjVMMTIgMTEuMWwtLjAwNC4wMDNsLTUuNDMyLTQuMjg4bC0yLjAyIDEuNjI0bDcuNDUyIDUuODhabTAtNy4yNDdsMi44OS0yLjI5OEwxMiAyLjQ1M2wtLjAwNC0uMDA1bC0yLjg4NCAyLjMxOGwyLjg4NCAyLjNabTAgMTEuMjY2bC0uMDA1LjAwMmwtOS45NzUtNy44N0wwIDEyLjA4OGwuMTk0LjE1NmwxMS44MDMgOS4zMDhsNy40NjMtNS44ODVMMjQgMTIuMDg1bC0yLjAyMy0xLjYyNFpcIi8+PC9zdmc+J30sIGxpbms6ICdodHRwczovL2p1ZWppbi5jbi91c2VyLzE4MzgwMzkxNzUwMDkwMzgnIH1cbiAgICBdXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStVLFNBQVMsb0JBQW9CO0FBQzVXLFNBQVMsdUJBQXVCO0FBRWhDLElBQU0sYUFBYSxNQUFXO0FBQzVCLFFBQU0sbUJBQW1CLGdCQUFnQjtBQUFBLElBQ3ZDO0FBQUEsTUFDRSxrQkFBa0I7QUFBQSxNQUNsQix5QkFBeUI7QUFBQSxNQUN6QixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZiw2QkFBNkI7QUFBQSxNQUM3Qiw0QkFBMkI7QUFBQSxJQUM3QjtBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU8sb0JBQW9CLENBQUM7QUFDOUI7QUFFQSxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixRQUFPO0FBQUEsRUFDUCxNQUFLO0FBQUE7QUFBQSxFQUNMLGFBQWE7QUFBQTtBQUFBLElBRVgsS0FBSztBQUFBLE1BQ0gsRUFBRSxNQUFNLFNBQVMsTUFBTSxJQUFJO0FBQUEsTUFDM0I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMLEVBQUUsTUFBTSxVQUFVLE1BQU0sSUFBSTtBQUFBLFVBQzVCLEVBQUUsTUFBTSxVQUFVLE1BQU0sSUFBSTtBQUFBLFVBQzVCLEVBQUUsTUFBTSxVQUFVLE1BQU0sSUFBSTtBQUFBLFFBQzlCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxhQUFhO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixlQUFlO0FBQUEsUUFDYixXQUFXO0FBQUEsUUFDWCxXQUFXO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxJQUVBLFNBQVMsV0FBVztBQUFBLElBRXBCLGFBQWE7QUFBQSxNQUNYLEVBQUUsTUFBTSxVQUFVLE1BQU0saUNBQWlDO0FBQUEsTUFDekQsRUFBRSxNQUFNLEVBQUMsS0FBSSxzWEFBcVgsR0FBRyxNQUFNLDBDQUEwQztBQUFBLElBQ3ZiO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
