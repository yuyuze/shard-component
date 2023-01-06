---
category: Components
type: 核心
title: ConfigProvider
subtitle: 全局化配置
cover: https://gw.alipayobjects.com/zos/alicdn/kegYxl1wj/ConfigProvider.svg
---

为组件提供统一的全局化配置。

## 使用

ConfigProvider 使用 Vue 的 [provide / inject](https://vuejs.org/v2/api/#provide-inject) 特性，只需在应用外围包裹一次即可全局生效。

> 以下参数为必传参数

```html
<template>
  <a-config-provider
    api="https://www.baidu.com/"
    :isDev="false"
    :isProd="false"
  >
    <app />
  </a-config-provider>
</template>
```

## API

| 参数   | 说明                                           | 类型    | 默认值 | 版本 |
| ------ | ---------------------------------------------- | ------- | ------ | ---- |
| api    | 由于组件中有些组件内置请求，需要将请求地址注入 | string  | true   |      |
| isDev  | 当前运行环境是否为开发环境                     | boolean | false  |      |
| isProd | 当前运行环境是否为生产环境                     | boolean | false  |      |
