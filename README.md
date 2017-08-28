# github-ranking

> Vue.js打造的GitHub排行榜

## Build Setup

``` bash
npm install -----安装依赖

npm run dev -----运行

npm run build -----打包

node prod.server.js -----打包后运行
```

博客地址：http://www.qirenji.info/2017/07/20/Vue-js打造的GitHub排行榜/

## 前言
爬虫简单小练习，利用Node js对github项目进行爬虫，对github各种类项目进行按🌟star数目进行排序。

## 实现功能
- [x] github爬取 -- 完成
- [x] 项目主页显示 -- 完成
- [x] 项目切换 -- 完成

## 预览
在线预览地址 👉 http://60.205.181.124:18001/

**首页**

<img src="http://www.qirenji.info/img/github-ranking/index.png" width="320">

**侧边栏项目切换**

<img src="http://www.qirenji.info/img/github-ranking/aside.png" width="320">


## 技术栈
- **Vue2.0**：前端页面展示。
- **Vue-cli**：vue手脚架工具。
- **axios**：向后端发起请求。
- **cheerio**：快速、灵活、实施的jQuery核心实现，抓取页面内容很方便。
- **ES6**：箭头函数、promise等语法很好用。
- **Webpack**：vue-cli自带Webpack，添加sass相关loader，其他vue-cli已经配置好了webpack，你只需要安装依赖就可以，使用的时候只需要<style lang="scss"></style>。
- **SASS(SCSS)**：用SCSS做CSS预处理语言。
- **flex**：flex弹性布局，简单适配手机、PC端。
- **CSS3**：CSS3过渡动画及样式。


## 总结

1. 每次现爬取github等待时间较长，可以使用缓冲，加快访问速度。使用json数据文件存到服务器，等有用户访问的时候读取该文件，活着使用redis缓存工具来解决此问题。
2. 异步操作很好用，但也容易出错！熟练掌握Promis等方法，提高效率。

## About
关于我: http://www.qirenji.info/about

GitHub: https://github.com/qirenji/

E-mail: lyf@qirenji.com
