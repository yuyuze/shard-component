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
  <dimensional-pie :data="data"></dimensional-pie>
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
        {
          name: '林地面积统计',
          value: 10000,
          itemStyle: {
            color: '#22c4ff'
          }
        },
        {
          name: '草地面积统计',
          value: 12116,
          itemStyle: {
            color: '#000000'
          }
        },
        {
          name: '草地面积统计1',
          value: 18899,
          itemStyle: {
            color: '#5665bb'
          }
        },
        {
          name: '草地面积统计2',
          value: 22116,
          itemStyle: {
            color: '#dd66dd'
          }
        },
        {
          name: '草地面积统计3',
          value: 62996,
          itemStyle: {
            color: '#9630ff'
          }
        },
        {
          name: '耕地地面积统计',
          value: 16616,
          itemStyle: {
            color: '#ffaaff'
          }
        }
      ]
    };
  }
});
</script>
