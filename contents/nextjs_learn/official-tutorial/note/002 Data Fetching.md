[toc]

### Data Fetching

Next.js 中的 Data Fetching 允许你用不同的预渲染方式去渲染你页面内容。 包括了 **SSR** (Server-side Rendering), **SSG** (Static (Site) Generation), 以及 **ISR** ( Incremental Static Regeneration).

> Next.js 允许你用不同的策略去预渲染页面，而这些策略是通过区别不同数据获取的函数来实现，或者说应用。

#### SSR: Server-side generation

##### getServerSideProps

如果你导出一个名为 `getServerSideProps` 的函数，那么 Next.js 将会在`getServerSideProps` 每次数据请求回来后再预渲染页面， 也就是服务端渲染。

- `getServerSideProps` 函数 return 一个 JSON 数据，并将会被用于 页面组件的 Props, 用于组件的渲染。
- `getServerSideProps` 仅能从一个 **page** 被导出，不能从其他的非页面文件。且必须被导出为一个单独的函数。

```tsx
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
```

###### `getServerSideProps` 什么时候被执行？（执行时机）

`getServerSideProps` 仅会在服务端执行，且永远不会在浏览器执行。 它的触发有两种情况：

1. 直接请求含有该导出函数的页面
2. 通过路由，链接跳转到含有该导出函数的页面。

###### 我什么情况下应该使用 `getServerSideProps`？

你只有渲染必须在请求的时候获取其页面数据的也面，才应该使用 `getServerSideProps` , 可能是数据的性质，或者请求头的属性。 例如（`authorization` 或者 GEO 位置信息）。 使用 `getServerSideProps` 的页面，仅在 [cache-control headers](https://nextjs.org/docs/going-to-production#caching) 被配置的时候才会被 **缓存** 下来。 

如果你并不需要在请求期间 去渲染数据， 那么你应该考虑使用 [client side](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#fetching-data-on-the-client-side) 或者 [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) 去获取数据。

> 可以理解为无法静态生成页面内容的场景，应该使用 SSR, 例如动态数据。



**getServerSideProps or API Routes**

> todo



###### 在客户端获取数据 (Fetching data on the client side)

如果你的页面内容需要频繁更新数据， 且你不需要预渲染这些数据，你可以在 客户端去获取这些数据， 这有个示例就是 user-specific 数据：

- 首先，立即展示页面（没有数据）， 这个页面的部分内容可以使用 Static Generation 去预渲染， 你可以展示一个 loading 信息为待加载 的数据
- 然后，在客户端去拉取数据，并展示

这个实践对于用户 dashboard 页有很好的效果。 例如，因为 dashboard 是私密的，user-specitic 页面， 无需 SEO ，且无需被预渲染。 这些页面数据通常是频繁更新的，是 which requires request-time data fetching 的。

###### Using getServerSideProps to fetch data at request time

以下示例展示了如何在 request time 去获取数据，并依据数据预渲染页面

```tsx
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
```



###### Caching with Server-Side Rendering (SSR)

默认 SSR 是不会缓存页面的， 但是可以配置请求头

```tsx
// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}
```





#### SSG Static-site generation



#### CSR:Client-side rendering



#### Dynamic routing





#### ISR: Incremental Static Regeneration