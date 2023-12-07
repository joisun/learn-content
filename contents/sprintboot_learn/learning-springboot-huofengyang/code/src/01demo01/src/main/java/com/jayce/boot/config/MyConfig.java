package com.jayce.boot.config;

import com.jayce.boot.bean.Car;
import com.jayce.boot.bean.Pet;
import com.jayce.boot.bean.User;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.*;

@Configuration(proxyBeanMethods = false)// 告诉SpringBoot 这是一个配置类 == 配置文件
@EnableConfigurationProperties(Car.class)// 1.开启Car 的配置属性绑定功能 2.把Car这个组件自动注册到容器中
public class MyConfig {
    @Bean// 给容器中添加组件，以方法名作为组件的id, 返回类型就是组件类型。 返回的值，就是组件在容器中的实例
    public User user01(){
        return new User("zhangsan",18);
    }
    @Bean
    public Pet tomcatPet(){
        return new Pet("tomcat");
    }
}

