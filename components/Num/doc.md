---
category: Components
type: 基础
title: Num
subtitle: 数字
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/num.svg
---

## 概述

Num 是专门用于处理数字的一种组件，可以实现千分位分割，小数点显示，数字滚动等。

## API

### Text

| 参数        | 说明               | 类型             | 默认值 | 版本  |
| ----------- | ------------------ | ---------------- | ------ | ----- |
| val         | 值(数据)           | number \| string | 0      | 0.0.3 |
| duration    | 动画时间           | number           | 3000   | 0.0.3 |
| separator   | 千分位分割符       | string           | -      | 0.0.3 |
| decimals    | 显示小数点后几位   | number           | -      | 0.0.3 |
| isMandatory | 是否强制显示小数点 | boolean          | false  | 0.0.3 |
| isMemory    | 是否开启值记忆     | boolean          | false  | 0.0.3 |
| animate     | 是否开启动画       | boolean          | true   | 0.0.3 |
| style       | CSS 样式           | CSS              | -      | 0.0.3 |
| cls         | class 类名         | string           | -      | 0.0.3 |
| suffix      | 数字后缀           | string,VNode     | -      | 0.0.3 |
