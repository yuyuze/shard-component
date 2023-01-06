---
category: Components
type: 基础
title: Iconfont
subtitle: 图标
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/text.svg
---

## 概述
快速的生成一个Iconfont矢量图,基于SVG图标引入的方式实现的，目前只支持svg的引入。

## 操作流程
![操作流程](http://ys.hztujing.com:9999/demo/VC-DOC/img/Snipaste_2022-11-14_15-34-56.png)

[阿里巴巴矢量图官方地址](https://www.iconfont.cn/)

## API
| 参数      | 说明            | 类型    | 默认值     | 版本    |
| --------- |---------------|-------|---------|-------|
| width     | svg 的宽(不代表大小) | number \| string  | auto  | 0.0.3 |
| height    | svg 的高(不代表大小) | number \| string  | auto      | 0.0.3 |
| boxCls   | 外部盒子的类名       | string[]\| string  | -     | 0.0.3 |
| color     | 颜色(在 iconfont 官网上去色才能生效)          | string | -       | 0.0.3 |
| style   | svg的样式        | string[]\| string  | -      | 0.0.3 |
| href    | 引入svg 名称（带#）       | string | -       | 0.0.3 |
| size | 图标大小          | string\| number\ |small(12px)\|middle(16px)\|large（24px）                                  | small    | 0.0.3 |

