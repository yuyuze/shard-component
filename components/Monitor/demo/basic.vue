<docs>
---
order: 0
title:
  zh-CN: video
  en-US: Type
---

## zh-CN

使用 video 标签播放监控视频

</docs>

<template>
  <a-input-group compact>
    <a-input
      v-model:value="val"
      addon-before="取流地址"
      style="width: calc(100% - 80px)"
    />
    <a-button type="primary" @click="play">播放</a-button>
  </a-input-group>

  <br />
  <vc-monitor :src="hls" @log="log"></vc-monitor>
  <br />
  <a-card style="height: 120px;overflow-y: scroll;">
    <p v-for="(item, index) in logList" :key="index">
      信息: {{ item.text }}
      <br />
      流地址: {{item.hls}}
    </p>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const val = ref(
      'http://218.75.103.42:7086/live/cameraid/1000001%240/substream/1.m3u8'
    );
    const hls = ref(
      'http://218.75.103.42:7086/live/cameraid/1000001%240/substream/1.m3u8'
    );
    const logList = ref<any[]>([]);
    return {
      val,
      hls,
      logList,
      play: () => {
        hls.value = val.value;
      },
      log: (log) => {
        console.log(log);
        logList.value.push(log);
      }
    };
  }
});
</script>
