---
title: bom和dom
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [bom,dom]
categories:
  - [html]
date: 2021-08-09 22:45:51
author:
img:
coverImg:
summary:
---

### bom和dom对象


![图中1234都是bom区，5是dom区](/images/html/bomAndDomArea.png)
区别：BOM是浏览器提供的对象（所以实现不同，ie），通常包含页面上可视范围的：滚动条、右键菜单、底部状态栏、顶部的收藏夹、地址栏等固定部分，而DOM是文档对象，均要实现W3C的标准。


![bom和dom对象的联系](/images/html/bomAndDom.png)

联系：BOM通常包含DOM，例如可以使用window.document来访问DOM的根节点document对象。
