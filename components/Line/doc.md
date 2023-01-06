---
category: Components
type: 图表
title: Line
subtitle: 折线图
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/line.svg
---

饼图常用于表示数据占比，可以使用牵引线，图例，以及 label 配合颜色来更加直观的展示数据的占比与值

## 使用方式

饼图是没有轴的概念，饼图更注重圆环，图例，牵引线等展示方式。配置合并的权重 extend > grid,tooltip... > 原有配置(data, customize)

## API

| 参数      | 说明                                         | 类型                  | 默认值 | 版本 |
| --------- | -------------------------------------------- | --------------------- | ------ | ---- |
| type      | 图表类型                                     | string                | base   | ---  |
| width     | 宽度                                         | `string` \| `number`  | 100%   | ---  |
| height    | 高度                                         | `string` \| `number`  | 100%   | ---  |
| data      | 值,与需要配置的圆同下标                      | array                 | []     | ---  |
| series    | EChartsOption 中的 饼图 series               | EChartsOption.series  | []     | ---  |
| grid      | EChartsOption 中的 grid                      | EChartsOption.grid    | {}     | ---  |
| color     | EChartsOption 中的 color                     | EChartsOption.color   | []     | ---  |
| tooltip   | EChartsOption 中的 tooltip                   | EChartsOption.tooltip | {}     | ---  |
| legend    | EChartsOption 中的 legend                    | EChartsOption.legend  | {}     | ---  |
| extend    | EChartsOption                                | EChartsOption         | {}     | ---  |
| customize | 每个图标都会具备自定义数据，通过这个字段传入 | object                | {}     | ---  |

### base

基础图形，不具备自定义扩展参数
