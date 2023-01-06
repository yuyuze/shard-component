<docs>
---
order: 0
title:
  zh-CN: 无限滚动
  en-US: Basic Grid
---

## zh-CN

在虚拟滚动的基础上，增加了可以自行滚动的能力。自动滚动期间不能插入其余数据，建议在一次性获取数据后在使用自动滚动
</docs>

<template>
  <div>
    <vc-scroll
      :height="300"
      :data="data"
      :virtual="true"
      :itemHeight="30"
      itemKey="old"
      auto
    >
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
    return {
      data,
      City
    };
  }
});
</script>
