<docs>
---
order: 0
title:
  zh-CN: 自定义 row
  en-US: Type
---

## zh-CN

row 中的 `class` 可以通过 `rowClassName` 去进行调整。行中的每一项的宽都可以通过 `flex` 和 `width` 属性设置，默认为 `flex: 1`

> 权级：width > flex。由于列表的特性,表头的宽度会随着 `row` 一起改变

</docs>

<template>
  <vc-list
    height="75px"
    headClassName="custom-head"
    rowClassName="custom-row"
    rowSpacing="7px"
    :animate="false"
    rowKey="name"
    :data="data"
    :column="column"
  ></vc-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      column: [
        {
          key: 'name',
          name: '场所名称'
        },
        {
          key: 'value',
          name: '人员数量',
          width: 100
        }
      ],
      data: ref([
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ])
    };
  }
});
</script>

<style>
.custom-head {
  color: #fff;
  background: rgb(4 22 21 / 50%);
}

.custom-row {
  color: #fff;
  background: rgb(4 22 21 / 20%);
}
</style>
