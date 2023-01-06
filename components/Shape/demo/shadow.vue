<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Type
---

## zh-CN

通过`type`设置图形的形状,可在`width`控制大小,通过`radius`控制圆角,通过`shadow`控制阴影

</docs>

<template>
  <div>
    <vc-group direction="column" spacing="10px" align="stretch">
      <vc-shape type="rect" width="10" color="blue" radius="30"></vc-shape>
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
