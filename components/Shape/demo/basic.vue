<docs>
---
order: 0
title:
  zh-CN: 圆形
  en-US: Type
---

## zh-CN

通过`type`设置图形的形状,可在`width`控制大小,

</docs>

<template>
  <div>
    <vc-group direction="column" spacing="10px" align="stretch">
      <vc-shape type="circle" width="10" color="red"></vc-shape>
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
