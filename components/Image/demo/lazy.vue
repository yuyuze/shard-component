<docs>
---
order: 0
title:
  zh-CN: 懒加载
  en-US: Type
---

## zh-CN

默认开启懒加载模式，通过 `lazy` 参数进行切换

</docs>

<template>
  <div class="scroll">
    <vc-group direction="column" :spacing="30">
      <vc-image
        v-for="item of data"
        :key="item.src"
        width="400"
        :src="item.src"
      >
      </vc-image>
    </vc-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      data: ref([
        {
          src: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/img1.jpg'
        },
        {
          src: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/img2.jpg'
        },
        {
          src: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/img3.png'
        },
        {
          src: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/img4.jpg'
        },
        {
          src: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/img5.jpg'
        },
        {
          src: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/img6.jpg'
        },
        {
          src: 'http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/img7.jpg'
        }
      ])
    };
  }
});
</script>

<style scoped>
.scroll {
  height: 400px;
  overflow-y: scroll;
}
</style>
