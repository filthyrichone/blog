---
title: ts入门
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [typescript基础]
categories:
  - [ts]
date: 2021-06-03 13:35:23
author:
img:
coverImg:
summary:
---

### webpack配置ts

+ webpack.config.js文件配置如下：
```json
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.ts'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './www/index.html')
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/, use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["@babel/preset-env", {targets:{chrome:"88", ie: '11'}, corejs: '3', useBuiltIns: 'usage'}],
                            ]
                        },
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/, use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browser: 'last 2 version',
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader',
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias:{
            '@': path.join(__dirname, './src'),
        },
        extensions: ['.ts','.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        environment: {
            arrowFunction: false,
        }
    },
    // devServer: {

    // }
}
```

+ ts.config.json文件配置：
```json
{
    "include": [
        "./src/**/*",
    ],
    "exclude": [
        "./node_modules/",
        "./dist",
    ],
    "compilerOptions": {
        "target": "esnext",
        "module": "esnext"
    }
}
```

### 类型

#### 类型申明
> 共有12种类型的申明

|类型|例子|描述|
|---|---|---|
|number|1,1.000|数字|
|string|'any',"any",`any`|字符串|
|boolean|true、false|布尔值|
|字面量|其本身|变量的值只能是指定的值|
|any|任意类型|任意类型|
|unknow|任意类型|类型安全的任意类型|
|void|undefined（空值）|返回值为空undefined，多用于方法|
|never|没有值|永远不会返回任何值，多用于方法|
|object|{name:'jack'}|对象|
|array|[1,2,3]|数组|
|tuple|[string,number]|ts新增，固定长度的数组,可以复合其他类型|
|enum|enum{A,B}|枚举，ts新增类型|

### 编译

#### 编译方式

+ 命令行直接tsc filename -w（监视文件变化动态编译）
+ tscofig.json文件配置项目编译
|配置项|释义|例子|
|---|---|---|
|include|配置要编译的文件路径|"include":["./src/**/*",]|
|exclude|配置不要ts编译器编译的文件|"exclude": ["./node_modules/","./dist/",]|
|files|配置具体要编译的文件名称列表|"files": ["other.ts"]|
|extends|配置要继承的配置文件，会将继承文件的配置添加到配置文件|"extends": "./tsconfig.base.json",|
|compilerOptions|配置编译器选项|{配置项较多，不一一展开}|

|compilerOptions配置项|释义|例子|
|---|---|---|
|target|配置ts编译器转换成js的版本|target:"es6"|
|module|配置ts转换的模块规则（commonjs、amd。。。）|module:"es6"|
|removeComments|是否移除注释|removeComments:true|
|allowJs|是否编译js文件|allowJs:true|
|checkJs|是否检查js文件语法|checkJs:true|
|outDir|配置编译文件的导出文件路径位置|outDir:"dist"|
|outFile|配置编译文件的导出文件名称（将所有的编译文件导入到一个文件中）|outFile:"./dist/outfile.js"|
|noEmit|是否生成编译好的文件|noEmit:true|
|noEmitOnError|是否在编译出错时生成编译文件|noEmitOnError:true|
|strict|编译文件是否使用严格模式总开关|strict:true|
|alwaysStrict|是否使用严格模式（有export/import关键字的默认使用严格模式）|alwaysStrict:true|
|noImplicitAny|是否允许使用any|noImplicitAny:true|
|noImplicitThis|是否允许无类型申明的this|noImplicitThis:true|
|strictNullChecks|是否严格检查变量为null的情况|strictNullChecks:true|

**注意：**演示用ts的检查，设置strict为true即可，规范代码。

### 语法

+ 接口类型指定type

+ 封装：private+_property+get/set

```ts
//对象的get、set方法
class person  {
    name: string;
    private _age: number;
    constructor(name: string,age: number){
        this.name = name;
        this._age = age;
    }
    public get age(): number{
        return this._age;
    }
    public set age(age: number){
        if(0 < age){
            this._age = age;
        }else{
            throw new Error('cannot set age to this number!!!');
        }
    }
}
```

+ 泛型


