---
title: vue-cli使用
date: 2020-09-26 19:22:10
author: Mr.H
img: https://i.loli.net/2020/10/25/7rvCmga6xAekPfB.jpg
tags:
- [vue-cli]
categories:
- [vue]
---
## 简介

用于vue-cli的升级较快，记录下变化
<!-- more -->

## 安装

```bash
#全局安装
npm install -g @vue/cli
#升级项目中的cli相关模块
#vue  upgrade [options] [plugin-name]
#（试用）升级 Vue CLI 服务及插件
#选项：
  -t, --to <version>    升级 <plugin-name> 到指定的版本
  -f, --from <version>  跳过本地版本检测，默认插件是从此处指定的版本升级上来
  -r, --registry <url>  使用指定的 registry 地址安装依赖
  --all                 升级所有的插件
  --next                检查插件新版本时，包括 alpha/beta/rc 版本在内
  -h, --help            输出帮助内容
```

## 初始化

```bash
vue create [options] <app-name>
#创建一个由 `vue-cli-service` 提供支持的新项目
#选项：
  -p, --preset <presetName>       忽略提示符并使用已保存的或远程的预设选项
  -d, --default                   忽略提示符并使用默认预设选项
  -i, --inlinePreset <json>       忽略提示符并使用内联的 JSON 字符串预设选项
  -m, --packageManager <command>  在安装依赖时使用指定的 npm 客户端
  -r, --registry <url>            在安装依赖时使用指定的 npm registry
  -g, --git [message]             强制 / 跳过 git 初始化，并可选的指定初始化提交信息
  -n, --no-git                    跳过 git 初始化
  -f, --force                     覆写目标目录可能存在的配置
  -c, --clone                     使用 git clone 获取远程预设选项
  -x, --proxy                     使用指定的代理创建项目
  -b, --bare                      创建项目时省略默认组件中的新手指导信息
  -h, --help                      输出使用帮助信息
```

+ 需要使用vue-init功能，安装@vue/cli-init包即可
+ 使用图像化创建项目
```bash
vue ui
```