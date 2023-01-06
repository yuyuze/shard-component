---
category: Components
type: 基础
title: Font
subtitle: 文本
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/text.svg
---

## 概述

1. 与传统css方式引入相比，开发人员不需要去在原有的样式文件中找到对应有哪些字体包被引入了项目，而是通过插件的形式，去动态引入想要的组件。
2. 将字体包的内容放在了服务器上，大大减少了打包的时间、极大优化了打包文件的体积，并且可以根据项目的环境变量去动态改变加载的远程路径，这个方式在不能引用公司服务器的字体包的情况下，能快速的去构建我们所需要的字体包，提高了开发的效率。
3. 可以更加直观的看出该项目引用了哪些字体。

## 引入方式

```js
import { Font } from 'shard/vcFont/index.d';
import vcFont from 'shard/vcFont';

const app = createApp(App);
// 字体库引入
app.use(vcFont, [
  Font.ALiHanYi,
  Font.PingFang,
  Font.pangmengzhengdao,
  Font.Din,
  Font.DIGITAL
]);
```

### 字体包引入地址
- 默认在http://ys.hztujing.com:9999/IMSystemV/tjgis/font/ttf地址
- 在Vite的环境下可以配置在`VITE_FONT_URL`的环境变量中

## API

暂无
