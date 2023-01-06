<docs>
---
order: 0
title:
  zh-CN: 排列
  en-US: Basic Grid
---

## zh-CN

有些时候不需要通过空间来增加间距，而是直接使用某种排列方式。本组件提供了 `flex` 的能力，能够根据轴的需求进行排列。
`justify` 排列横轴，`align` 排列纵轴

</docs>

<template>
  <div>
    <vc-group justify="space-evenly">
      <vc-text> justify: </vc-text>
      <a-button
        v-for="item of justifyList"
        :key="item"
        :type="justify === item && 'primary'"
        @click="checkJustify(item)"
        >{{ item }}</a-button
      >
    </vc-group>
    <br />
    <vc-group :justify="justify" spacing="10">
      <a-button type="primary" danger>模块1</a-button>
      <a-button type="primary" danger>模块2</a-button>
      <a-button type="primary" danger>模块3</a-button>
    </vc-group>
    <br />
    <vc-group :spacing="10" justify="start">
      <vc-text> align: </vc-text>
      <a-button
        v-for="item of alignList"
        :key="item"
        :type="align === item && 'primary'"
        @click="checkAlign(item)"
        >{{ item }}</a-button
      >
    </vc-group>
    <br />
    <vc-group :align="align" spacing="10">
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
    const justifyList = [
      'start',
      'end',
      'center',
      'space-evenly',
      'space-around',
      'space-between'
    ];
    const alignList = ['baseline', 'center', 'start', 'end'];
    const justify = ref('space-evenly');
    const align = ref('center');
    const checkJustify = (e) => {
      justify.value = e;
    };
    const checkAlign = (e) => {
      align.value = e;
    };
    return {
      justifyList,
      justify,
      alignList,
      align,
      checkJustify,
      checkAlign
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
