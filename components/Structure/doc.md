---
category: Components
type: 布局
title: Structure
subtitle: 结构
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/jiegou.svg
---

## 概述

Structure 组件名为结构，将其拆分为 `上(top)`、`下(bottom)`、`左(left)`、`中(center)`、`右(right)`，5 个方位。

这 5 个方位可以应对页面上大部分需要进行基础排版的结构性 KPI 组件

## API

### Text

| 参数    | 说明         | 类型               | 默认值 | 版本  |
| ------- | ------------ | ------------------ | ------ | ----- |
| width   | 宽度         | string \| number   | -      | 0.0.3 |
| height  | 高度         | string \| number   | -      | 0.0.3 |
| tb      | 上下距离     | Config             | 0      | 0.0.3 |
| lr      | 左右距离     | Config             | 0      | 0.0.3 |
| cls     | 盒子 Class   | number             | 0      | 0.0.3 |
| tcls    | 上 Class     | string \| string[] | -      | 0.0.3 |
| bcls    | 下 Class     | string \| string[] | -      | 0.0.3 |
| lcls    | 左 Class     | string \| string[] | -      | 0.0.3 |
| rcls    | 右 Class     | string \| string[] | -      | 0.0.3 |
| ccls    | 中 Class     | string \| string[] | -      | 0.0.3 |
| top     | 上           | VNode              | -      | 0.0.3 |
| bottom  | 下           | VNode              | -      | 0.0.3 |
| left    | 左           | VNode              | -      | 0.0.3 |
| right   | 右           | VNode              | -      | 0.0.3 |
| center  | 中           | VNode              | -      | 0.0.3 |
| block   | 变换元素     | inline \| block    | block  | 0.0.3 |
| pd      | 内边距       | number \| number[] | 0      | 0.0.3 |
| mg      | 外边距       | number \| number[] | 0      | 0.0.3 |
| align   | 上下左右排列 | string             | -      | 0.0.3 |
| justify | 中间左右排列 | string             | -      | 0.0.3 |

#### Config

```js
{
  gap: 0,
  align: '', // 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justify: '', // 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch'
}
```
