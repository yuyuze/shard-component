<docs>
---
order: 0
title:
zh-CN: 基础
en-US: Basic Grid
---

## zh-CN

流光组件
</docs>

<template>
  <div>
    <vcDrainSpecial
        :styl="{
           background: 'linear-gradient(to left, #ccc, green)'
        }"
        borderWidth='10'
        width='200'
        height='200'>
    </vcDrainSpecial>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {},

  setup() {
    return {
    };
  }
});
</script>
