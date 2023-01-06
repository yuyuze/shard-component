<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Basic Grid
---

## zh-CN

基本滚动，通过 `renderItem` 函数 进行渲染数据
</docs>

<template>
  <div>
    <vc-scroll :height="300" :data="data">
      <template #renderItem="scope">
        <div style="height: 30px">
          {{ scope.name }}
          {{ scope.old }}
          {{ City[scope.city] }}
        </div>
      </template>
    </vc-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const City = {
      1: '杭州市',
      2: '绍兴市',
      3: '嘉兴市'
    };
    const data = ref();
    let len = 1;
    const arr = [];
    while (len < 50) {
      arr.push({
        name: '李四',
        old: `${len}岁`,
        city: '2'
      });
      len++;
    }
    data.value = arr;
    console.log(arr);
    return {
      data,
      City
    };
  }
});
</script>
