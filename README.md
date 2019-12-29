# feed-my-baby

## 简介

由于孩子是混合喂养，记录她吃多吃少变成了宝妈的一项日常工作。之前都是用笔记本记，为了让她更方便，私心上也作为一个练手项目，于是写了这个小程序。

## 特色
本项目基于 [WePY2](https://wepyjs.github.io/wepy-docs/2.x/) 框架进行开发，使用了 [pug](https://pugjs.org/api/getting-started.html) 和 [scss](https://sass-lang.com/documentation/syntax) 。同时对页面元素都进行了组件化封装，EventBus 和 Vuex 也用上了。联网方面直接使用微信的[云开发](https://developers.weixin.qq.com/minigame/dev/wxcloud/basis/getting-started.html)。

比较遗憾的是没有用上 [Typescript](https://www.typescriptlang.org) ，用官方的编译插件一直有问题。

## 使用方式

1. 克隆项目： `git clone git@github.com:Luobro/feed-my-baby.git`
2. 进人项目并安装依赖： `cd feed-my-baby && npm install`
3. 构建项目： `npm run build`
4. 导入微信开发者工具
5. 申请并替换云开发环境
6. 开发时使用： `npm run dev`

**重要** 截至我开发时使用的 2.0.0-alpha.9 版本，wepy2 仍有一些 bug。遇到比较有影响的是 [#2414](https://github.com/Tencent/wepy/issues/2414) ，偶尔会导致程序卡死。有两个解决办法：1. 去官方的 GitHub 主页上下载最新的代码；2. 打开 node_modules/@wepy/core/dist/wepy.js 把错误的代码修正掉。具体代码如下：

```javascript
// node_modules/@wepy/core/dist/wepy.js 第2360行
if (!isComponent) {
    vm.$root = vm;
    vm.$app = app;
}

=>

vm.$app = app;
if (!isComponent) {
    vm.$root = vm;
}
```
