---
category: Components
type: 基础
title: Shape
subtitle: 形状
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/shape.svg
---

几何图形

## 使用方式

形状

## API

| 参数   | 说明     | 类型   | 默认值 | 版本 |
| ------ | -------- | ------ | ------ | ---- |
| type   | 图形类型 | string | line   | ---  |
| width  | 宽度     | string | line   | ---  |
| height | 高度     | string | line   | ---  |
| radius | 圆角     | string | line   | ---  |
| color  | 背景色   | string | line   | ---  |

### circle

因为是正圆，所以宽高同等，仅设置 `width` 属性即可，`radius` 参数无效

### rect

矩形，可以设置圆角
