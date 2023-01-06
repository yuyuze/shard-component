---
category: Components
type: 基础
title: special-efficiency
subtitle: 特效
cover: http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/text.svg
---

## 概述
主要是用来封装特效的组件,生成大屏比较常见的特效元素。

提取了特效动画的一些基础 参数(props)，并加上独有的 props 形成一个特效的配置参数。

目前封装了四个特效组件
1. Drain（流光盒子）
2. LightBlink（闪亮特效）
3. NeonLight（呼吸灯特效，光晕盒子以及光晕 Iconfont）
4. PathLine （路径动画，路径流光）

#### 基础配置
| 参数      | 类型           | 说明           | 默认值   | 版本    |
| --------- |--------------|--------------|-------|-------|
| width  | number\|string        | 盒子的宽度 |  auto  | 0.0.3 |
|  height  | number\|string | 盒子的高度 |  auto  | 0.0.3 |
|  style  | object       | 盒子的样式        | -     | 0.0.3 |
|  cls  | string       | 盒子的类名        | -     | 0.0.3 |
|  num  | number       | 动画元素个数       | 1     | 0.0.3 |
|  time | number       | 动画一次的时间（单位 s） | 4     | 0.0.3 |
|  isAnimation  | boolean      | 是否开启动画       | true  | 0.0.3 |
## API
### 流光特效
流光盒子效果，快速生成一个流光盒子，提供了内容插槽，可调配盒子的大小，并且可以设置流光的颜色（支持渐变）、宽度。而且可以设置内部的颜色和流光轨道的颜色（支持渐变）

| 参数      | 类型            | 说明            | 默认值  | 版本      |
| --------- |---------------|---------------|------|---------|
| colors  | string\| string[]      |  流光颜色 | #ff0066 | 0.0.3 |
|  borderWidth  | number\| string        | 流光边框的大小      | 2       | 0.0.3 |
|  outColor  | string        | 流光轨道颜色（支持渐变）  |-    | 0.0.3   |
|  innerColor  | string        | 流盒子内部颜色（支持渐变） |#fff     | 0.0.3   |

### 闪亮特效
可以快速生成一个个会亮的控件，这个场景在很多项目都会出现，闪亮动画支持主题色配置。

| 参数      | 类型 | 说明                                    | 默认值                | 版本    |
| --------- |--------------------------------------------|---------------------------------------|--------------------|-------|
| icon  | rect、parallelogram（平行四边形）、iconfont href 的引用地址 | 闪亮的形状                                 | -                  | 0.0.3 |
|  theme  | safe（安全主题）\|operation（保护主题）  | 主题色 theme优先级高于defaultColor activeColor | -                  | 0.0.3 |
|  defaultColor  | string | 默认颜色（支持渐变）| rgb(44, 54, 53)    | 0.0.3 |
|  activeColor  | string  | 闪亮颜色（支持渐变）                            | rgb(157, 210, 211) | 0.0.3 |
|  iconWidth  | string\|number | 闪亮形状的大小            |40 | 0.0.3   |
|  iconHeight  | string\|number  | 闪亮形状的大小            |40  | 0.0.3   |
|  reverse  | boolean   | 是否来回运动                                | false              | 0.0.3 |
|  animationDir  | forward（正向）\|opposite（反向）   | 运动方向               |forward   | 0.0.3   |
|  setTimeOut  | number   | 运动延迟时间（s）                             | 0                  | 0.0.3 |
|  direction  | row（横向排布）\|column（纵向排布） | 排布方向               |row   | 0.0.3   |
|  rotateZ  | number | 旋转角度（只有在平行四边形时起效）                     | 30                 | 0.0.3 |
|  gap  | string\|number  | 各个闪亮形状的间距                             | 10                 | 0.0.3 |

### 呼吸灯特效
可以快速生成一个较为好看的有呼吸感的盒子以及呼吸感的 iconfont，发光可以沿着 iconfont 的形状呼吸，散发光晕。

| 参数      | 类型 | 说明                                    | 默认值     | 版本    |
| --------- |--------------------------------------------|---------------------------------------|---------|-------|
| color  |  string |  呼吸灯颜色 | #ff0066 | 0.0.3 |
|  expandWidth  |  number\|string | 呼吸灯扩散范围 | 4     | 0.0.3   |
|  opacity  | number |  初始的透明色| 0.2     | 0.0.3 |
|  shadowPosition  | ''（外部）\|'inset'（内部） | '       | 40    | 0.0.3   |
|  iconHref  | string | iconfont 的地址| -       | 0.0.3 |
|  isShowOutLight  | bool | 是否显示外部呼吸| true      | 0.0.3 |
|  isShowIconLight  | bool | 是否显示图标呼吸| true      | 0.0.3 |

### 路径动画特效
可以根据设计软件导出的 path 路径快速生成一个较为好看的路径流光动画，主要是做一些标题头部的效果。

| 参数      | 类型 | 说明                                    | 默认值                            | 版本    |
| --------- |--------------------------------------------|---------------------------------------|--------------------------------|-------|
| pointColors  |  string[] |  运动点的颜色 支持渐变 | #000                           | 0.0.3 |
|  pathColors  |  string[] 与 css 的 Linear 相同 | 路径颜色 支持渐变| #000                           | 0.0.3 |
|  svgCls  | string |  svg 样式| -                              | 0.0.3 |
|  path  | 路径 | path路径| -                              | 0.0.3 |
|  linePathAttr  | object SVGAttributes | 设置线的 svg 属性（path）| {}                             | 0.0.3 |
|  pointPathAttr  |object SVGAttributes | 设置运动点的 svg 属性（path）| {}                             | 0.0.3 |
|  animationTimingFunction  | string | 运动动画效果 | cubic-bezier(0, 0, 0.74, 0.74) | 0.0.3 |
|  endStrokeDashoffset  | number | 运动点开始的线条偏移量 | 0                              | 0.0.3 |
|  startStrokeDashoffset  | number | 运动点开始的线条偏移量 | 0                              | 0.0.3 |