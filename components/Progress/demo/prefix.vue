<docs>
---
order: 0
title:
  zh-CN: 自定义插槽
  en-US: Type
---

## zh-CN

通过prefix,插槽来自定义前缀,默认不传,可由`name`设置进度条名称。

</docs>

<template>
  <vc-progress :percentage="percent" :color="color" :direction="'45deg'">
    <template v-slot:prefix>
      <div style="display: flex; align-items: center">
        <img
          src="./img/test.png"
          alt=""
          style=" width: 12px;height: 12px; margin-right: 3px"
        />
        前缀名称
      </div>
    </template>
    <template v-slot:suffix>
      <div>{{ siffixData }}</div>
    </template>
  </vc-progress>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    const percent = ref(90);
    const siffixData = computed(() => {
      return percent.value === 100 ? '完成' : `${percent.value}个`;
    });
    return {
      color: ['red', 'blue'],
      percent,
      siffixData
    };
  }
});
</script>
