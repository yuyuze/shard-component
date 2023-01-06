<docs>
---
order: 0
title:
  zh-CN: 横向或纵向
  en-US: Basic Grid
---

## zh-CN

如果横向满足不了需求，可以通过 `direction` 参数调整为纵向，`align` 和 `justify` 参数一样能够使用

</docs>

<template>
  <div>
    <a-radio-group v-model:value="value" name="radioGroup">
      <a-radio value="row">row</a-radio>
      <a-radio value="row-reverse">row-reverse</a-radio>
      <a-radio value="column">column</a-radio>
      <a-radio value="column-reverse">column-reverse</a-radio>
    </a-radio-group>
    <br />
    <br />
    <vc-group justify="center" spacing="10" :direction="value">
      center
      <a-button type="primary">Primary</a-button>
      <span class="mock-block">Block</span>
    </vc-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const val = ref('row');
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
