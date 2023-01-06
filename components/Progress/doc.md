---
category: Components
type: 基础
title: Progress
subtitle: 进度条
cover: https://gw.alipayobjects.com/zos/alicdn/xqsDu4ZyR/Progress.svg
---

用于展示操作进度，告知用户当前状态和预期。

## 使用方式

进度条

## API

| 参数        | 说明                     | 类型   | 默认值 | 版本 |
| ----------- | ------------------------ | ------ | ------ | ---- |
| type        | 进度条类型               | string | line   | ---  |
| color       | 进度条颜色(必传)         | array  | ---    | ---  |
| radius      | 进度条圆角               | number | 10     | ---  |
| percentage  | 百分比(可选值范围 0-100) | number | 0      | ---  |
| strokeWidth | 进度条宽度               | number | 10     | ---  |
| ishidden    | 是否隐藏进度条背景       | bool   | false  | ---  |
| bgColor     | 进度条背景色             | string | ---    | ---  |
| direction   | 渐变方向                 | string | ---    | ---  |
| prefix      | 进度条前缀插槽           | slot   | ---    | ---  |
| suffix      | 进度条后缀插槽           | slot   | ---    | ---  |
