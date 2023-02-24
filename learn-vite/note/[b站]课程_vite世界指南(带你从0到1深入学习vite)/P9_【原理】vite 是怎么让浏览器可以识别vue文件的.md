在你执行 `npm run dev` 命令的时候， 也就是执行了 `vite` 命令时。

vite 大致上做了这样几件事：

1. 开启一个本地web服务器 去 serve 项目中 /index.html 文件（解析入口）
2. /index.html 中又通过 script:src 引入了 main.js 即项目入口
3. vue 项目本质上是一个 树状结构树， 其中文件又引入其他的文件。
4. 对于所有的 .vue 文件，vite 会通过语法解析，将所有文件编译成 js 文件内容。 
5. 然后注册所有的文件请求列表，本质上，就是在构建 script:src 的资源列表
6. 浏览器serve 了 /index.html ，然后通过 main.js 去写入 一堆 script:src 以载入首次页面加载所需的所有依赖文件。
7. 注意，本质上是浏览器和 node 服务器之间的通信，而浏览器本身对javascript 的解析是没有文件后缀名的限制的，也就是 `.vue` 也可以被正常解析，浏览器本身并不关注。 只要node 返回的资源文件的 MIME TYPE 被设定为 "text/javascript" 就能够被浏览器正常解析。



以上是vite 开发服务器的大致原理，具体的可以看 vite 官网原理部分，有相关介绍。

也是为什么浏览器能够读取 .vue 文件的原因， 用一句话概括其实就是： 浏览器之所以能够读取 .vue 文件的原因是， 浏览器对脚本文件的解析并不关注文件后缀名， 只需要关注资源文件的 response.type 属性是否为 "text/javascript" 即可。

