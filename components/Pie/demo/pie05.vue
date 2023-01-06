<docs>
---
order: 0
title:
  zh-CN: pie05
  en-US: Type
---

## zh-CN

5号 图形

</docs>

<template>
  <vc-pie radius="50%" height="200" type="pie05" :data="data"></vc-pie>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      data: [
        { value: 700, name: '参与人数' },
        { value: 300, name: '未参与人数' },
        { value: 1000, name: '总数' }
      ]
    };
  }
});
</script>
