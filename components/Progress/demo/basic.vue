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
      <vc-progress
        :name="'纯色进度条'"
        :percentage="70"
        :value="70"
        :color="singleColor"
        :backgroundColor="'#ebeef5'"
      >
      </vc-progress>
      <vc-progress
        :name="'渐变进度条'"
        :percentage="50"
        :value="50"
        :color="color"
        :backgroundColor="'#ebeef5'"
      >
      </vc-progress>
      <vc-progress
        :name="'左渐变进度条'"
        :percentage="50"
        :value="50"
        :direction="'to left'"
        :color="color"
        :backgroundColor="'#ebeef5'"
      >
      </vc-progress>
      <vc-progress
        :name="'隐藏背景进度条'"
        :percentage="60"
        :value="60"
        :color="noneBgColor"
        :isHidden="true"
        :backgroundColor="'#ebeef5'"
      >
      </vc-progress>
    </vc-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      singleColor: ['#67c23a'],
      noneBgColor: ['#409eff'],
      color: ['rgba(126, 88, 251, 1)', 'rgba(217, 80, 64, 1)']
    };
  }
});
</script>
