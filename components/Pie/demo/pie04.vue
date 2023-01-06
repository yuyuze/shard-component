<docs>
---
order: 0
title:
  zh-CN: pie04
  en-US: Type
---

## zh-CN

4 号图形

</docs>

<template>
  <vc-pie
    height="300"
    type="pie04"
    :extend="extend"
    :data="data"
    :customize="customize"
    :center="['50%', '60%']"
    :radius="['46%', '60%']"
    :border="border"
    :direction="[1, 0, 0, 0]"
    :color="[
      ['rgba(0, 122, 159, 0.5)', 'rgba(0, 122, 159, 0.8)'],
      ['rgba(245, 184, 7, 0.5)', 'rgba(245, 184, 7, 0.8)'],
      ['rgba(255, 97, 97, 0.5)', 'rgba(255, 97, 97, 0.8)'],
      ['rgba(10, 145, 127, 0.5)', 'rgba(10, 145, 127, 0.8)'],
      ['rgba(115, 192, 222,0.5)', 'rgba(115, 192, 222,0.8)']
    ]"
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
          left: 'center'
        },
        series: [
          {
            itemStyle: {
              // 标签配置
              label: {
                show: true,
                position: 'outside',
                color: '#000',
                fontSize: 14,
                fontFamily: 'ArialMT',
                align: 'center',
                padding: [0, -5], // 偏移
                formatter: (params) => {
                  if (params.name !== '') {
                    return params.name + '\n{val|' + params.value + '}';
                  }
                  return '';
                },
                rich: {
                  val: {
                    fontSize: 20,
                    color: '#F3BC09',
                    fontFamily: 'ArialMT',
                    align: 'center',
                    padding: [0, 0, 0, 0] // 内边距
                  }
                }
              },
              labelLine: {
                length2: 20,
                length: 20
              }
            }
          }
        ]
      },
      data: [
        { value: 1024, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      customize: {
        label: true,
        spacing: 3,
        colorBorder: [
          'rgba(0, 122, 159, 1)',
          'rgba(245, 184, 7, 1)',
          'rgba(255, 97, 97, 1)',
          'rgba(10, 145, 127, 1)',
          '#73c0de'
        ]
      },
      border: [
        {
          radius: '36%',
          color: [
            'rgba(10, 145, 127,0.2)',
            'rgba(10, 145, 127, 0.5)',
            'rgba(10, 145, 127, 0.7)'
          ],
          borderColor: 'rgba(10, 145, 127, 1)',
          direction: [0.5, 0.5, 0.8]
        }
      ]
    };
  }
});
</script>
