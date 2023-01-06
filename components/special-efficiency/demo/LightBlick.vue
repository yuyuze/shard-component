<docs>
---
order: 0
title:
zh-CN: 基础
en-US: Basic Grid
---

## zh-CN

闪亮特效
</docs>

<template>
  <div>
    <VcLightBlickSpecial
        effect='alternate'
        reverse='true'
        animation='true'
        defaultColor='rgba(242, 242, 242, 0.4)'
        activeColor='rgba(242, 242, 242, 1)'
        :num='4'
        icon='parallelogram'
        :iconWidth='10'
        :iconHeight='66'
        gap='26'>
    </VcLightBlickSpecial>
    <VcLightBlickSpecial
        :styl='{
            marginLeft: "40px"
        }'
        effect='alternate'
        direction='column'
        theme='safe'
        :num='4'
        icon='#icon-jiankangdengguang-01'
        gap='16'>
    </VcLightBlickSpecial>
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
