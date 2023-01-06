<docs>
---
order: 0
title:
  zh-CN: 只预览不上传
  en-US: Type
---

## zh-CN

传入参数`onlyPreview`为`true`时，只预览不上传

</docs>

<template>
  <vc-upload
    interface="/openApiDev/bus/common/upload"
    :file-list="fileList"
    onlyPreview
  ></vc-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const fileList = ref([
      {
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ]);
    return {
      fileList
    };
  }
});
</script>
