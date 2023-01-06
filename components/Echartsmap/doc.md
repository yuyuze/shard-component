---
category: Components
type: 图表
title: Echartsmap
subtitle: 地图
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/echartsmap.svg
---

Echartsmap 是为了解决使用 echarts 地图的问题

## 使用方式

配置合并的权重 extend > grid,tooltip... > 原有配置(data, customize).
data: 采用了 echarts 中的 [数据集](https://echarts.apache.org/handbook/zh/concepts/dataset) 的概念. data 为数组时默认匹配 `dataset.source`, data 为对象时匹配 `dataset`, 具备更多功能

## 设计理念

Echartsmap 是想将地图的美化配置全部集中与 类型(type) 上。使用者可以通过参数切换来实现不同的展示效果，但本质上不推荐直接修改配置项。

只使用 `flying` 和 `data`  实现数据和飞线的展示。

## API

| 参数      | 说明                                         | 类型                  | 默认值 | 版本 |
| --------- | -------------------------------------------- | --------------------- | ------ | ---- |
| type      | 图表类型                                     | string                | base   | ---  |
| width     | 宽度                                         | `string` \| `number`  | 100%   | ---  |
| height    | 高度                                         | `string` \| `number`  | 100%   | ---  |
| data      | 值,与需要配置的圆同下标                      | array                 | []     | ---  |
| left      | 左边距离                                     | `string` \| `number`  | -      | ---  |
| top       | 上边距离                                     | `string` \| `number`  | -      | ---  |
| right     | 右边距离                                     | `string` \| `number`  | -      | ---  |
| bottom    | 下边距离                                     | `string` \| `number`  | -      | ---  |
| geotype   | 地图类型                                     | string                | china  | ---  |
| zoom      | 地图缩放                                     | number                | 1      | ---  |
| flying    | 飞线数据                                     | [[]]                  | []     | ---  |
| series    | EChartsOption 中的 饼图 series               | EChartsOption.series  | []     | ---  |
| grid      | EChartsOption 中的 grid                      | EChartsOption.grid    | {}     | ---  |
| color     | EChartsOption 中的 color                     | EChartsOption.color   | []     | ---  |
| tooltip   | EChartsOption 中的 tooltip                   | EChartsOption.tooltip | {}     | ---  |
| legend    | EChartsOption 中的 legend                    | EChartsOption.legend  | {}     | ---  |
| extend    | EChartsOption                                | EChartsOption         | {}     | ---  |
| customize | 每个图标都会具备自定义数据，通过这个字段传入 | object                | {}     | ---  |
