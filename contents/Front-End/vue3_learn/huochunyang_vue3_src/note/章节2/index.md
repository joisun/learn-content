## 2.4 框架应该输出怎么样的构建产物



![Vue.js 打包构建产物](./assets/Vue.js%20%E6%89%93%E5%8C%85%E6%9E%84%E5%BB%BA%E4%BA%A7%E7%89%A9.svg)

- 为什么esm会有两种输出？
  无论是rollup，webpack在寻找资源时，如果package.json中存在module字段，那么会被优先该字段指定资源，而不是main字段，Vue.js源码/packages/vue/package.json.module 的指向就是 dist/vue.runtime.esm-bundler.js

- 两种输出有什么区别？

  vue.esm-browser.js 中通过__DEV__常量控制要不要在产物中包含代码提示。vue.esm-bundler.js 中将 __DEV__常量 替换为(process.env.NODE_ENV !== 'production') 。好处是，用户可以通过webpack配置自行决定构建资源的目标环境。

- 这些输出所对应的 rollup 配置是怎么样的？
  ```js
  // rollup.config.js
  const config = {
    input: "input.js",
    output: {
      file: "output.js",
      // iife for browser normal script
      format: "iife",
      // esm for browser module script or bunlder tools like rollup/webpack
      // format: "esm", 
  
      // common Js for node
      // format: "cjs", 
    },
  };
  export default config;
  
  ```

  