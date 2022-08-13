---
title: comonjs与ES6的文件导入导出比较
date: 2020-09-20 17:22:04
cover: true
author: Mr.H
img: https://i.loli.net/2020/10/30/iwAXs3CUhHK2xvW.jpg
tags:
- [CommonJS模块化加载]
categories:
- [es6]
- [node]
---

## 简介
es6的模块化加载和node服务端的模块化加载，他们的关键字比较相近，而且在webpack打包的项目中，两种方式的模块化引用都是有效的，为了便于区分，小结了一下。
<!-- more -->

## CommonJS模块化加载
> 只有在运行时才会加载（同步加载），而且是加载整个路径的文件生成一个对象，然后再从这个对象中解构赋值给要查找的属性,例如：
```js
let {a,b} = require('fs')
//等同于
let _fs = require('fs')
let a =  _fs.a
let b =  _fs.b
```
### 导出
1、导出单个对象时，给modules.exports对象直接赋值即可
2、导出多个对象时，使用关键字exports，将其看成对象，增加属性（为属性赋值）
**exports关键字只是modules.epxorts的引用，直接给exports赋值不会改变导出结果**
### 导入require（）函数
1、运行时加载且为同步加载。
2、优先从缓存加载，重复文件不回加载。
3、循环加载时不会将父文件完整加载，而是只加载到调用自身时为止的内容，避免循环产生。
4、路径可为运行时才可得到的结果。

## ES6模块化加载
> 静态化思想，**编译时**就确定模块关系，即在模块内就指定要加载模块，运行时使用import加载指定的模块 
```js
//import {a,b} from 'fs'
```
**fs文件可以不写后缀需要在webpack中配置说明**

### export命令
> 常见写法
```js
export var a = 1;
export var b = 'jack';
//相当于
var a = 1;
var b = 'jack'
export {a,b};
//函数或类
export function exportFunc(){...}
export class exportClass {...}
//使用as关键字为导出变量重命名,同一个导出变量可有多个不同名称的输出
var a = 'jack'
export {a as summer,a as peter};
```

+ 通过export与import关键字进行导入导出，实际上就是导出了代码的引用到对应位置，因此他的数据是可变的（实时的）
```js
//100ms之后导出的a的值会变成'change'
var a = 'origin'
setTimeout(_=>{a = 'change'},100)
export {a};
```

+ 因为静态时确定模块导入/出关系，export关键字不可放在函数中，导出/导入表达式中不可有运行之后才有明确结果的变量成分

+ 导出的结果为一个对象类型，若没有指定default导出，则不可单独导出其他类型

### import关键字
> 常见写法
```js
import {a,b} from './exprot.js'
//可为导入的成员重新命名
import {a as c,b as d} from './exprot.js'
//导出变量如果不是对象，不可赋值（只读），是对象也不推荐赋值，影响代码维护
import { a} form 'export.js'
a = XXX——错误（不推荐）的写法
```

+ 多次调用一个导入文件，等同于引用一个导出的多个被选引用，会自动合并相同引用例如
```js
import { foo } from 'my_module';
import { bar } from 'my_module';
// 等同于
import { foo, bar } from 'my_module';
```

+ 不要和CommonJS的模块加载混用，CommonJS是运行时加载会出问题

### 特殊导入/导出
1、导入*——将整体导入成一个对象（但不可为对象属性赋值），可用as重命名
```js
import * as circle from './circle';
// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

2、默认导入关键字default——导出default名称的变量，导入时可自由命名，不用使用as
> 常见写法
```js
//导出命名函数——同导出匿名函数一样，名称无用，导入时自用命名
exprot default function f(){...}
//等同于
exprot default function (){...}
//导入时不用加{}
import anyname from 'default.js'

//上述操作等同于
var something= '...'
exprot {something as default} 
import {default as anyname}
```

+ 默认导入/导出可与导出对象叠加使用
```js
//导出
eport default function (obj) {···}
export function each(obj, iterator, context) {...}
export { each as forEach };
//导入
import _, { each, forEach } from 'export.js';
```

3、合并import+export做转发or重命名or模块继承（添加完善）
```js
//模块转发
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };

//模块转发并重命名
export * as ns from "mod";
// 等同于
import * as ns from "mod";
export {ns};

//模块继承（*号表示非默认default导出的对象）
export * from 'circle';//不包括default默认导出
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}

//引用修改（加强）的模块
import * as math from 'circleplus';
import exp from 'circleplus';//上面继承模块默认导出的对象引用（函数）
console.log(exp(math.e));   
```

### import（）函数
> es2020添加了类似require的动态加载模块功能，返回一个promise对象，而加载成功则引用模块作为对象参数返回给回调函数
```js
//常见写法
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
//导入模块后直接解构获取值
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
//获取默认导出
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
//默认导出的具名形式
import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});
```
> 总结特点：1、加载路径可变，动态加载引用2、可在函数内使用3、异步加载