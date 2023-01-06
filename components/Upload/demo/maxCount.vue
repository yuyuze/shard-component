<docs>
---
order: 0
title:
  zh-CN: 最大上传数量
  en-US: Type
---

## zh-CN

限制上传最大数量，传入`maxCount`参数

</docs>

<template>
  <vc-upload
    interface="/openApiDev/bus/common/upload"
    @change="changeList"
    :file-list="fileList"
    :maxCount="maxCount"
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
    const maxCount = ref(2);
    const changeList = (list) => {
      fileList.value = list;
    };
    return {
      changeList,
      maxCount,
      fileList
    };
  }
});
</script>
