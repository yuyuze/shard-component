<docs>
---
order: 0
title:
  zh-CN: 图片
  en-US: Type
---

## zh-CN

有时候列表中的项目不仅仅是文字，还需要配合图片一起展示，通过 `colunmn` 中的 `type` 字段，可以将当前的项替换成 `img`

</docs>

<template>
  <vc-list
    height="120px"
    headClassName="imgshow-head"
    rowClassName="imgshow-row"
    rowSpacing="7px"
    :animate="false"
    rowKey="name"
    :data="data"
    :column="column"
  ></vc-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      column: [
        {
          key: 'name',
          name: '场所名称'
        },
        {
          key: 'value',
          name: '监控数量',
          width: 100
        },
        {
          key: 'imgurl',
          name: '',
          type: 'img'
        }
      ],
      data: ref([
        {
          value: 1048,
          name: 'Search Engine',
          imgurl: '/profile/upload/wwbh/视频监控.png'
        },
        {
          value: 735,
          name: 'Direct',
          imgurl: '/profile/upload/wwbh/视频监控.png'
        },
        {
          value: 580,
          name: 'Email',
          imgurl: '/profile/upload/wwbh/视频监控.png'
        },
        {
          value: 484,
          name: 'Union Ads',
          imgurl: '/profile/upload/wwbh/视频监控.png'
        },
        {
          value: 300,
          name: 'Video Ads',
          imgurl: '/profile/upload/wwbh/视频监控.png'
        }
      ])
    };
  }
});
</script>

<style>
.imgshow-head {
  color: #fff;
  background: rgb(4 22 21 / 50%);
}

.imgshow-row {
  height: 50px;
  color: #fff;
  background: rgb(4 22 21 / 20%);
}
</style>
