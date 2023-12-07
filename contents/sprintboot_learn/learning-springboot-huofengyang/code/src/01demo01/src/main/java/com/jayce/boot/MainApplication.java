package com.jayce.boot;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

/**
 * 通过@SpringBootApplication
 * 告诉spring boot
 * 这是一个SpringBoot应用
 */
@SpringBootApplication
public class MainApplication {
    public static void main(String[] args) {
        // 1. 返回IOC 容器，其中包含了当前应用的所有组件
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
//
//        boolean hehe = run.containsBean("hehe");
//        boolean haha = run.containsBean("haha");
//        System.out.println("hehe:" + hehe +  ",haha:" + haha);


    }
}
