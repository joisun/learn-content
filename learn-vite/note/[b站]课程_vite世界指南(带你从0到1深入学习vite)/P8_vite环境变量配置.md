常见的环境有：

1. 开发环境
2. 测试环境
3. 预发布环境
4. 灰度环境
5. 生产环境



在 vite 中，环境变量的处理利用了 dotenv 这个第三方库， dotenv 会在执行 package.json 中 script 指定的 vite 相关命令时去**读取** .env 文件，如 `vite`(`npm run dev`) , `vite build` （`npm run build`）。 并且会去 **解析** 这个文件中变量配置， 并 **注入** 到 **process** 对象下。



默认地， vite 将我们的开发环境取名为 development, 将我们的生产环境取名为 production

通常对应了几个配置文件：

- `.env` : 所用环境公用的环境变量
- `.env.development`: 开发环境需要用到的环境变量
- `.env.production`:生产环境需要用到的环境变量

在 package.json - script 字段中，配置 vite 命令的时候， 可以传递一个 `--mode` 选项，默认的 

```json
"script":{
    "dev": "vite", // 默认 --mode development
    "build": "vite build" //默认 --mode production
}
```

依照这个规则，我们可以指定特定的环境，例如：

`vite --mode test`, 即可对应加载 `.env.test` 环境变量文件。



注意：

1. 通常情况下，我们都是把环境变量放在项目根目录下，也就是和 package.json 的同级目录下。

2. 如果你需要指定特定的环境变量加载路径，你有两种做法：

   > https://cn.vitejs.dev/config/#environment-variables 
   >
   > <span style="color:red">todo: 文档中，和网课中都提到了 root 和 envDir 会影响环境变量加载策略，具体什么意思，搞搞清楚。</span>

   1. 通过 vite.config.js 中的 `envDir` 字段配置
   2. 通过 loadEnv 方法手动指定 环境变量文件

接上节代码示例：

```js
//vite.config.js
import baseConfig from './config/vite.base.config.js';
import devConfig from './config/vite.dev.config.js';
import prodConfig from './config/vite.prod.config.js';

import { defineConfig,loadEnv } from 'vite';

const envResolver = {
  build: () => Object.assign(baseConfig, prodConfig),
  serve: () => Object.assign(baseConfig, devConfig),
};

export default defineConfig(({ command,mode }) => {
  const env = loadEnv(mode,process.cwd(),'')
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  return Object.assign({},envResolver[command](),{
    define:{
      __APP_ENV__: env.APP_ENV
    }
  });
});
```

> 关于 `process.cwd()` 方法：
> 这个方法返回当前工作目录的绝对路径： current workspace directory
>
> 也就是 package.json 所在目录。
>
> 上面代码中， `loadEnv` 方法，的第二个参数，也就是一个路经的字符串，因为约定俗称，通常是将环境变量直接放在当前工作目录下，所以这里直接使用了 `process.cwd()` 方法, 如果你的环境变量没有放在根目录，那么就 应该指定其实际的路径，而不是直接 `process.cwd()`。



> 知识补充：为什么, vite.config.js 不是在node环境被读取的吗？ node 的包管理规范是 commonjs, 那么为什么 node 能够处理 vite.config.js 中的esmodule 语法 ？（`import`, `export default`，...）
>
> 这涉及到了 vite.config.js 的执行时机。
>
> 在 vite 读取 vite.config.js 时，会率先去用解析文件语法。
>
> 会将  esmodule 语法转换成node能够处理的 commonjs 语法。 





当我们在调用 loadenv 的时候，他会做如下几件事情：

1. 直到找到 ,env 文件，并解析其中的环境变量，放到一个对象中。 

2. 会将传进来的 mode 这个变量的值进行拼接 `.env[mode]` , 如`.env.development`, 并根据我们提供的目录去取对应的配置文件并进行解析，并放进一个对象。

3. 我们可以理解为

   ```js
   const baseEnvConfig = 读取的.env 的配置
   const modeEnvConfig = 读取env相关配置
   const lastEnvConfig = {...baseEnvConfig, ...modeEnvConfig }
   ```



vite.config.js 在node 端被解析，所以可以通过 process对象上的 env 属性访问到环境变量。

如果是 客户端， vite 会将对应的环境变量注入到 `import.meta.env` 里去。 

> vite 做了一个拦截，为了防止将隐私性的变量直接注入 `import.meta.env` 中， 仅以 ”VITE“ 开头的变量才会被注入。 如果我们想要更改这个前缀，可以在vite.config.js  配置 envPrefix。   

