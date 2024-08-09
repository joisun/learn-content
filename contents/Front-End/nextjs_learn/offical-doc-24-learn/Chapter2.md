---
order: 3
---

##  CSS 样式

学习目标：

1. 如何添加全局的样式文件
2. 两种不同的 CSS 支持方式： Tailwind 和 CSS modules
3. 如何通过 `clsx` 工具函数条件应用 css 类名



### 全局样式

通常来说，全局样式组件需要添加到你的顶层组件，在 Nextjs 中，通常是  [root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required) 。

```tsx
// /app/layout.tsx
import '@/app/ui/global.css';
```





### CSS modules 和 Tailwind

CSS module 的用法和 React 一样：

1. 定义一个 `xxx.module.css` 文件

   ```css
   /* /app/ui/home.module.css */
   .shape {
     height: 0;
     width: 0;
     border-bottom: 30px solid black;
     border-left: 20px solid transparent;
     border-right: 20px solid transparent;
   }
   ```

2. 在需要应用该样式的组件中导入并添加类名

   ```tsx
   // /app/page.tsx
   import styles from '@/app/ui/home.module.css';
   export default function Page() {
       //...
      <div className={styles.shape} />
       //...
   }
   ```

   

Tailwind 中常需要需要条件切换或者应用类名的场景， `clsx` 这个库就是用于解决这个场景下的问题的：

```tsx
import clsx from 'clsx';
//...
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
//...
```



### 其他的 Styling 解决方案

- sass
- css-in-js: [styled-jsx](https://github.com/vercel/styled-jsx), [styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components), and [emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion).

