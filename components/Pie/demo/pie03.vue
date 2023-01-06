<docs>
---
order: 0
title:
  zh-CN: pie03
  en-US: Type
---

## zh-CN

3号图形

</docs>

<template>
  <div style="width: 100%; height: 100%; background: #000">
    <vc-pie
      height="300"
      type="pie03"
      :data="data"
      :scale="0"
      :customize="customize"
      :color="[
        ['#DADBDB', '#90AEAD'],
        ['#366DFE', '#67B6FD'],
        ['#766D5C', '#F68B0D'],
        ['#C4B771', '#EEC728']
      ]"
    ></vc-pie>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const customize = ref({});
    return {
      data: [
        { name: '单位消防负责人', value: 35.52 },
        { name: '消防员', value: 36.58 },
        { name: '网格员', value: 23.35 },
        { name: '安全员', value: 28.58 }
      ],
      customize
    };
  }
});
</script>
