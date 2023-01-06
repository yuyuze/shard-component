---
category: Components
type: 基础
title: Text
subtitle: 文本
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/text.svg
---

## 概述

这是文本组件，专门用于处理文字

## API

### Text

| 参数     | 说明                        | 类型                    | 默认值          | 版本  |
| -------- |---------------------------|-----------------------|--------------| ----- |
| val      | 值                         | string                | -            | 0.0.3 |
| width    | 文本宽度                      | string \              | number       | -            | 0.0.3 |
| height   | 文本高度                      | string \              | number       | -            | 0.0.3 |
| style    | CSS                       | CSS                   | -            | 0.0.3 |
| cls      | class 类名                  | string                | -            | 0.0.3 |
| block    | 是否变为块级元素                  | boolean               | -            | 0.0.3 |
| fz       | 字体大小                      | string \              | number       | -            | 0.0.3 |
| fw       | 字重                        | string                | -            | 0.0.3 |
| ellipsis | 开启省略号(传入数字则开启多行)          | boolean \             | number       | -            | 0.0.3 |
| color    | 文本颜色(传入数组为渐变)             | string \              | string[]     | -            | 0.0.3 |
| format   | 采用`format`之后,就会变为日期形式进行解析 | `YYYY-MM-DD HH:mm:ss` | `YYYY-MM-DD` | 0.0.3 |
| shadow      | 阴影开关                      | boolean               | false        | 0.0.3 |
| offset | 阴影x,y偏移量                  | array[]               | [5, 5]       | 0.0.3 |
| shadowColor | 阴影颜色                      | string                | #000         | 0.0.3 |
| shadowBlur | 阴影模糊度                     | string                | 1            | 0.0.3 |

### format 日期格式化说明

| 标识 | 描述                     | 示例        |
| ---- | ------------------------ | ----------- |
| YY   | 年，两位数               | 18          |
| YYYY | 年，四位数               | 2018        |
| M    | 月，从 1 开始            | 1-12        |
| MM   | 月，两位数字             | 01-12       |
| MMM  | 月，英文缩写             | Jan-Dec     |
| w    | 周                       | week        |
| d    | 星期(星期日 0，星期六 6) | day         |
| D    | 日                       | 1-31        |
| DD   | 日，两位数               | 01-31       |
| H    | 24 小时                  | 0-23        |
| HH   | 24 小时，两位数          | 00-23       |
| h    | 12 小时                  | 1-12        |
| hh   | 12 小时，两位数          | 01-12       |
| m    | 分钟                     | 0-59        |
| mm   | 分钟，两位数             | 00-59       |
| s    | 秒                       | 0-59        |
| ss   | 秒，两位数               | 00-59       |
| S    | 毫秒（百），一位数       | 0-9         |
| SS   | 毫秒（十），两位数       | 00-99       |
| SSS  | 毫秒，三位数             | 000-999     |
| Z    | UTC 偏移                 | -05:00      |
| ZZ   | UTC 偏移，两位数         | -0500       |
| A    | 上/下午，大写            | AM / PM     |
| a    | 上/下午，小写            | am / pm     |
| Do   | 月份的日期与序号         | 1st... 31st |
