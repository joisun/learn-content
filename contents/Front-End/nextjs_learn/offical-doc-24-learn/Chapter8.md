---
order: 9
---



## 静态和动态渲染 Static and Dynamic Rendring

学习目标

- 静态渲染 static rendering 是什么，它是怎么提高你的应用性能的

- 动态渲染 dynamic rendering 是什么？ 何时使用它

- 动态页面的不同实现方案

  

### 什么是静态渲染

静态渲染指的是数据的获取和渲染都发生在服务端应用构建阶段，或者当发生 [revalidating data](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) 的时候

> revalidate 可以理解为 数据变更，重新构建页面的过程

无论何时用户访问你的网页，都会提供缓存的结果，静态渲染有这样几个好处：

- 更快的网页： 预渲染的内容可以被缓存分发
- 降低服务器负载：因为内容会被缓存下来，你的服务器不需要为每次用户请求单独生成内容
- SEO： 预渲染的内容更易于被搜索引擎爬虫索引， 因为当页面加载的时候，内容是准备好的，而不是客户端生成的

**静态渲染适用于没有数据，或者通用数据的 UI 页面**，例如博客页面，或者产品页面。但是不适用于需要用户特定的页面，例如用户资料卡，个人中心，或者像 dashboard 这种需要时长更新的非常个性化数据页面。





与静态渲染相反的，就是动态渲染。

### 什么是动态渲染

动态渲染就是每当用户访问页面路由的时候，服务端就会动态的生成对应的内容。 

动态渲染有这样几个好处：

- 实时数据 Real-Time Data: 动态渲染可以让你展示需要频繁更新的数据。
- 特定于用户的内容： 像用户个人化的内容，例如dashboard或者用户资料，以及可以响应用户操作带来的数据更新。
- 请求时信息（Request Time information）:  动态渲染允许你可以访问请求时的内容，例如 cookies 或者 URL search 参数，表单提交 action 等。



Next.js 中默认使用的就是 RSC React Server Component  ，如上一章节中的 /dashbord ， 它是动态渲染的

