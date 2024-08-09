---
order: 1
---

## 介绍

### 什么是 Next.js

Next.js 是一个用于构建全栈应用的 React 框架

在背后， Next.js 自动为 React 做了很多抽象和配置工作，例如打包， 编译等等

### 主要特性

1. 路由 Routing
   一个用于构建 Server 组件的，基于文件系统的路由， 它支持布局，嵌套路由，加载状态，错误处理等等
2. 渲染 Rendering
   通过 Client 组件和 Server 组件，实现了客户端和服务端渲染。通过 Next.js 进一步优化服务器上的静态和动态渲染。
3. 数据获取 Data Fetching
   通过 Async/Await 简化服务端 组件的数据获取，并且扩展了 fetch API， 实现了请求缓存，数据缓存以及 revalidation
4. 样式处理 Styling
   支持开发者偏好的样式处理方法，包括 Modules CSS, tailwind, CSS-in-JS
5. 优化 Optimizations
   通过优化图片，字体以及脚本逻辑，提高网页的性能指标和用户体验
6. Typescript
   支持 TS

### App Router 和 Pages Router

Next.js 提供了两种不同的路由： App Router 和 Pages Router

App Router 是一个新出的 Router ,它允许你使用 React 最新的 特性， 例如 Server Components 和 Streaming。

Page Router 是 Next.js 原生支持的 Router（一直都有的），允许你构建 Server-Rendered React 应用，并且支持老版本的 Next.js 应用。

在你使用 Nextjs 的时候，看文档的时候需要注意看的是哪种 Router。
