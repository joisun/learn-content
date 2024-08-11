---
order: 4
---

## 字体和图片优化

学习目标

1. 如何通过 next/font 添加自定义字体
2. 如何通过 next/image 添加图片
3. Nextjs 中 字体和图片是如何被优化的

### 为何要优化字体？

使用自定义的字体时，如果这个字体需要从外部加载，那么就会影响性能。

[Cumulative Layout Shift](https://vercel.com/blog/how-core-web-vitals-affect-seo) 累积布局偏移是 Google 用来评估网站性能和用户体验的指标。

使用自定义字体的时候，网络加载的字体资源可能滞后，会导致页面初始渲染后，再应用字体，发生页面重新布局。

NextJS 的做法是当你使用 `next/font` 这个模块的时候，在打包阶段就会将相应的字体文件下载下来，和其他的静态资源文件一起 Host, 也就是意味者不需要额外的字体资源网络请求，从而提高页面性能。

如何添加字体呢？

简单的来说，就是从`next/font` 模块中导入一个构造函数，构建一个包含 className 的对象， 然后应用到目标元素即可。

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

//...
<body className={`${inter.className}`}></body>;
//...
```

### 为何要优化图片？

Next.js 会 serve `/public` 路径下图片一类的静态资源。

常规直接使用原生`img` 元素的时候有些问题需要先考虑到：

-   确保图片在不同屏幕尺寸设备上自适应
-   为不同的设备应用不同的图片
-   避免图片加载时组织重新布局（没有指定 img 高度会坍塌）
-   处理懒加载

Next.js `next/image` 会帮我们做一些优化，例如：

-   阻止当图片加载的时候页面重新布局
-   当较大的图片在小尺寸设备上显示的时候自动调整尺寸
-   默认懒加载
-   Serving 如 WebP, AVIF 之类的现代资源格式

#### 为不同设备指定不同的图片

```tsx
// 条件渲染实现
    <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
```

### 推荐阅读

-   [Image Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
-   [Font Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
-   [Improving Web Performance with Images (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia)
-   [Web Fonts (MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)
-   [How Core Web Vitals Affect SEO](https://vercel.com/blog/how-core-web-vitals-affect-seo)
