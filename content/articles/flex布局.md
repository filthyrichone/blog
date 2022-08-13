---
title: flex布局
date: 2020-05-16 18:07:12
top: true
reward: false
author: Mr.H
img: https://i.loli.net/2020/10/25/WnfSDbejVxvaN1k.jpg
tags: 
- [css布局]
categories:
- [css]
---
## 简介
**感谢阮一峰先生的分享[flex-examples](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html) 仅供个人学习**
2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。<!--more-->

>+ Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
任何一个容器都可以指定为 Flex 布局，行内元素也可以使用flex布局，跳帧位置。
```css
/*块级元素*/
display: flex;
/*行内元素*/
display: inline-flex;
```

>+ Webkit 内核的浏览器，必须加上-webkit前缀。
```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```
***注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。***

>+ flex布局的元素，称为flex container，他的所有子元素成为flex-items项目。
{% img http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png "flex-container" %}
>其中main-axis称为主轴，across-axis称为交叉轴，所有flex-item默认沿着主轴排列。单个项目占据的主轴|交叉轴空间叫做main-size|across-size

## 浏览器支持
{% img http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071003.jpg "browser Support" %}

## 属性介绍

### flex-container属性

#### flex-direction
> 可选属性，决定主轴的方向，即项目的排列方向

|值|释义|
|---|---|
|row（默认值）|主轴为水平方向，起点在左端|
|row-reverse|主轴为水平方向，起点在右端|
|column|主轴为垂直方向，起点在上沿|
|column-reverse|主轴为垂直方向，起点在下沿|

{% img http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png "flex-dirction布局样式" %}

#### flex-wrap
>1、 默认情况下所有flex-item都排列在主轴上，此属性规定超过了主轴长度后的项目排列方式
>2、可选属性：nowrap（默认）|wrap换行|wrap-reverse换行并且换行的flex-item排列在上面
如下图所示

<div style="display:flex;align-items:center;justify-content:center;">
    <div style="flex:1;">{% img http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png "flex-wrap:nowrap布局样式" %}</div>
    <div style="flex:1;">{% img http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg "flex-wrap:wrap布局样式" %}</div>
    <div style="flex:1;">{% img http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg "flex-wrap:wrap-reverse布局样式" %}</div>
</div>
#### flex-flow
>是flex-direction和flex-wrap的简写形式
```css
flex-flow:<flex-direction> || <flex-wrap>
```

#### justify-content
>1、定义了flex-item在主轴上的排列位置
>2、可选属性：flex-start（默认）左对齐|flex-end右对齐|center居中|space-between两端对齐，项目间隔相等|space-around项目间隔相等，项目直接间隔是项目与flex-container边框间隔的2倍

<div style="display:flex;align-items:center;justify-content:center;">
    <div style="flex:1;">![flex-start](/images/flex/flex-start.PNG)
        <p class="image-caption">flex-start</p>
    </div>
    <div style="flex:1;">![flex-start](/images/flex/flex-end.PNG)
        <p class="image-caption">flex-end</p>
    </div>
    <div style="flex:1;">![flex-start](/images/flex/center.PNG)
        <p class="image-caption">cener</p>
    </div>
</div>
<div style="display:flex;align-items:center;justify-content:center;">
    <div style="flex:1;">![flex-start](/images/flex/space-between.PNG)
        <p class="image-caption">space-between</p>
    </div>
    <div style="flex:1;">![flex-start](/images/flex/space-around.PNG)
        <p class="image-caption">space-around</p>
    </div>
</div>

#### align-items
>1、定义了flex-item在交叉轴上的排列位置
>2、可选属性：flex-start对齐交叉轴顶点|flex-end对齐交叉轴终点|center对齐交叉轴中心|stretch（默认）拉升高度至交叉轴高度|baseline所有的flex-items的第一行文字基线

<div style="display:flex;align-items:center;justify-content:center;">
    <div style="flex:1;">![flex-start](/images/flex/ai-flex-start.PNG)
        <p class="image-caption">align-items:flex-start</p>
    </div>
    <div style="flex:1;">![flex-start](/images/flex/ai-flex-end.PNG)
        <p class="image-caption">align-items:flex-end</p>
    </div>
    <div style="flex:1;">![flex-start](/images/flex/ai-center.PNG)
        <p class="image-caption">align-items:cener</p>
    </div>
</div>
<div style="display:flex;align-items:center;justify-content:center;">
    <div style="flex:1;">![flex-start](/images/flex/ai-stretch.PNG)
        <p class="image-caption">align-items:stretch</p>
    </div>
    <div style="flex:1;">![flex-start](/images/flex/ai-base-line.PNG)
        <p class="image-caption">align-items:baseline</p>
    </div>
</div>
#### align-content 
>1、定义多轴线（多行？）的对齐方式，单一轴线不起作用
>2、可选参数：flex-start|flex-end|center|space-bewteen|stretch|around

{% img http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png 280 "align-content样式图" %}

### flex-items属性

#### order
>设置flex-item的显示位置，数字越小越靠前，类似于grid布局的grid-column|row-start|end属性设置

![设置第四个order数值最小](/images/flex/fi-order.PNG)

#### flex-grow
>1、当以当主轴空间大于实际需要时，放大的比例，默认为0，即不放大
>2、如果其他属性设置为1，当前设置为2，则当前项目是其他项目的两倍main-sie

![flex-grow:2的flex-item](/images/flex/fi-flex-grow.PNG)

#### flex-shrink
>1、定义当主轴空间不足时，flex-item的缩小比例
>2、如果设置属性值为0，其他flex-item属性值为1则当空间不足时，不会缩小此flex-item

![browser-spport](/images/flex/fi-flex-shrink.PNG)
<p class="image-caption">属性flex-shrink:0的flex-item不会缩小</p>

#### flex-basis
>1、规定再分配多余的空间之前，flex-item占据main-size的大小，浏览器根据占据的main-size计算是否长度充足
>2、默认为auto，及项目本来大小，设置大小：n+px，flex-item将始终占据指定大小main-size
```css
/*默认*/
flex-basis:auto;
/*自定义*/
flex-basis:300px;
```
![默认值auto，即为原本main-size](/images/flex/fi-flex-basis.PNG)

#### flex
>1、是flex-grow&flex-shrink&flex-basis的简写形式
>2、特殊样例 auto = 1 1 auto && none = 0 0 auto

#### align-self
>1、默认是auto，即继承inherit父类即align-items的设置，但是可以单独设置样式来覆盖父类样式，没有父元素则属性值为stretch
>2、可选属性值与align-items相同，用法相同，作用域只限于当前的flex-item

![单独设置align-self:flex-end属性图](/images/flex/fi-align-self.PNG)