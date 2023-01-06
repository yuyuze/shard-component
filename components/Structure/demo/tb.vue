<docs>
---
order: 0
title:
  zh-CN: 上中下
  en-US: Type
---

## zh-CN

`tb` 字段调整上下边距，`lr` 调整左右边距。`algin` 调整整体的左右排列，当 `justify` 具备参数时，则 `align` 失去对中间作用。
`justify` 可以调整中间的排列。
</docs>

<template>
  上下边距：<a-slider v-model:value="tbsize"> </a-slider>
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
  <vc-structure top="上" bottom="下" :tb="tbConfig">
    <template #center>
      <div style="width: 100px; padding: 10px;text-align: center; border: 1px solid red;">中</div>
    </template>
  </vc-structure>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

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
    const alignList = ['start', 'end', 'center', 'baseline'];
    const justify = ref('start');
    const align = ref('start');
    const tbsize = ref(8);
    const checkJustify = (e) => {
      justify.value = e;
    };
    const checkAlign = (e) => {
      align.value = e;
    };
    const tbConfig = computed(() => {
      return {
        gap: tbsize.value,
        align: align.value,
        justify: justify.value
      };
    });

    return {
      lrsize: ref(0),
      tbsize,
      justifyList,
      justify,
      alignList,
      align,
      checkJustify,
      checkAlign,
      tbConfig
    };
  }
});
</script>
