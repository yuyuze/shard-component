<docs>
---
order: 0
title:
  zh-CN: 矩形
  en-US: Type
---

## zh-CN

通过`type`设置图形的形状,可在`width`控制大小,通过`radius`控制圆角

</docs>

<template>
  <div>
    <vc-group direction="column" spacing="10px" align="stretch">
      <vc-shape type="rect" width="10" color="blue" radius="2"></vc-shape>
    </vc-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>
