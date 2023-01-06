<docs>
---
order: 0
title:
  zh-CN: 虚拟滚动
  en-US: Basic Grid
---

## zh-CN

虚拟滚动，通过计算测出可是范围内需要展示几条数据，通过 `renderItem` 渲染展示的 dom
</docs>

<template>
  <div>
    <vc-scroll
      :height="300"
      :data="data"
      :virtual="true"
      :itemHeight="30"
      itemKey="old"
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
