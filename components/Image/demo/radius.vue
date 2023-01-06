<docs>
---
order: 0
title:
  zh-CN: 圆角
  en-US: Type
---

## zh-CN

通过 `radius` 可以设置一张图片的圆角属性，使其看起来更加美观

</docs>

<template>
  <a-slider v-model:value="size" />
  <vc-image
    :radius="size"
    width="200"
    src="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/f53decdde71190ef1f5b3dc8c11b9d16fdfa6009.jpg"
  >
  </vc-image>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      size: ref(5)
    };
  }
});
</script>
