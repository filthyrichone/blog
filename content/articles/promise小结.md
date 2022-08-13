---
title: promise小结
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [promise]
categories:
  - [es6]
date: 2021-04-02 09:54:47
author:
img:
coverImg:
summary:
---

## Promise介绍
> Promise是es6中对异步函数处理的一种新的解决方案（旧的方式：回调函数），可以处理异步操作（excuter），并获得处理的结果（then），有两种状态等待（PENDIGN）和处理完毕（ONRESOLVED/ONREJECTED）

## Promise.prototype.then
> Promise对象的处理完毕的回调函数。在then函数中返回值有三种情况：
1、异常或reject值，此时Promise对象的状态是onrejected
2、其他任意值（数字，字符串等），此时Promise状态是onresolved
3、新的Promise对象，则执行这个新的对象并将执行结果作为原promise的结果返回
```js
new Promise((res,rej)=>{
    // rej('failed')
    res('sucess')
}).then(value=>{
    // return Promise.resolve(3)
    return Promise.reject(3)
    console.log('resolve',value)
},reason=>{
    console.log('rejct',reason)
}).then(value=>console.log(value),reason=>console.log(reason))
```

## 自定义实现promise及其方法

### 实现promise构造函数以及延迟改变状态
```js

```

## 面试题

+ 多个返回值判定
```js
new Promise((resolve,reject)=>{
 reject(1)// ===>> onRejected1 1 ,onResolved2 undefined   
 resolve(2)// ===>> onResolved1 1 ,onResolved2 undefined      
}).then(value=>{
    console.log('onResolved1',value)
},reason=>{
    console.log('onRejected1',reason)
}).then(value=>{
    console.log('onResolved2',value)
},reason=>{
    console.log('onRejected2',reason)
})
```

+ catch和then链式交替连接
```js
new Promise((resolve,reject)=>{
    throw 3  // ===>>> onRejected1 3 , onResolved2 undefined , onResolved3 undefined , onResolved4 undefined
    // reject() ===>>> onRejected1 undefined , onResolved2 undefined , onResolved3 undefined , onResolved4 undefined
    //resolve()  ===>>> onResolved1 undefined , onResolved2 undefined , onResolved3 undefined , onResolved4 undefined
}).then(value=>{
    console.log('onResolved1',value)
},reason=>{
    console.log('onRejected1',reason)
    return Promise.reject(4)
}).then(value=>{
    console.log('onResolved2',value)
}).then(value=>{
    console.log('onResolved3',value)
}).catch(reason=>{
    console.log('onRejected0',reason)
}).then(value=>{
    console.log('onResolved4',value)
},reason=>{
    console.log('onRejected4',reason)
})
```
1、then的链式调用return/throw 的结果，会作为下一个状态调用函数的结果传入then的回调函数中。
2、catch和then的优先级是一样的会按照**串联顺序**依次执行。
3、如果then函数中没有第二个参数，则在promise状态由PENDING转为ONREJECTED时会**跳过没有ONREJECTED状态处理函数的then链**寻找有的then或catch回调

+ 嵌套setTimeout
```js
const p1 = _=>new Promise((res,rej)=>{
    console.log(3)
    let p = new Promise((res,rej)=>{
        console.log(7)
        setTimeout(_=>{
            console.log(5)
            res(6)
        },0)
        res(1)
    })
    res(2)
    p.then(v=>console.log(v))
})
p1().then(v=>{
    console.log(v)
})
console.log(4)
// 3 7 4 1 2 5
```

+ 与settimeout同时出现
```js
setTimeout(v=>console.log('0'),0)
new Promise((res,rej)=>{
    console.log("1")
    res()
}).then(_=>{
    console.log("2")
    new Promise((res,rej)=>{
        console.log("3")
        res()
    }).then(_=>{
        console.log("4")
    }).then(_=>{
        console.log("5")
    })
}).then(_=>{
    console.log("6")
})
new Promise((res,rej)=>{
    console.log("7")
    res()
}).then(_=>{
    console.log("8")
})
//1 7 2 3 8 4 6 5 0 
```

    