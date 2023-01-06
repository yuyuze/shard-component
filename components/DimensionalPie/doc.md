---
category: Components
type: 图表
title: DimensionalPie
subtitle: 三维饼图
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/pie.svg
---

饼图常用于表示数据占比，可以使用牵引线，图例，以及 label 配合颜色来更加直观的展示数据的占比与值

## 使用方式

饼图是没有轴的概念，饼图更注重圆环，图例，牵引线等展示方式。配置合并的权重 extend > grid,tooltip... > 原有配置(data, customize)

## 设计理念

饼图分为三大块，**数据圆** 、 **装饰圆** 和 **文字描述** 。顾名思义，数据圆对应的就是整个饼图数据的核心部分，而装饰圆是为了装饰饼图而存在，不会具备任何数据，文字描述则是 Label 的总成，通过调整富文本来实现更加好看且丰富的文字描述。

数据圆通过 data 字段传入对应的数据，再通过 其他字段配合，完善数据圆的展示。装饰圆则通过 `border` 字段，进行配置。每一个装饰圆都是数组中的一项

除了参数的公共项，不建议修改主题的特色配置，每个主题都具备各自的自定义参数，可进行修改。

## API

| 参数      | 说明                             | 类型                           | 默认值         | 版本 |
| --------- | -------------------------------- | ------------------------------ | -------------- | ---- |
| type      | 图表类型                         | string                         | base           | ---  |
| width     | 宽度                             | `string` \| `number`           | 100%           | ---  |
| height    | 高度                             | `string` \| `number`           | 100%           | ---  |
| data      | 值,与需要配置的圆同下标          | array                          | []             | ---  |
| customize | 自定义数据                       | object                         | {}             | ---  |
| border    | 圆的边框                         | border[]                       | []             | ---  |
| scale     | 圆半径缩放参数                   | number                         | 0              | ---  |
| center    | 圆的中心点                       | [string, string]               | ['50%', '50%'] | ---  |
| radius    | 圆的半径                         | string \|[string, string]      | -              | ---  |
| series    | EChartsOption 中的 饼图 series   | EChartsOption.series           | []             | ---  |
| grid      | EChartsOption 中的 grid          | EChartsOption.grid             | {}             | ---  |
| color     | 图表颜色                         | string[] \| string[][]         | []             | ---  |
| direction | 颜色渐变方向(color 为数组时有效) | Linedirection \| Radiairection | []             | ---  |
| tooltip   | EChartsOption 中的 tooltip       | EChartsOption.tooltip          | {}             | ---  |
| legend    | EChartsOption 中的 legend        | EChartsOption.legend           | {}             | ---  |
| extend    | EChartsOption                    | EChartsOption                  | {}             | ---  |

### border

圆的边框参数

> 通过 echarts 没有数据的圆实现，如果需要实现虚线效果，需要采用 border 系列参数,且 shadow 无效

| 参数          | 说明               | 类型                           | 默认值          | 版本 |
| ------------- | ------------------ | ------------------------------ | --------------- | ---- |
| z             | 层级(高覆盖低)     | number                         | -1              | ---  |
| radius        | 图表类型           | string \| [string, string]     | -               | ---  |
| color         | 图形颜色           | string \| string[]             | -               | ---  |
| direction     | 颜色渐变方向       | Linedirection \| Radiairection | [0.5, 0.5, 1.0] | ---  |
| gradientType  | 颜色渐变类型       | line \| radia                  | radia           | ---  |
| borderWidth   | 边框宽度           | number                         | -               | ---  |
| borderType    | 边框间隔           | number \| number[]             | -               | ---  |
| borderColor   | 边框颜色           | string                         | -               | ---  |
| shadowBlur    | 阴影模糊大小       | number                         | -               | ---  |
| shadowColor   | 阴影颜色           | string                         | -               | ---  |
| shadowOffsetX | 阴影水平方向偏移量 | number                         | -               | ---  |
| shadowOffsetY | 阴影垂直方向偏移量 | number                         | -               | ---  |

### Linedirection

线性渐变参数。每一项值范围 0 - 1

```js
{
  direction: [number, number, number, number]; // 右, 下, 左, 上
}
```

### Radiairection

径向渐变参数。每一项值范围 0 - 1

```js
{
  direction: [number, number, number];
}
```

### base

基础图形，不具备自定义扩展参数

### multiple

多环图形，具备以下参数

```js
{
  label: true, // 是否显示 label 文本
  itemColor: { // 富文本标签与颜色对应 属性名 和 颜色都可以随意 但要保持 [属性名: 颜色] 格式
    a: 'rgba(217, 80, 64, 1)',
    b: 'rgba(255, 176, 82, 1)',
    c: 'rgba(106, 78, 220, 1)',
    d: 'rgba(25, 182, 17, 1)',
    e: '#73c0de',
    f: '#3ba272',
    g: '#fc8452',
    h: '#9a60b4',
    i: '#ea7ccc'
  }
}
```

### translucence

间隔环图形，具备以下参数

```js
{
  label: true,// 是否显示 label 文本
  spacing: 3, // 按照圆环百分比进行计算 3 === 3%，max === 100%
  borderSize: 2,// 边框粗细
  colorBorder: [
    'rgba(0, 122, 159, 1)',
  ], // 边框颜色
}
```

### nightingale

南丁格尔图
