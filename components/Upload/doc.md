---
category: Components
type: 基础
title: Upload
subtitle: 上传
cover: https://gw.alipayobjects.com/zos/alicdn/QaeBt_ZMg/Upload.svg
---

规定了与后台的交互模式，通过 `ConfigProvider` 组件注入服务器地址，在使用 `interface` 字段填入接口地址。和后台的传输就可以打通

## API

| 参数        | 说明             | 类型    | 默认值 | 版本 |
| ----------- | ---------------- | ------- | ------ | ---- |
| width       | 宽度             | string  | 100    | ---  |
| height      | 高度             | string  | 100    | ---  |
| accept      | 上传文件类型     | string  | ------ | ---  |
| interface   | 接口地址(必填)   | string  | ------ | ---  |
| multiple    | 是否单文件上传   | boolean | false  | ---  |
| maxCount    | 文件上传最大数量 | number  | -      | ---  |
| onlyPreview | 是否只预览不上传 | boolean | false  | ---  |
