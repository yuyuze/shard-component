---
order: 7.1
title: 开发指南
---

# 开发指南

查看 [上一章](/#/guide/getting-started) 了解了 `VC 综合化平台` 如何进行使用。

本章介绍如何在正常开发中使用 `组件`、`模板` 来提高开发效率

## 模块类型

首先我们需要认清楚页面中模块有多少类型，再去根据类型拆分出对应的数据格式，接着实现前后台数据格式统一。

以此为基础，便可以加快开发效率

### 指标模块(Kpi)

指标模块细分可分为四个子字段，名称(name)，值(value)，单位(unit)，图标(icon)。

<vc-group spacing="10">
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/kpi1.png"></vc-image>
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/kpi2.png"></vc-image>
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/kpi3.png"></vc-image>
</vc-group>

### 列表模块(List)

列表模块有两个要点，一个是列表头(dataTh)，一个是列表内容(dataTb)。

列表与指标模块最大的区别在于，列表中的内容有时多有时少，不再局限与固定的几个字段。

但表头和固定的列是一样的，也就是说但凡表头存在的字段，主体也必须要显示对应的字段数据，所以我们以表头作为展示核心

<vc-group spacing="10">
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/list1.png"></vc-image>
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/list2.png"></vc-image>
</vc-group>

### 图表模块(Bar,Pie,Line...)

图片模块涉及多个图表组件，每个组件都具备单独的数据格式。查看 [图表](/#/components/Bar) 自行了解

<vc-group spacing="10">
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/echart1.png"></vc-image>
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/echart2.png"></vc-image>
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/echart3.png"></vc-image>
</vc-group>

## 数据格式

通过数据模块可以了解到，每个对应的数据模块都代表着一个对应的数据格式。

我们约定数据模块和数据格式都是一一对应的，当看到设计稿上的模块就可以快速的联想到对应的数据类型，从而具备快速开发的能力。

### Kpi

指标型数据格式一般有两种。一个为数组型指标数据格式，一个为对象型指标数据格式

基本的指标数据格式如下

```js
const Kpi = {
  code: '1', // 唯一标识符
  name: '事件总数', // 指标数据名称
  value: '10', // 指标数据的值
  unit: '件', // 指标数据单位
  icon: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/list2.png' // 指标数据 图标
};
```

数组型指标数据格式一般应用与各指标之间的间隙相等，有规律，方便循环遍历的模块。

<vc-group spacing="10">
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/kpi1.png"></vc-image>
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/kpi2.png"></vc-image>
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/kpi3.png"></vc-image>
</vc-group>

```js
const KpiList = [
  {
    code: 'all', // 唯一标识符
    name: '事件总数', // 指标数据名称
    value: '10', // 指标数据的值
    unit: '件', // 指标数据单位
    icon: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/list2.png'
  },
  {
    code: 'today', // 唯一标识符
    name: '今日新增', // 指标数据名称
    value: '2', // 指标数据的值
    unit: '件', // 指标数据单位
    icon: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/list2.png'
  }
];
```

上面将了数组型指标数据应用于有规律，可循环的的模块。而对象型指标数据应用于各种无规律的模块

```js
const KpiObj = {
  wind: {
    code: 'wind', // 唯一标识符
    name: '风向', // 指标数据名称
    value: '东北风', // 指标数据的值
    unit: '' // 指标数据单位
  },
  rain: {
    code: 'rain', // 唯一标识符
    name: '降雨量', // 指标数据名称
    value: '0.0', // 指标数据的值
    unit: '', // 指标数据单位
    icon: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/list2.png'
  }
};
```

<vc-group spacing="10">
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/kpi4.png"></vc-image>
</vc-group>

### List

列表型数据分为两个数组一个为表头(dataTh)，一个为表体(dataTb)。

由于列表型数据特殊，只有表头具备固定字段，表体则随着标题而改变

<vc-group spacing="10">
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/list1.png"></vc-image>
  <vc-image width="260" src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/list2.png"></vc-image>
</vc-group>

```js
const dataTh = [
  {
    name: '区域',
    key: 'area'
  },
  {
    name: '片区',
    key: 'area2'
  },
  {
    name: '数量'
    key: 'num'
  }
];
const dataTb = [
  {
    area: '南湖区',
    area2: '56',
    num: '181'
  },
  {
    area: '经开区',
    area2: '10',
    num: '12'
  },
  {
    area: '秀洲区',
    area2: '90',
    num: '257'
  }
];
```
