---
title: gulp使用小结
top: false
cover: false
toc: true
mathjax: false
password: 
tags:
  - [gulp]
categories:
  - [node]
date: 2021-04-06 21:50:11
author:
img:
coverImg:
summary:
---

## gulp介绍
> 1、gulp是一种类似于webpack的自动化构建工具，所有的操作均基于“流”，其本身是基于node构建的，大部分的功能以插件的形式提供。
> 2、gulp可以用来进行js、css、html、图片等等文件的打包压缩，sass、less等文件格式的转码。
> 3、gulp可以实现本地文件的实时修改实时展示，在**gulp4**中扩展了代理、html组件等功能。

## gulp常用api
|api|作用|
|---|---|
|src(path:string)|在指定的文件上创建一个流|
|src().pipe(path:string)|在此方法内执行所有扩展操作（插件的）|
|dest(path:string)|输出处理好的文件到指定的路径|
|task(name:string,handler:functoin)|创建一个任务到gulp的任务系统|
|watch(path:string,handler:function)|监视指定路径的文件，产生变化时用handler处理|
|series(...taskk:function)|依次访问任务系统中的指定任务，同步执行|
|parallel(...task:function)|同时开启任务系统中的指定任务，异步完成执行|

## gulp3
+ 常见插件
```json
"gulp-clean-css": "^4.3.0",
"gulp-concat": "^2.6.1",
"gulp-connect": "^5.7.0",
"gulp-load-plugins": "^2.0.6",
"open": "^8.0.5",
"gulp-rename": "^2.0.0",
"gulp-livereload": "^4.0.2",
"gulp-less": "^4.0.1",
"gulp-uglify": "^3.0.2",
```
|插件|作用|
|---|---|
|open|在浏览器上打开指定的文件|
|gulp-load-plugins|将gulp-开头的插件添加到一个对象上，调用返回这个对象|
|gulp-connect|开启gulp服务|
|gulp-livereload|刷新修改的文件，用于实时更新修改文件|
|gulp-rename|为还在流中的处理文件命名|
|gulp-concat|合并同类文件，例如css合并|
|gulp-uglify|压缩js文件|
|gulp-clean-css|压缩css文件|
|gulp-less|用于将less格式文件转换成css文件|

```js
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const open = require('open')

gulp.task('js',function (params) {
    return gulp.src('src/js/*.js')
    .pipe($.concat('index.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe($.uglify())
    .pipe($.rename({suffix:'.min'}))
    .pipe(gulp.dest('dist/js/'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})

gulp.task('less',function (params) {
    return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})

gulp.task('css',['less'],function (params) {
    return gulp.src('src/css/*.css')
    .pipe($.concat('build.css'))
    .pipe($.cssClean({compatibility:'ie8'}))
    .pipe($.rename({suffix:'.min'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})

gulp.task('html',function (params) {
    return gulp.src('index.html')
    .pipe($.htmlMin({collapseWhitespace:true}))
    .pipe(gulp.dest('dist/'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})

gulp.task('watch',['default'],function (params) {
  $.livereload.listen()
  gulp.watch('src/js/*.js',['js'])  
  gulp.watch(['src/css/*.css','src/less/*.less'],['css'])  
})

gulp.task('server',['default'],function (params) {
    $.connect.server({
        root:'dist/',
        port:'2333',
        livereload:true
    })
    open('http://localhost:2333/')
    gulp.watch('src/js/*.js',['js'])
    gulp.watch(['src/css/*.css','src/less/*.less'],['css'])
})

gulp.task('default',['js','css','less','html'])
```



## gulp4
> 常见插件
```json
"del": "^6.0.0",
"gulp-uglify": "^3.0.2",
"gulp-autoprefixer": "^7.0.1",
"gulp-babel": "^8.0.0",
"gulp-cssmin": "^0.2.0",
"gulp-file-include": "^2.3.0",
"gulp-htmlmin": "^5.0.1",
"gulp-sass": "^4.1.0",
"gulp-webserver": "^0.9.1"
```
|插件|作用|
|---|---|
|del|删除指定路径的文件文件|
|gulp-autoprefixer|css文件处理中自动添加前缀，例如--webkit|
|gulp-babel|转换es6语法|
|gulp-cssmin|压缩css文件|
|gulp-file-include|html处理之前，可以整合自定义的html代码片段|
|gulp-htmlmin|压缩html文件|
|gulp-sass|转化sass成css|
|gulp-webserver|创建本地服务|
```js
const gulp = require('gulp')
const del = require('del')
const { server } = require('gulp-connect')
const $ = require('gulp-load-plugins')()


const jsHandler = ()=>{
    return gulp.src('src/js/*.js')
    .pipe($.concat('index.js'))
    .pipe($.babel({
        presets:['@babel/env']
    }))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js/'))
}

const sassHandler = ()=>{
    return gulp.src('src/sass/*.scss')
    .pipe($.autoprefixer())
    .pipe($.sass())
    .pipe(gulp.dest('src/css/'))
}

const cssHandler = ()=>{
    return gulp.src('src/css/*.css')
    .pipe($.concat('index.css'))
    .pipe($.autoprefixer())
    // .pipe($.autoprefixer({
    //     browsers:'last 2 version'
    // }))
    .pipe($.cssmin())
    .pipe(gulp.dest('dist/css/'))
}

const htmlHandler = ()=>{
    return gulp.src('index.html')
    .pipe($.fileInclude({
        prefix:'@@',
        basepath:'src/components/'
    }))
    .pipe($.htmlmin({
        collapseWhitespace:true,
        removeStyleLinkTypeAttributes:true,
        remvoeScriptTypeAttribute:true,
        removeAttributeQuotes:true,//去掉不必要的属性双引号
        collapseBooleanAttributes: true,//合并boolean属性
        removeEmptyAttribute:true,//原生html空属性属性
        minifyCss:true,
        minifyJs:true,
    }))
    .pipe(gulp.dest('dist/'))
}

const watchHandler = ()=>{
    gulp.watch('src/js/*.js',jsHandler)
    gulp.watch('src/components/*.html',htmlHandler)
    gulp.watch('*.html',htmlHandler)
    gulp.watch('src/sass/*.scss',sassHandler)
    gulp.watch('src/css/*.css',cssHandler)
}

const serverHandler = ()=>{
    return gulp.src('./dist')
    .pipe($.webserver({
        host:'localhost',
        port:"5000",
        livereload:true,
        open:true,
        proxies:[
            {
                source:'/dt',
                target:'https://www.duitang.com/napi/ad/banner/list/'
            }
        ]
    }))
}

const delDistHandler = ()=>del(['./dist/'])

module.exports.sass = sassHandler

module.exports.default = gulp.series(
    delDistHandler,
    gulp.parallel(htmlHandler),
    gulp.series(sassHandler,cssHandler),
    jsHandler,
    serverHandler,
    watchHandler,
)
```
