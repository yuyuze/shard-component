---
category: Components
type: 布局
title: Group
subtitle: 组
cover: https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg
---

## 概述

Group 的概念类似于 List ，但 List 以数据为导向，渲染每一条数据，也就是一条对应一列，但如果需要 3，4 条数据为一列的时候， List 就解决不了。
为了解决这个问题 Group 则应运而生

## API

### Scroll

| 参数      | 说明           | 类型                                                                               | 默认值 | 版本  |
| --------- | -------------- | ---------------------------------------------------------------------------------- | ------ | ----- |
| width     | 宽度           | number \| string                                                                   | 100%   | 0.0.3 |
| height    | 高度           | number \| string                                                                   | -      | 0.0.3 |
| spacing   | 间距           | number \| string \| [上下, 左右]                                                   | -      | 0.0.3 |
| align     | 横轴排列 ↔     | baseline \| center \| start \| end \| stretch                                      | center | 0.0.3 |
| justify   | 纵轴排列 ↕     | start \| end \| center \| space-around \| space-between \| space-evenly \| stretch | -      | 0.0.3 |
| inline    | 转变为行内元素 | number \| string                                                                   | false  | 0.0.3 |
| direction | 排列方向       | row \| row-reverse \| column \| column-reverse                                     | row    | 0.0.3 |
| wrap      | 是否换行       | wrap \| nowrap                                                                     | nowrap | 0.0.3 |
| cls       | class 名称     | string                                                                             | -      | 0.0.3 |
| padding   | css 的 padding | array                                                                              | []     | 0.0.3 |
| bg        | background     | string                                                                             | -      | 0.0.3 |
