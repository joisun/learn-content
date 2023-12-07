
contents 下目录结构应该形如：

学习主题1
  - 学习资料来源1
    - code: 代码code base
        - codebase1
        - codebase2
        - ....
    - node: 笔记 base
        - 笔记1
        - 笔记2
        - ...
  - 学习资料来源2
  - 学习资料来源3
  - ...

你应该在每一个 codebase 下面，如果需要支持跳转到对应的在线 vscode 编辑器时，应该定义文件：`codebaseX/README.md`
其内容为：

```
<!--@include: @/.parts/vscodeLink.md-->

```



## constens/.part 目录说明

vitepress 具备在 markdown 中引入另一个 markdown 文件的功能，这里的 .part 目录下的是 markdown 片段

### contents/.parts/vscodeLink.md

这个文件是用于自动生成 vscode 编辑器链接的
其中：
```ts
<a target="_blank" :href="$vscode_base_url + filePath">open in vscode</a>
```
`$vscode_base_url` 这是个全局的 vue 变量， 它被定义在 .vitepress/theme/index.ts

```ts
...
app.config.globalProperties.$vscode_base_url = vscode_base_url
...
```


