---
category: Template
type: 模板
title: Login
subtitle: 登录
cover: https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg
---

登录页面的模板，内置登录逻辑，登录页面的图片以及登录框由后台进行调控

## API

| 参数       | 说明                                           | 类型   | 默认值 | 版本 |
| ---------- | ---------------------------------------------- | ------ | ------ | ---- |
| code       | 当前登录框页面的所属项目配置                   | string | -      | ---  |
| autologin  | 是否自动执行登录                               | string | -      | ---  |
| targetPath | `autologin: true` 时有效，登录成功后的跳转地址 | string | /      | ---  |

## 事件

| 参数    | 说明       | 类型          | 默认值 | 版本 |
| ------- | ---------- | ------------- | ------ | ---- |
| success | 成功后回调 | (token) => {} | -      | ---  |
| fail    | 失败后回调 | () => {}      | -      | ---  |
