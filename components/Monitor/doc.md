---
category: Components
type: 设备
title: Monitor
subtitle: 监控
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/jiankong.svg
---

## 概述

Generate 通过传入不同的组件名称和 Props 生成对应的组件

## API

### Monitor

| 参数   | 说明     | 类型            | 默认值 | 版本  |
| ------ | -------- | --------------- | ------ | ----- |
| width  | 宽度     | string          | 100%   | 0.0.3 |
| height | 高度     | string          | 300px  | 0.0.3 |
| type   | 播放类型 | video \| plugin | video  | 0.0.3 |

### video

video 标签播放

| 参数 | 说明 | 类型   | 默认值 | 版本  |
| ---- | ---- | ------ | ------ | ----- |
| src  | 地址 | string | -      | 0.0.3 |

### plugin

监控插件

| 参数     | 说明              | 类型   | 默认值 | 版本  |
| -------- | ----------------- | ------ | ------ | ----- |
| live     | 是否直播取流(hls) | string | -      | 0.0.3 |
| autoplay | autoplay          | string | -      | 0.0.3 |
| src      | 地址              | string | -      | 0.0.3 |
