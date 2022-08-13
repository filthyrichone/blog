---
title: js中的常用数组操作函数
top: false
cover: false
toc: true
mathjax: false
password: 
summary: 
tags:
  - [Array]
  - [数组常用api]
categories:
  - [js]
date: 2020-10-31 15:25:53
author: Mr.H
img: https://i.loli.net/2020/10/31/rsgCwVzE9xRYW1Q.jpg
coverImg:
---

## 简介
使用jQuery框架时要对数组元素进行操作，突然忘了该如何入手，借着这个机会总结下常见的数组操作方法。

## Array原型链上的数组操作属性
Array对象原型上有很多操作数组的属性，功能十分强大
### 操作数组元素

#### pop
> Array.prototype.pop()方法删除数组的最后一个元素,返回删除的值
```js
const arr = [1,3,4]
arr.pop()
> 4
```
>+ 空数组上使用返回undefined
>+ 可用在类数组元素上，和push相同根据length确定组后一个元素位置，没有或不能转换length属性为数值则从**下标0**开始
#### push
>+ Array.prototype.push(ele1,ele2,ele3...)方法将一个或多个元素添加到数组的最后,返回添加元素后的数组的长度
>+ 可通过call/apply作用于有length属性的类数组对象上
```js
const animals = ['pigs', 'goats', 'sheep'];
animals.push('bird','duck','cat')
> 6
//animals = ["pigs", "goats", "sheep", "bird", "duck", "cat"]
```
+ 合并两个数组
```js
const animals1 = ['dog','fox','cow']
Array.prototype.push.call(animals,...animals1)
> 9
//animals = ["pigs", "goats", "sheep", "bird", "duck", "cat", "dog", "fox", "cow"]
```
+ 处理类数组元素，**不可使用箭头函数**，会把this绑定到window上
```js
var a = {
    length:0,
    add(ele){
        [].push.call(this,ele)
    }
    // add:e=>[].push.call(this,ele)错误的写法
}
a.add('jack')
// a = {0: "jack", length: 1, add: ƒ}
```

#### shift
>+ Array.prototype.shift()方法删除数组的第一个元素，并返回他的值，
>+ 可通过call/apply作用于有length属性的类数组对象上
```js
const a = [1,3,5]
a.shift()
> 1
// a = [3,5]
```

#### unshift
> Array.prototype.unshift(ele1,ele2,ele3....)方法一个或多个元素添加到数组的**开头**,并返回新的数组的**长度**
```js
const array1 = [1, 2, 3];
array1.unshift(-2,-1)
> 5
```

#### splice
> Array.prototype.splice(start[, deleteCount[, item1[, item2[, ...]]]])方法是使用的较多的数组操作函数，它既可以在指定下标添加/删除/替换数组元素。

```js
const months = ['Jan', 'March', 'April', 'June'];
// 删除指定下标（start）开始的delecteCount个元素
months.splice(1, 1);
// 在指定下标之前（start）添加元素
months.splice(1, 0, 'Feb');
// 替换指定下标的（start）元素
months.splice(1, 1, 'Feb');
```

### 查找和筛选数组元素

#### includes
>+ Array.prototype.includes(valueToFind[, fromIndex])方法查询数组是否包含特定值，返回一个Boolean值
>+ fromindex默认为0，同字符串indexof方法小于0从0开始，大于0直接返回-1
>+ 可被用于类数组对象
```js
var arr = ['a', 'b', 'c'];
arr.includes('a', -100); 
> true
arr.includes('a', -2); 
> false
```
+ 类数组应用
```js
(function(a,b,c){
    return [].includes.call(arguments,2,-100)
})(1,2,4)
> true
```

#### indexOf
>+ Array.prototype.indexOf(searchValue[,fromindex=0])方法返回被查找元素首次出现的下标，没有则返回-1
>+ fromindex默认为0，**小于0时开始从后往前开始找，绝对值大于length属性则查找整个数组**，大于length属性值时直接返回-1
>+ **字符串**fromindex开始查找位置默认为0，**小于0从0开始**，大于length属性值直接返回-1（查找元素为空''时，直接返回length值）
>+ **字符串**的indexOf属性：省略searchValue，则方法强制设定他为'undefined'
+ 数组方法
```js
var array = [2, 5, 9];
array.indexOf(2);     
> 0
array.indexOf(2, -1); 
> -1
array.indexOf(2, -3); 
> 0
array.indexOf(2, 12); 
> -1
```
+ 字符串方法
```js
'undefined'.indexOf()
> 0
'asdfas'.indexOf('s',-1)
> 1
'asdfas'.indexOf('s',12)
> -1
```

#### some
> Array.prototype.some(callback(e[,index[,array]]))方法查找符合参数函数条件的元素，找到即返回true，否则返回false
```js
const array1 = [1, 30, 39, 29, 10, 13];
array1.every(e=>e>0)
> true
```
> 同every一样空数组的some不管函数参数的条件如何都返回true

#### every
> Array.prototype.every(function)方法验证数组中的元素是否都满足参数function函数中的判定条件，满足返回true有一个不满足就停止执行，并返回false
```js
const array = [1, 30, 39, 29, 10, 13];
array.every(e=>e>2)
> false
```

#### filter
>  Array.prototype.filter(function)方法同every方法一样，都使用参数函数遍历数组元素，与every不同的是filter将通过function参数的数组元素，封装成新数组然后返回这个新数组。
```js
const array = [1, 30, 39, 29, 10, 13];
array.filter(e=>e>2)
> [30, 39, 29, 10, 13]
```

#### find
> Array.prototype.find(function)方法也是提供筛选函数来查找元素，第一个符合条件的数组元素后返回元素并停止执行。
```js
const array1 = [5, 12, 8, 130, 44];
array1.find(element => element > 10);
> 12
```

#### findIndex
> Array.prototype.findIndex(function)同index一样，返回结果是对应条件的数组元素下标
```js
const array1 = [5, 12, 8, 130, 44];
array1.findIndex(element => element > 10);
> 1
```

### 遍历数组元素

#### reduce
> Array.prototype.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])方法返回累计处理的结果。

|参数|释义|
|---|---|
|accumulator|累计器累计回调的返回值; 它是上一次调用回调时返回的累积值|
|currentValue|数组中正在处理的元素。|
|index|数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。|
|array|调用reduce()的数组|
|initalValue|作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。|
```js
//统计数组中值出现的次数（别忘了return你的sum值）
const array = [1, 3, 4, 3, 4, 23, 2, 1];
array.reduce((sum,cur,index,array)=>{
    if(sum[cur]){
        sum[cur]++
    }else{
        sum[cur] = 1
    }
    return sum
},{})
> {1: 2, 2: 1, 3: 2, 4: 2, 23: 1}
```
> **json对象的key值都是string**,如果给其他类型是会自动转换成string的

#### map
> Array.prototype.map(callback(ele[,index[,arrray]]))方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
> map方法只会在有值索引上被调用，从未赋值或使用delete删除过的索引不会调用回调
> 不需要返回值组成的新数组时，使用for of和forEach代替
```js
Array.prototype.map.call("Hello World", function(x) { 
  return x.charCodeAt(0); 
})
// a = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```
+ 使用map时简便写法的误区
```js
const a = ['234','12','123']
const b = a.map(parseInt)
> [234,NaN,1]
```
出现这个结果，是因为parseInt(str,radix)方法接收两个参数，而map传递的第二个参数是index，导致parseInt方法误把index当成了他的进制基数，我们可以使用**Number(str)方法**代替即可
```js
a.map(Number)
> [234,12,123] 
```

#### forEach
>1、Array.prototype.forEach(callback(currentValue [, index [, array]])[, thisArg])方法对数组的每个元素执行一次给定的函数,返回undefined或者说没有返回值。
>2、回调函数会跳过未赋值或使用delete操作的索引的调用

|参数|释义|
|---|---|
|currentValue|数组中正在处理的当前元素。|
|index|数组中正在处理的当前元素的索引。|
|array|forEach() 方法正在操作的数组。|
|thisArg|可选参数。当执行回调函数 callback 时，用作 this 的值。|
```js
//跳过index为2时的索引调用
[1,2,,4].forEach(e=>console.log(e))
> 1
> 2
> 4
```
+ 数组在迭代过程中被修改，执行调用的索引值不会变
```js
var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
});
> 'one'
> 'two'
> 'four'
```
+ 复制对象
```js
function copyObj(obj){
    let copyobj = Object.create(Object.getPrototypeOf(obj))
    let properNameArr = Object.getOwnPropertyNames(obj)
    properNameArr.forEach(name=>{
        let temppropertyDes = Object.getOwnPropertyDescriptor(obj,name)
        Object.defineProperty(copyobj,name,temppropertyDes)
    })
    return copyobj
}
const obj1 = {name:'jack'}
const copyobj = coypObj(obj1)
```
+  thisArg应用
```js
function Counter() {
  this.sum = 0;
  this.count = 0;
}
Counter.prototype.add = function(array) {
  array.forEach(function(entry) {
    this.sum += entry;
    ++this.count;
  }, this);
};
const obj = new Counter();
obj.add([2, 5, 9]);
//obj.count = 3 === (1 + 1 + 1)
//obj.sum = 16 === (2 + 5 + 9)
```
> 3、forEach方法不能在callback中终止（除非异常），使用for...in/for...of/every/some/find/findIndex方法代替

### 转换成字符串

#### join
>+ Array.prototype.join([separator])方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，如果数组只有一个项目，那么将返回该项目而不使用分隔符。
>+ null/undefined/调用对象的length属性为0时，调用此方法会被转换成空字符串'' 
```js
let a = null
a.join()
a = [12,3]
a.join('')
```
连接类数组的对象
```js
function joinarg(a,b,c){
    return [].join.call(arguments)
}
joinarg(1,3,6)
> '1,3,6'
```

#### toString
>+ Array.prototype.toString()方法覆盖了Object的toSting方法，返回一个用逗号隔开各个数组元素的字符串
>+ 和字符串拼接（+）时自动调用此方法
```js
[1, 2, 'a', '1a'].toString();
> "1,2,a,1a"
//array1 = [-2, -1, 1, 2, 3]
//字符串拼接
[1,4]+'x'
> '1,4x'
```

### 获取数组的键/值对方法

#### entries
> Array.prototype.entries方法返回一个包含每个索引的键/值对的Array iterator可迭代对象
```js
const array1 = ['a', 'b', 'c'];
for([k,v]of array1.entries())
{
  console.log(k,v)
}
>0 "a"
>1 "b"
>2 "c"
```

#### values
> Array.prototype.values()方法返回一个包含每个索引值的值的Array Iterator对象
```js
for(v of [1,2].values()){
    console.log(v)
}
> 1
> 2
``` 
#### keys
> Array.prototype.keys()方法返回一个包含数组中每个索引键的Array Iterator对象。
```js
var arr = ["a", , "c"];
//数组可以使用Object方法？
var sparseKeys = Object.keys(arr);
//先运行keys方法返回迭代对象，然后使用扩展运算符解构扩展成数组
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```
### 其他操作

#### slice
> Array.prototype.slice([begin[,end]])方法返回一个指定切割下标长度的新数组（可为原数组长度）
1、复制数组，**不能复制元素为对象的数组元素**
```js
const b = {name:'jack'}
const a = [1,2,3,b]
const c = a.slice()
c[2] = 8
c[3].name = 'summer'
console.log(a,b,c)
> [1,2,3,{name:'summer'}],{name:'summer'},[1,2,8,{name:'summer'}]
```
2、获取数组最后一个元素，**返回仍然是一个数组！！！**
```js
a.slice(-1)
> [{name:'summer'}]
```
3、剪切数组,生成新的数组
```js
a.slice(1,3)
> [2,3,{name:'summer'}]
```
> 在复制数组时，如果数组元素是对象，那么复制的数组只会复制这个对象的引用，就是说**改变复制数组仍会改变元素组**

#### concat
> Array.prototype.concat(array1,array2...)用于连接两个或多个数组
```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);
> Array ["a", "b", "c", "d", "e", "f"]
```

#### reverse
>+ Array.prototype.reverse()方法颠倒数组元素
>+ 可通过call/apply作用于有length属性的类数组对象上
```js
const array1 = ['one', 'two', 'three'];
array1.reverse();
> ["three", "two", "one"]
//类数组
const a = {0: 1, 1: 2, 2: 3, length: 3};
Array.prototype.reverse.call(a);
> {0: 3, 1: 2, 2: 1, length: 3}
```

#### sort
>+ Array.prototype.sort([compareFunction])方法默认按各个数组元素转换成字符串后的utf-16代码单元值序列排序,并返回改变了排序后的**原数组**
>+ 可选参数compareFunction(v1,v2)函数有两个必传值，可在此函数内自定义排序规则
```js
//默认排序
const array = [1,8,23,12,45]
array.sort()
> [1, 12, 23, 45, 8]
//自定义排序(降序)
array.sort((e1,e2)=>Number(e1)>Number(e2)?-1:Number(e1)<Number(e2)?1:0)
> [45, 23, 12, 8, 1]
//升序
array.sort((e1,e2)=>Number(e1)-Number(e2))
> [1, 8, 12, 23, 45]
```
> 自定义排序函数依次遍历比较数组元素时，如果函数的返回值如果相等位置不变，大于0则e1排在e2的前面，小于0反之。
## Array对象的静态方法

### from
>1、Array.from(arrayLike[, mapFn[, thisArg]]) 方法从一个类似数组或**可迭代对象**创建一个**新的**，浅拷贝的数组实例。
>2、from方法有一个可选参数 mapFn，可在最后生成的数组上再执行一次 map 方法然后再返回最终数组。即Array.from(obj, mapFn, thisArg) === Array.from(obj).map(mapFn, thisArg),
>3、from() 的 length 属性为 1 ，即 Array.from.length === 1。
>4、在 ES2015 中， Class 语法允许我们为内置类型（比如 Array）和自定义类新建子类（比如叫 SubArray）。这些子类也会继承父类的静态方法，比如 SubArray.from()，调用该方法后会返回子类 SubArray 的一个实例，而不是 Array 的实例。
```js
//strign=>array
Array.from('foo'); 
> [ "f", "o", "o" ]

//set=>array
const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set);
> [ "foo", "bar", "baz" ]

//map=>array
const map = new Map([[1, 2], [2, 4], [4, 8]]);
//map = {1 => 2, 2 => 4, 4 => 8}
Array.from(map);
> [[1, 2], [2, 4], [4, 8]]
const mapper = new Map([['1', 'a'], ['2', 'b']]);
Array.from(mapper.values());
> ['a', 'b'];
Array.from(mapper.keys());
> ['1', '2'];

//arguments=>array
function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
> [ 1, 2, 3 ]

//使用mapfn函数
Array.from([1, 2, 3], x => x + x);
> [2, 4, 6]
```
+ 数组去重合并
```js
function combin(){
    let temparr = [].concat.apply([],arguments)
    return Array.from(new Set(temparr))
}
const a = [1,3,4]
const b= [1,2,5]
combin(a,b)
> [1, 3, 4, 2, 5]
```

### of
> Array.of(element0[, element1[, ...[, elementN]]])方法返回一个新的Array数组实例
> 低版本的使用new Array创建Array实例时，只有一个参数和多个参数方法不一致，一个参数创建代表创建length为参数值的数组，多个参数代表一个数组中的各个元素，of方法解决了这个不一致的问题。
+ 解决低版本new Array时的问题
```js
Array(6)
>[empty × 6]
Array(1,2,3)
> [1, 2, 3]
Array.of(6)
> [6]
Array.of(1,2,3)
> [1,2,3]
```

+ 兼容低版本
```js
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```

### isArray
> Array.isArray(object)方法判定传入对象是否是一个数组，返回Boolean值。
```js
Array.isArray(Array.prototype)
> true
Array.isArray(Arary.__proto__)
> false
Array.isArray({length:1,name:'jack'})
```
> 于instanceof类似，检测iframe时优于instanceof
```js
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```