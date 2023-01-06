---
category: Components
type: 基础
title: List
subtitle: 列表
cover: https://gw.alipayobjects.com/zos/alicdn/5FrZKStG_/List.svg
---

列表与表格最大的区别在于，列表仅用于展示数据，不做任何勾选之类的操作功能，仅查看

## 使用方式

列表

## API

| 参数          | 说明                       | 类型                         | 默认值 | 版本 |
| ------------- | -------------------------- | ---------------------------- | ------ | ---- |
| column        | 键值对数组                 | array                        | []     | ---  |
| rowKey        | 主键(唯一键值)             | string                       | -      | ---  |
| data          | 数据                       | array                        | []     | ---  |
| height        | 列表主体高度(除表头)       | string \| number             | 70px   | ---  |
| header        | 是否显示表头               | boolean                      | true   | ---  |
| animate       | 是否开启推进动画           | string                       | true   | ---  |
| animateLen    | 当数据大于该长度时开启动画 | number                       | 3      | ---  |
| animateTime   | 动画间隔                   | number                       | 4      | ---  |
| rowHeight     | 行高度                     | number                       | 30     | ---  |
| rowSpacing    | 行间距(上边距)             | number                       | -      | ---  |
| rowClassName  | 行 Class 名称              | string \| (record) => string | -      | ---  |
| headClassName | 表头 Class 名称            | string                       | -      | ---  |
| headHeight    | 表头高度                   | number \| string             | 30     | ---  |

### column

| 参数  | 说明                       | 类型        | 默认值    | 版本 |
| ----- | -------------------------- | ----------- | --------- | ---- |
| key   | 需要显示的字段名           | string      | -         | ---  |
| name  | 标题头部名称(对应字段 key) | string      | -         | ---  |
| type  | 当前项类型                 | text \| img | text      | ---  |
| flex  | 宽，利用 flex 会自动补充   | string      | 'flex: 1' | ---  |
| width | 宽，固定某一项的宽度       | string      | -         | ---  |

#### column.Text

当 `column` 的 type 为 `text` 时

| 参数        | 说明             | 类型             | 默认值 | 版本 |
| ----------- | ---------------- | ---------------- | ------ | ---- |
| ellipsis    | 是否开启单行省略 | boolean          | true   | ---  |
| ellipsisLen | 省略的行数       | number           | 1      | ---  |
| format      | Text.format      | string           | -      | ---  |
| fontColor   | Text.color       | string \| array  | -      | ---  |
| fontSize    | Text.size        | string \| number | -      | ---  |

#### column.Img

| 参数      | 说明         | 类型    | 默认值 | 版本 |
| --------- | ------------ | ------- | ------ | ---- |
| imgLocal  | 是否本地图片 | boolean | false  | ---  |
| imgWidth  | 图片宽       | number  | 50     | ---  |
| imgHeight | 图片高       | number  | -      | ---  |
