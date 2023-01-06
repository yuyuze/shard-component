<docs>
---
order: 0
title:
zh-CN: 基础
en-US: Basic Grid
---

## zh-CN

通过href设置图标的内容
</docs>

<template>
  <div>
    <vc-group spacing="20">
      <vc-iconfont href="#icon-shouye"  size="80" color="red"/>
      <vc-iconfont href="#icon-qiye"  size="80"/>
      <vc-iconfont href="#icon-tuiyijunren"  size="80"/>
    </vc-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      size: ref(8)
    };
  }
});
</script>
