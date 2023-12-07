---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc 

hero:
  name: "sunzy.learn"
  text: "personal learning content"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---


<img style="margin:2rem 0" src="https://count.getloli.com/get/@:sunzy_learn?theme=rule34" alt="Jayce" />

## contents 下目录结构

contents 下目录结构应该形如：
```bash
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

```

## 学习主题X/index.md

每一个学习主题目录下，应该有一个 index.md 文件，其内容为：一个一级标题，作为生成的 sideBar 目录名称

## code.md

如果你的学习主题下面有 code 目录的时候，你应该在其同级目录下同时创建一个 code.md 文件, 这个文件复制自 “contents/.tmp/code.md”， 从而使得页面可以生成打开 github 的链接



