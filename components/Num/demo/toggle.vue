<docs>
---
order: 0
title:
  zh-CN: 切换
  en-US: Combination
---

## zh-CN

可以动态改变其值也会随着加减变换

## en-US

空

</docs>

<template>
  <div>
    <a-button type="primary" @click="click(100)">+100</a-button>
    <a-button type="primary" @click="click(-100)">-100</a-button>
  </div>
  <vc-num separator=",">{{ num }}</vc-num>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const num = ref(10000);
    const click = (val) => {
      num.value += val;
    };
    return {
      num,
      click,
    };
  },
});
</script>
