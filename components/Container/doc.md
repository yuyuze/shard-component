---
category: Components
type: 核心
title: Container
subtitle: 容器
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/container.svg
---

容器

## 使用方式

容器只在系统需要进行分辨率自适应时使用,通过 `resolution` 参数可以调整需要自适应的比例,如果分辨率比例不合适,则可以通过 `width` 和 `height` 调整

- 16:9 = 1920 \* 1080
- 21:9 = 3440 \* 1440
- 32:9 = 7680 \* 2160

## API

| 参数           | 说明     | 类型                                 | 默认值 | 版本 |
|--------------|--------| ------------------------------------ | ------ | ---- |
| width        | 宽度     | number                               | 100%   | ---  |
| height       | 高度     | number                               | 100%   | ---  |
| targetWidth  | 目标宽度   | number                               | 100%   | ---  |
| targetHeight | 目标高度   | number                               | 100%   | ---  |
| adapt        | 根据什么适应 | width \| height \| two-way \| scroll \| auto | width  | ---  |
| target       | 适应的目标  | parent \| window                     | window | ---  |
| resolution   | 适应的比例  | 16:9 \| 21:9                         | 100%   | ---  |
