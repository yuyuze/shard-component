---
category: Components
type: 基础
title: Scroll
subtitle: 滚动
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/scroll.svg
---

## 概述

滚动组件是为了处理 List 组件不能处理的场景而存在的。具备虚拟无限滚动，自动滚动等功能。

## API

### Scroll

| 参数       | 说明                     | 类型                   | 默认值 | 版本  |
| ---------- | ------------------------ | ---------------------- | ------ | ----- |
| width      | 宽度                     | number \| string       | 100%   | 0.0.3 |
| height     | 高度                     | number                 | -      | 0.0.3 |
| data       | 需要展示的数据列表       | array                  | []     | 0.0.3 |
| cls        | class 名称               | string                 | -      | 0.0.3 |
| virtual    | 是否开启虚拟滚动         | boolean                | false  | 0.0.3 |
| auto       | 是否开启自动无限滚动     | boolean                | false  | 0.0.3 |
| autoStep   | 自动滚动的步长(需要调整) | number                 | 0.5    | 0.0.3 |
| renderItem | 渲染函数,需要返回 Dom    | (data, index) => VNode | -      | 0.0.3 |
| itemKey    | 数据的唯一标识           | string                 | -      | 0.0.3 |
| itemHeight | Vnode 的高度(必须统一)   | number                 | 30     | 0.0.3 |
