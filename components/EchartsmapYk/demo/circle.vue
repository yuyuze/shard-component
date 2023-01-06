<docs>
---
order: 0
title:
  zh-CN: circle
  en-US: Type
---

## zh-CN

类型为"circle"的展示

</docs>

<template>
  <vc-echartsmap
    height="300"
    geotype="china"
    type="circle"
    :zoom="1.2"
    :extend="extend"
    :data="data"
    :flying="flying"
    :left="'center'"
    :top="'center'"
  ></vc-echartsmap>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      extend: {},
      data: [
        {
          name: '辽宁',
          value: 30,
          coord: [123.1238, 42.1216]
        },
        {
          name: '湖南',
          value: 40,
          coord: [113.0823, 28.2568]
        },
        {
          name: '江苏',
          value: 20,
          coord: [118.8062, 31.9208]
        },
        {
          name: '上墅',
          coord: [119.5313, 29.8773],
          value: 10
        }
      ],
      flying: [
        [
          {
            name: '辽宁',
            coord: [123.1238, 42.1216]
          },
          {
            coord: [119.5313, 29.8773]
          }
        ],
        [
          {
            name: '湖南',
            coord: [113.0823, 28.2568]
          },
          {
            coord: [119.5313, 29.8773]
          }
        ],
        [
          {
            name: '江苏',
            coord: [118.8062, 31.9208]
          },
          {
            coord: [119.5313, 29.8773]
          }
        ]
      ]
    };
  }
});
</script>
