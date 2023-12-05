package com.jayce.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//最简单的测试控制器
//注意： springboot项目启动默认没有项目名。
// 测试地址：http://localhost:8080/hello
@RestController
public class HelloController {
    @RequestMapping("hello")
    public String hello(){
        System.out.println("hello springboot....");
        return "hello springboot";
    }
}
