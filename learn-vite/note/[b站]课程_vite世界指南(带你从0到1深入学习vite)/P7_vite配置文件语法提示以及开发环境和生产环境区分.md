## 1.**让 vite.config.js 具备语法提示：**

### 方法 1：使用 defineConfig 方法：

vite.config.js 需要导出一个配置对象：

```js
export default {
    ...
}
```

但是这样是不会具备配置提示能力的，defineConfig 是一个封装了导出类型的配置构建函数，利用其可以让代码具备提示能力：

```js
import { defineConfig } from "vite";

export default defineConfig({
    ...
})
```

![img](https://img2022.cnblogs.com/blog/1735896/202210/1735896-20221010233345698-278511404.png)
除了这种方式，还能利用代码注意，帮助 vscode 编辑器提供代码提示能力:

### 方法 2: 利用 jsdoc style 的注释

> 扩展补充内容：
>
> 使用 jsDoc 规范的注释，可以使得 vscode 具备代码提示能力，例如如果你注释了某个函数返回的类型和输入参数的类型，可以得到这样的提示：
>
> ![img](https://img2022.cnblogs.com/blog/1735896/202210/1735896-20221010233402566-1081020917.png)
>
> 并且对应的输出在被操作时也会有相应的补全提示:
>
> ![img](https://img2022.cnblogs.com/blog/1735896/202210/1735896-20221010233415994-918422016.png)
>
> > 因为返回字符串，所以有所有的字符串操作方法的补全提示。

利用 jsdoc style 代码注释，我们也可以让 vite.config.js 中的配置具备代码提示补全能力:

我们先看看 defineConfig 导出的是一个什么类型对象：

![img](https://img2022.cnblogs.com/blog/1735896/202210/1735896-20221010233427865-1206860843.png)

然后使用 @type 注释需要导出对象的类型,就可以获得代码补全提示的能力了：

## 2. 条件配置

`defineConfig` 不仅可以传入一个对象配置，还可以传入一个`callback:()=>{}` ,它是一个函数，因此可以进行逻辑判断，也就可以条件式的生成不同的配置。

实际上，这个回调函数提供了一个参数接收对象，`callback:({command:"build"|"serve"})=>{}`, 它能够帮助我们更加方便的判断当前是开发还是生产环境。

```js
// vite.config.js

import { defineConfig } from 'vite';
import prod from './config/vite.prod.config';
import dev from './config/vite.dev.config';

const config = defineConfig(({ command }) => {
  if (command === 'build') {
    // 生产状态
    return prod;
  } else {
    // 开发状态
    return dev;
  }
});

export default config;
```

```js
// config/vite.dev.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 12345,
  },
});
```

```js
// config/vite.prod.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsDir: 'files',
  },
});
```

## 3.策略模式

虽然上面提到的条件配置能够满足我们的项目在不同的状态下应用不同的配置对象。 但是 if...else 始终是不够优雅的，这是时候我们可以利用设计模式中的策略模式来优化，也同时提供了另一种思路。

```js
//vite.config.js
import baseConfig from './config/vite.base.config.js';
import devConfig from './config/vite.dev.config.js';
import prodConfig from './config/vite.prod.config.js';

import { defineConfig } from 'vite';

const envResolver = {
  build: () => Object.assign({}, baseConfig, prodConfig),
  serve: () => Object.assign({}, baseConfig, devConfig),
};

export default defineConfig(({ command }) => {
  console.log('[envResolver[command]]: ', envResolver[command]);
  return envResolver[command]();
});
```

```js
//config/vite.base.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['node_modules'],
  },
});
```

```js
//config/vite.dev.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 22334,
  },
});
```

```js
//config/vite.prod.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsDir: 'assets',
  },
});
```

## 3.vite 是开箱即用的

想要使用 vite, 最简单的步骤是：

```bash
$ touch index.html
$ npm init -y
$ npm i vite -D
$ cat package.json
...
"script":{
	"dev":"vite",
	"build": "vite build" # 打包
}
...
$ npm run dev
```

这样, vite 就会直接将 index.html serve 了。
