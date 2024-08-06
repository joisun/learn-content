package com.jayce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//这个注解, 修饰范围，只能用在入口类 （这个注解在项目中只能出现一次）
//其作用是 : 标识这个类是一个springboot的入口类，他是启动整个springboot项目的总入口
@SpringBootApplication
public class SpringbootDay1Application {
    public static void main(String[] args) {
        //启动springboot应用的方法， 参数1： 指定入口类的类对象 2.main函数的参数
        SpringApplication.run(SpringbootDay1Application.class,args);
    }
}
