---
title: scroll滚动
date: 2020-09-08 14:12:08
author: Mr.H
img: https://i.loli.net/2020/10/25/CgV3zqGhY1dDQfZ.jpg
tags:
- [css-layout]
- [css布局]
categories:
- [css]
---

## 简介

简单总结一下js的ceilheight&offsetheight的关系，以及scroll的使用方法
<!-- more -->

## clientHeight&offsetHeight&scrollHeight
1、常见的scrollHeight指的就是文本要放置的最小高度，包含被滚动条遮挡的未显示的部分
![scollHeight](/images/scrollHeight.webp)

2、clientHeight指的是当前可视部分（可以直接看到的文本内容窗口大小）
![clientHeight&&offsetHeight](/images/clientHeight.webp)

3、offsetHeight则是包含了可见部分的滚动条宽度和可视文本部分

## scrollTop&&offsetTop
1、scrollTop指的是所有文本高度到可是部分的顶点的高度

2、offsetHeight指的是父级设置了position属性的节点到本节点顶部的距离，若没有设置position则默认body到元素顶部的偏移量