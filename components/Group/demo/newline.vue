<docs>
---
order: 0
title:
  zh-CN: 换行
  en-US: Basic Grid
---

## zh-CN

有时候模块太多，一行有些放不下，可以采用 `wrap` 字段来实现换行功能

</docs>

<template>
  <div>
    <a-radio-group v-model:value="value" name="radioGroup">
      <a-radio value="wrap">wrap</a-radio>
      <a-radio value="nowrap">nowrap</a-radio>
    </a-radio-group>
    <br />
    <br />
    <vc-group justify="center" :spacing="[20]" :wrap="value">
      <a-button type="primary">Primary Button</a-button>
      <a-button>Default Button</a-button>
      <a-button type="dashed">Dashed Button</a-button>
      <a-button type="text">Text Button</a-button>
      <a-button type="link">Link Button</a-button>
    </vc-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const val = ref('nowrap');
    return {
      size: ref(8),
      value: val
    };
  }
});
</script>

<style scoped>
.space-align-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.space-align-block {
  flex: none;
  margin: 8px 4px;
  padding: 4px;
  border: 1px solid #40a9ff;
}

.mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}
</style>
