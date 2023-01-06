<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Type
---

## zh-CN

基础的上传组件使用方式，默认是单文件上传，宽高可以设置，默认只能上传图片。
音频、视频或其他格式文件，可以通过 `accept` 进行配置

</docs>

<template>
  <vc-upload
    interface="/openApiDev/bus/common/upload"
    @change="changeList"
  ></vc-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const fileList = ref([]);

    const changeList = (list) => {
      fileList.value = list;
    };
    return {
      changeList
    };
  }
});
</script>
