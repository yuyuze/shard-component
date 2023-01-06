---
category: Components
type: 图表
title: Gauge
subtitle: 仪表盘
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/gauge.svg
---

柱状图常用与表示数值的增长、减少．

## 使用方式

配置合并的权重 extend > grid,tooltip... > 原有配置(data, customize).
data: 采用了 echarts 中的 [数据集](https://echarts.apache.org/handbook/zh/concepts/dataset) 的概念. data 为数组时默认匹配 `dataset.source`, data 为对象时匹配 `dataset`, 具备更多功能

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
