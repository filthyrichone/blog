---
title: matery主题踩坑记录
top: false
cover: false
toc: true
mathjax: false
password: 
summary: 记录下使用matery主题遇到的坑。。。
tags:
  - [hexo-theme-matery]
  - [matery主题]
categories:
  - [hexo]
date: 2020-12-14 00:02:48
author:
img:
coverImg:
---

## 简介
使用hexo快一年了，老是遇到坑，过一段时间又忘了，再找起来又得费一番功夫，记录下免得忘记。

## prism相关的代码样式冲突，{}大括号转换的相关问题。

> hexo5.0内置了prism相关的功能，但是又和matery主题的使用相冲突，真的是坑死人了

解决方法：
1、安装hexo-prism-plugin插件
2、屏蔽掉hexo自带的代码样式功能，直接注释掉自带的prism使用插件的配置。
```yml
prism_plugin:
  mode: 'preprocess'    # realtime/preprocess
  theme: 'ghcolors'
  line_number: true    # default false
  custom_css:

# prismjs:
#   enable: true
#   preprocess: true
#   theme: 'tomorrow'
#   line_number: true
#   tab_replace: ''
```
3、设置完之后你会发现颜色样式倒是可以了，但是{和}莫名其妙的被转换成了&#123;和&#125;!!!本想就这样放着，可我有老师忘不掉这个，而且他还影响阅读代码，真是要了命了。通过google大概知道了这个问题就是prism和hexo5自带的prism冲突引起的，解决办法有两个(原文地址)[https://github.com/blinkfox/hexo-theme-matery/issues/503]：
    + 退回hexo4然后清除public文件重新生成
    + 删除hexo-prism-pluging插件
像我这样懒得人怎么可能会回退版本！删除插件代码高亮又称问题，于是我看了下hexo-prism-plugin的依赖代码，在他的index文件中的map中添加了大括号的匹配。
```js
const map = {
  '&#123;': '{',
  '&#125;': '}',
  '&#39;': '\'',
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<',
  '&quot;': '"'
};
```
大功告成！！！，缺点是升级依赖可能就失效，还得重新改代码，算了就这样吧，睡觉咯！