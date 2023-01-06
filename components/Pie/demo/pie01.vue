<docs>
---
order: 0
title:
  zh-CN: pie01
  en-US: Type
---

## zh-CN

1 号图形

</docs>

<template>
  <div style="width: 100%; height: 100%; background: #000">
    <vc-pie
      height="300"
      type="pie01"
      :legend="legend"
      :data="data"
      :scale="5"
    ></vc-pie>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      legend: {
        orient: 'vertical',
        left: '10%',
        top: 'center',
        textStyle: {
          color: 'rgba(187, 207, 248,1)',
          fontWeight: 'bold',
          fontSize: 12
        }
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' }
      ]
    };
  }
});
</script>
