<docs>
---
order: 0
title:
  zh-CN: 过滤和合并
  en-US: Basic Grid
---

## zh-CN

`filter` 字段可以过滤列表中不想展示的数据。`merge` 可以扩展某些字段的属性使其更具功能性

</docs>

<template>
  <vc-com-list
    :filter="['sort']"
    :merge="[
      {
        key: 'type',
        fontColor: 'red'
      }
    ]"
    theme="dyh1"
    height="100px"
    api="/openApiDev/bus/request/table"
  >
  </vc-com-list>
</template>
