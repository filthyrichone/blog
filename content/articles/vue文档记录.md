---
title: vue文档记录
date: 2020-09-25 10:51:57
author: Mr.H
img: https://i.loli.net/2020/10/25/qkY3r56TaCnRcgI.jpg
tags:
- [vue文档]
categories:
- [vue]
---

## 简介
开始重新阅读vue官方文档，记录下重点内容，加强理解和记忆。
<!-- more -->

### 计算属性computed
1、使用场景：模板内表达式的复杂计算

2、特性：响应式计算（不重复计算相同值，缓存响应式的依赖，即data中的值改变才重新计算，否则使用缓存值）优于方法和watch监听属性

示例：
···js
var vm = new Vue({
    data:{
        firstname:'foo',
        lastname:'bar'
    },
    computed:{
        fullname(){
            return this.firstname+'  '+this.lastname
        }
    },
    template:`
        <div>{{fullname}}</div>
    `
}).$mount('#app')
···

3、自定义setter方法：一般计算属性默认只有getter方法，但支持添加setter方法，example
···js
...
computed:{
    fullname:{
        get:function(){
            return this.firstname+' '+this.lastname
        },
        set:function(newVal){
            let nameArr = newVal.split(' ')
            this.firstname = nameArr[0]
            this.lastname = nameArr[nameArr.length-1]
        }
    }
}
...
//改变fullname则会调用setter方法
vm.fullname = 'jack ma'
···

### 

