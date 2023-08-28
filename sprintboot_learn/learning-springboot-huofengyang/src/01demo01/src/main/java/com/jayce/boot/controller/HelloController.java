package com.jayce.boot.controller;

import com.jayce.boot.bean.Car;
import com.jayce.boot.bean.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 通过@Controller注解
 * 告知Spring Boot 这是一个Controller
 */
//@ResponseBody//我们要以字符串的形式返回响应给浏览器，所以需要@ResponseBody注解
@Controller
//@RestController// 封装了@ResponseBody,@Controller, 所以这里可以直接缩写，Ctrl + 点击 可以进入查看到
public class HelloController<car> {
    //我们要返回一个字符串给浏览器
    @RequestMapping("/")//通过@RequestMapping映射请求路由
    public String handle01() {
        return "index";
    }

    @Autowired
    Car car;

    @RequestMapping("/car")
    public Car handle02(){
        return car;
    }

}
