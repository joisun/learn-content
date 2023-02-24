[TOC]

## Spring 与 Spring Boot

### 1. Spring(Spring framework) 能做什么 ？

Spring 的生态非常广泛，我们通常谈及的只是 Spring Framework.

Spring Boot 的底层，是 Spring Framework。 Spring Framework 配置繁琐且庞多。 Spring Boot 是其解决方案。

### 2. 为什么要用Spring Boot ?

Spring Boot 帮助我们能快速创建出生产级别的应用，SpringBoot 是整合Spring技术栈的一站式框架，是简化Spring技术栈的快速开发框架。

#### 2.1 SpringBoot 优点

它有以下优点：

1. 创建独立Spring 应用#Create stand-alone Spring application
2. 内嵌web服务器#Embed Tomcat, Jetty or Undertow directly(no need to deploy war files)
3. 自动starter 配置，简化构建配置#Provide opinionated 'starter' dependencies to simplify your build configuration
4. 自动配置Spring以及第三方功能#Automatically configure Spring and 3rd party libraries whenever possible
5. 提供生产级别的监控，健康检查以及外部配置# Provide production-ready features such as metrics, health checks, and externalized configuration
6. 无代码生成，无需编写XML#Absolutely no code generation and no requirement for XML configuration.



#### 2.2 SpringBoot 缺点

1. 迭代快
2. 封装太深，内部原理复杂，不容易精通。



### 3. 时代背景

#### 3.1 微服务

- 微服务是一种架构风格
- 一个应用拆分为一组小型服务
- 每个服务运行在自己的进程内，也就是可以独立部署和升级
- 服务之间使用轻量级HTTP交互
- 服务围绕业务功能划分
- 可以由自动部署机制独立部署
- 可以由全自动部署机制独立部署
- 去中心化，服务自治。服务可以使用不同的语言、不同的存储技术



微服务将大型服务拆分为独立部署的小服务，也就被成为分布式系统。

#### 3.2 分布式

**分布式困难**

- 远程调用：各个服务之间的相互调用
- 服务发现: 同服务可能部署多台机器，那么到底去调用哪里的服务？
- 负载均衡: 怎么均衡服务压力？
- 服务容错: 各种条件导致的服务调度失败怎么解决
- 服务监控: 健康状况
- 链路追踪
- 日志管理
- 任务调度
- ......

**分布式的解决**

- SpringBoot + SpringCloud



#### 3.3 云原生（略）

### 4 如何学习 Spring Boot ?

官方文档 https://docs.spring.io/spring-boot/docs/current/reference/html/index.html

里面可以下载到 PDF 版本文档