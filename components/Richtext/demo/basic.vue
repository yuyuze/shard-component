<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Type
---

## zh-CN

通过`color`设置进度条的颜色,可在`color`实现渐变效果,
由`direction`控制渐变效果,设置`isHidden`隐藏进度条背景
并可在进度条的前`prefix`后缀`suffix`自定义插槽。

</docs>

<template>
  <div>
    <vc-group direction="column" spacing="10px" align="stretch">
      <vc-richtext></vc-richtext>
    </vc-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>
