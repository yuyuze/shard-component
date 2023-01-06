<docs>
---
order: 0
title:
  zh-CN: 记忆
  en-US: Combination
---

## zh-CN

当一个数据从0加载至当前值，下次变化的时候不希望再从0开始加载，则可以通过记忆功能实现。可以将动画以上一次数据为基础来改变

## en-US

空

</docs>

<template>
  <vc-group spacing="10">
    <a-button type="primary" @click="click(100)">+100</a-button>
    <a-button type="primary" @click="click(-100)">-100</a-button>
  </vc-group>
  <br />
  <vc-num :isMemory="true" separator="," :val="num"></vc-num>
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
      click
    };
  }
});
</script>
