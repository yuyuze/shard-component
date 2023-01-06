<docs>
---
order: 0
title:
  zh-CN: 嵌套
  en-US: Type
---

## zh-CN

当碰到一个复杂的结构时，我们可以将其分解，通过嵌套来实现该结构。
</docs>

<template>
  <vc-structure
    :pd="10"
    :lr="{
      gap: 10,
      align: 'center'
    }"
    rcls="box-right"
  >
    <template #left>
      <vc-image
        radius="5"
        width="100"
        src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/f53decdde71190ef1f5b3dc8c11b9d16fdfa6009.jpg"
      ></vc-image>
    </template>
    <template #right>
      <vc-structure left="姓名：" right="张xx"> </vc-structure>
      <vc-structure left="电话：" right="13700100010"> </vc-structure>
      <vc-structure left="地址：" right="地球村"> </vc-structure>
      <vc-structure left="爱好：" right="旅游"> </vc-structure>
    </template>
  </vc-structure>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style lang="less">
.box-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
