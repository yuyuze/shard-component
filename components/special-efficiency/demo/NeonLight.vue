<docs>
---
order: 0
title:
zh-CN: 基础
en-US: Basic Grid
---

## zh-CN

呼吸灯特效
</docs>

<template>
  <div>
    <VcNeonLightSpecial
        width='200'
        height='200'
        expandWidth='20'
        :styl="{
        background: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }"
       >
    </VcNeonLightSpecial>
    <VcNeonLightSpecial
        shadowPosition="inset"
        width='200'
        height='200'
        expandWidth='20'
        :styl="{
        background: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }"
    >
    </VcNeonLightSpecial>
    <VcNeonLightSpecial
        iconHref='#icon-jiankangdengguang-01'
        expandWidth='20'
        width='60'
        shadowPosition='inset'
       >
    </VcNeonLightSpecial>
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
