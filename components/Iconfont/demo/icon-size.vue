<docs>
---
order: 0
title:
zh-CN: 基础
en-US: Basic Grid
---

## zh-CN

通过size改变大小
</docs>

<template>
  <div>
    <a-slider tooltip-visible v-model:value="size" />
    <br/>
    <vc-iconfont href="#icon-shouye"  :size="size"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      size: ref(35)
    };
  }
});
</script>
