<docs>
---
order: 0
title:
  zh-CN: pie02
  en-US: Type
---

## zh-CN

2 号图形

</docs>

<template>
  <div style="width: 100%; height: 100%; background: #000">
    <vc-pie
      height="300"
      type="pie02"
      :extend="extend"
      :data="data"
      :spacing="3"
      :center="['50%', '50%']"
      :color="['#f58e5e', '#05cea6', '#5470c6']"
    ></vc-pie>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      extend: {},
      data: [
        { value: 1024, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' }
      ]
    };
  }
});
</script>
