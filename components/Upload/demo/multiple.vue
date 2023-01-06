<docs>
---
order: 0
title:
  zh-CN: 多选
  en-US: Type
---

## zh-CN

多选参数

</docs>

<template>
  <vc-upload
    interface="/openApiDev/bus/common/upload"
    @change="changeList"
    :file-list="fileList"
    multiple
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

    const changeList = () => {};
    return {
      fileList,
      changeList
    };
  }
});
</script>
