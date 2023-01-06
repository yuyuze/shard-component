<docs>
---
order: 0
title:
zh-CN: 基础
en-US: Basic Grid
---

## zh-CN

测试当前图标组件的图标地址
</docs>

<template>
  <div>
   <a-form>
     <a-form-item label="图标地址">
       <a-input tooltip-visible v-model:value="iconHref" />
     </a-form-item>
     <a-form-item label="颜色">
       <a-input tooltip-visible v-model:value="color" />
     </a-form-item>
   </a-form>
    <br/>
    <vc-iconfont :href="iconHref" size="80" :color="color"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      iconHref: ref('#icon-jiankangdengguang-01'),
      color: ref('#000')
    };
  }
});
</script>
