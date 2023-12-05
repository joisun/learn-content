## 1. 在 Vite  中处理 css

vite 天生就支持对css 文件的直接处理

**/index.html**

```html
<script src="index.js" type="module"></script>
```

**/index.js**

```js
import "./index.css"
```

**/index.css**

```css
html,
body {
  width: 100%;
  height: 100%;
  background-color: blueviolet;
}
```



这样就能直接被解析的



### 实现原理：

1. vite 在读取到了 index.js 中引用到了 index.css

2. 直接去使用 fs 模块去读取 index.css 中的文件内容

3. 直接创建一个style 标签，将 index.css 中的文件内容直接 复制到 style 标签

4. 将 style 标签插入到 index.html 的 head 中 

5. 将该 css 文件中的 内容直接替换为 js 脚本（方便热更新或者 css 模块化），同时设定 content-type 为js, 从而让浏览器以 js 脚本的形式来执行该 css 后缀文件， 就和之前说的 .vue 文件的处理是类似的。 

   ![image-20221013101400018](P10_vite 中对css 和 css模块化的简单处理.assets/image-20221013101400018.png)



## 2. css 模块化处理

在 vite 中，如果你不使用 cssModule ,并且不指定 vue style 标签 scoepd 属性， 那么很可能会造成样式类名冲突。 
举个例子：

你有两个组件，仅背景样式不同:

```js
// compa,js
import './compa.css';
const foo = document.createElement('div');
foo.className = 'foo';

document.body.appendChild(foo);

// ./compa.css
.foo {
  width: 200px;
  height: 300px;
  background-color: lightcoral;
}
```

```js
// compb.js
import './compb.css';
const foo = document.createElement('div');
foo.className = 'foo';

document.body.appendChild(foo);

// ./compb.css
.foo {
  width: 200px;
  height: 300px;
  background-color: lightgreen;
}
```

引入这两个组件

```js
// index.js
import './src/components/compa.js';
import './src/components/compb.js';
```

```html
<!--index.html-->
<script src="index.js" type="module"></script>
```

这时候你会发现 浏览器中这两个元素的背景颜色都是一样的，也就是有一个被覆盖掉了。 





通常我们是直接使用 create-vite --template vue 去搭建项目的，通常会给 style 写 scoped, 所以很少关注这个问题。 

那么 如上面的例子中， 我们直接用 vite 启动一个 vallila js 项目，都是写的纯原生 js 和 样式。 那么 vite 提供什么解决方案去解决这个样式冲突的问题呢？



其实和 React 中很相似，有一个 cssModule 的实现。 具体来说，我们将上面的示例做一下改变 ：

1. 将css文件名扩展名改为 ".module.css";

2. 将foo.className 不再静态赋值 “foo”，而是通过 引入的样式文件模块, 然后按照键值"foo"去访问

   ```js
   // compa.js 示例， compb.js 同理
   import compCss from './compa.module.css';
   const foo = document.createElement('div');
   foo.className = compCss['foo'];
   
   document.body.appendChild(foo);
   ```

   > 导入的模块类名被包装成了一个对象，并被别名拼接了一串唯一值
   >
   > ```js
   > {foo: '_foo_v840o_1'}
   > ```





### 实现原理：

vite 在解析样式文件的时候

1. 如果匹配到样式文件的扩展名以 module 结尾（module 仅是一种约定，表示需要开启css模块化）
2. 他会将你所有的类名进行一定规则的替换，（“foo” ==> "foo_v840o_1"）
3. 同时创建一个映射对象，以 “foo” 作为 key, 以 "foo_v840o_1" 作为值。
4. 将替换后的内容，塞进 style 标签里然后放入到 head 标签中
5. 将compa.module.css 内容全部抹除，替换成 JS 脚本，将创建的映射对象进行默认导出