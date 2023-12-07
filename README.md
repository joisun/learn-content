
## contents 下目录结构

contents 下目录结构应该形如：

学习主题1
  - 学习资料来源1
    - README.md // 介绍说明当前学习资源的来源等基本信息
    - code.md // 用于打开对应代码的 github 地址
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

学习主题2
...

## 学习主题X/index.md

每一个学习主题目录下，应该有一个 index.md 文件，其内容为：一个一级标题，作为生成的 sideBar 目录名称

## code.md

如果你的学习主题下面有 code 目录的时候，你应该在其同级目录下同时创建一个 code.md 文件, 这个文件复制自 “contents/.tmp/code.md”， 从而使得页面可以生成打开 github 的链接


> 实际上  code.md 的文件名是任意的

> 注意： .vitepress/config.mts 中 getSideBar 部分，由于 `excludeFolders: ["code","codes"],` 的配置，所以sideBar 部分不会解析 code 目录的

其内容为：
```
<!--@include: @/.parts/githubLink.md-->

```

## constens/.tmp 目录说明

一些便于手动copy 的模板文件


## constens/.part 目录说明

vitepress 具备在 markdown 中引入另一个 markdown 文件的功能，这里的 .part 目录下的是 markdown 片段

### contents/.parts/githubLink.md

这个文件是用于自动生成 github 链接的
其中：
```ts
<a target="_blank" :href="$github_base_url + filePath">open in vscode</a>
```
`$github_base_url` 这是个全局的 vue 变量， 它被定义在 .vitepress/theme/index.ts

```ts
...
app.config.globalProperties.$github_base_url = github_base_url
...
```


