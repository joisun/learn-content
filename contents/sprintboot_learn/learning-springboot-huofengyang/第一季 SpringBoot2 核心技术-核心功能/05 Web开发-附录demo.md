

## 2.1 静态资源访问

> https://docs.spring.io/spring-boot/docs/current/reference/html/web.html#web.servlet.spring-mvc.static-content

1. 静态资源目录

   默认的， Spring Boot 会 serve 根目录([src/main/resources]())下名为 static 或者 public 或者 resources 或者 META-INF/resources 的目录，并作为资源访问目录。

   >  "By default, Spring Boot serves static content from a directory called `/static` (or `/public` or `/resources` or `/META-INF/resources`)"

   下面做一下验证：

   新建项目：

   ![2022-05-10_155511](05%20Web%E5%BC%80%E5%8F%91-%E9%99%84%E5%BD%95demo.assets/2022-05-10_155511-16522325025061.png)

   修改:[src/main/resources/application.properties](#) 为 [src/main/resources/application.yml](#).

   创建这些目录：

   ```bash
   jayce@jayce123:05demo01$ pwd
   /mnt/e/Users/jayce/Desktop/LearningContent/Spring Boot 尚硅谷-雷丰阳/src/05demo01
   jayce@jayce123:05demo01$ tree
   .
   ├── 05demo01.iml
   ├── HELP.md
   ├── mvnw
   ├── mvnw.cmd
   ├── pom.xml
   └── src
       ├── main
       │   ├── java
       │   │   └── com
       │   │       └── example
       │   │           └── boot05web01
       │   │               └── Boot05Web01Application.java
       │   └── resources
       │       ├── application.yml
       │       ├── static
       │       └── templates
       └── test
           └── java
               └── com
                   └── example
                       └── boot05web01
                           └── Boot05Web01ApplicationTests.java
   
   14 directories, 8 files
   jayce@jayce123:05demo01$ cd ./src/main/resources/
   jayce@jayce123:resources$ mkdir public resources META-INF/resources -p
   jayce@jayce123:resources$ cd -
   /mnt/e/Users/jayce/Desktop/LearningContent/Spring Boot 尚硅谷-雷丰阳/src/05demo01
   jayce@jayce123:05demo01$ tree
   .
   ├── 05demo01.iml
   ├── HELP.md
   ├── mvnw
   ├── mvnw.cmd
   ├── pom.xml
   └── src
       ├── main
       │   ├── java
       │   │   └── com
       │   │       └── example
       │   │           └── boot05web01
       │   │               └── Boot05Web01Application.java
       │   └── resources
       │       ├── META-INF
       │       │   └── resources
       │       ├── application.yml
       │       ├── public
       │       ├── resources
       │       ├── static
       │       └── templates
       └── test
           └── java
               └── com
                   └── example
                       └── boot05web01
                           └── Boot05Web01ApplicationTests.java
   
   18 directories, 8 files
   jayce@jayce123:05demo01$
   ```

   放入样例图片后直接启动主程序：

   ![image-20220510165512199](05%20Web%E5%BC%80%E5%8F%91-%E9%99%84%E5%BD%95demo.assets/image-20220510165512199.png)

   测试访问：[http://localhost:9999/a103.jpg]() 、[http://localhost:9999/a108.jpg]()  、[http://localhost:9999/a151.gif]()  、[http://localhost:9999/a158.gif]()  都可以正常访问。

   

   原理：静态映射 `/**`

   > [doc](https://docs.spring.io/spring-boot/docs/current/reference/html/web.html#:~:text=By%20default%2C%20resources%20are%20mapped%20on%20/**%2C%20but%20you%20can%20tune%20that%20with%20the%20spring.mvc.static%2Dpath%2Dpattern%20property.%20For%20instance%2C%20relocating%20all%20resources%20to%20/resources/**%20can%20be%20achieved%20as%20follows%3A)

   请求进来， 会优先去找Controller，看能不能处理，如果不能处理，就交给静态资源处理器。 静态资源会去尝试匹配上述目录下是否有对应的文件，如果有则返回，否则404.

   测试：

   ![image-20220510170644177](05%20Web%E5%BC%80%E5%8F%91-%E9%99%84%E5%BD%95demo.assets/image-20220510170644177.png)

2. 修改静态资源访问规则

   - 修改访问URL

     默认我们通过 `host + port + / + 资源名` 就能直接访问到资源了。我们可以通过修改 `spring.mvc.static-path-pattern` 值去改动资源访问的URL

     ```yaml
     server:
       port: 9999
     spring:
       mvc:
         static-path-pattern: /res/**
     ```

     ![image-20220510171801962](05%20Web%E5%BC%80%E5%8F%91-%E9%99%84%E5%BD%95demo.assets/image-20220510171801962-16521742829451.png)

   - 修改资源路径

     默认的，Spring Boot 会sccccerve 根目录([src/main/resources]())下名为 static 或者 public 或者 resources 或者 META-INF/resources 的目录。但是我们也可以修改这个规则：

     ```yaml
     server:
       port: 9999
     spring:
       mvc:
         static-path-pattern: /res/**
     
       web:
         resources:
           static-locations: [classpath:/abc/]
     ```

     <img src="05%20Web%E5%BC%80%E5%8F%91-%E9%99%84%E5%BD%95demo.assets/2022-05-11_090351.png" alt="2022-05-11_090351"  />

     