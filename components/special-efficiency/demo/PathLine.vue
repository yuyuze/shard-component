<docs>
---
order: 0
title:
zh-CN: 基础
en-US: Basic Grid
---

## zh-CN

路径动画特效
</docs>

<template>
  <div>
    <VcPathLineSpecial
        :pathColors="[
        'to left',
        'rgba(1,1,1, 0) 0%',
        'rgba(255, 200,1, 1)'
        ]"
        pointColors='rgba(255, 200,1, 0.6)'
        width='550.4'
        height='70'
        path= 'M1.206,64.187 L19.406,51.587 L81.006,50.187 L104.806,65.587 L553.006,1.187 '
        endStrokeDashoffset='566'
        startStrokeDashoffset='10'
        :pointPathAttr="{
          'stroke-width': '5',
              'stroke-dasharray': '10, 566',
              'stroke-dashoffset': '10'
        }"
    >
    </VcPathLineSpecial>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
    };
  }
});
</script>
