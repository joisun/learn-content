---
order: 6
---

## 路由导航

学习目标

- 如何使用 next/link 组件
- 如何使用 `usePathname()` 展示当前激活的路由 link
- Next.js 中的导航是如何工作的





### `<Link>` 组件

在 Next.js 中， 你可以使用 `<Link/>` 组件在页面之间导航，它是 [client-side 导航](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)。

用法和 `a` 链接很相似，`<Link href="…">`， 为什么不直接使用 `a` 链接导航呢？ 因为直接使用 `a` 标签进行导航，会导致页面刷新。

```tsx
<Link
  key={link.name}
  href={link.href}
  className="flex items-center"
>
  <LinkIcon className="w-6" />
  <p>{link.name}</p>
</Link>
```





### 自动代码分割 和 预加载 （Automatic code-splitting and prefetching）

和传统的 React SPA 应用从一开始浏览器就加载所有的应用代码不同。Next.js 通过路由自动的分割你的应用，以达到导航优化的目的。 

通过路由切分代码也就意味着所有的页面是独立的。如果某个页面中抛出了错误，那么也不会影响到其他的页面。

在 **生产** 中，当 `<Link>` 组件出现在浏览器视图中的时候， Next.js 自动在背后 **预加载** 所链接的路由页面代码，所以当用户在点击该链接的时候，目标的页面在背后就已经加载了。这就是为什么Next.js 中，页面跳转表现近乎瞬间。

> 可以在这里了解更多 [how navigation works](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works).





### 高亮激活的 link

Next.js 提供了一个 hook 名为 [`usePathname()`](https://nextjs.org/docs/app/api-reference/functions/use-pathname) , 可以使用这个 hook 来获取当前的路由， 从而做条件判断，进而实现 UI 上的高亮当前路由。

但是由于 Client 组件才能够使用 hook， 所以需要在文件头表明这是一个 客户端组件。

```tsx
'use client';

//...
import { usePathname } from 'next/navigation';

//...
export default function NavLinks() {
  const pathname = usePathname();
  // ...
  <Link key={link.name} href={link.href}  className={clsx( 'flex items-center'  , { 'bg-sky-100 text-blue-600' : pathname===link.href }, )}>...</Link>
  //...
}
```

