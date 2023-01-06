<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Type
---

## zh-CN

这是一种基础的圆形饼图，具备高度自定义化能力

</docs>

<template>
  <vc-pie
    radius="50%"
    height="300"
    type="base"
    :extend="extend"
    :data="data"
    :label="{
      show: true
    }"
  ></vc-pie>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      extend: {
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0,0, 0, 0.5)'
              }
            }
          }
        ]
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    };
  }
});
</script>
