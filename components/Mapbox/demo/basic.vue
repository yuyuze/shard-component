<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Type
---

## zh-CN

通过 `mapkey` 参数传入地图密钥即可生成对应地图。当 `mapkey` 发生变化的时候，地图也会对应的发生变化

</docs>

<template>
  <a-radio-group v-model:value="value" name="radioGroup">
    <a-radio v-for="item of keyList" :key="item.key" :value="item.key">{{
      item.name
    }}</a-radio>
  </a-radio-group>
  <div style="height: 500px">
    <vc-mapbox :mapkey="value"></vc-mapbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value:
        'OUsBl8BZsn8HT-vB13JogDc14DZ1JKK1Rilf_6fHj_xgpbrlVcSXBGFtsRAXO_oMmSHJKomzOP7i8n2dxYXo7sFoysXq0nUs',
      keyList: ref([
        {
          name: '东莲',
          key: 'OUsBl8BZsn8HT-vB13JogDc14DZ1JKK1Rilf_6fHj_xgpbrlVcSXBGFtsRAXO_oMmSHJKomzOP7i8n2dxYXo7sFoysXq0nUs'
        },
        {
          name: '棠棣',
          key: 'OUsBl8BZsn8HT-vB13JogDc14DZ1JKK1Rilf_6fHj_xgpbrlVcSXBGFtsRAXO_oMmSHJKomzOP7i8n2dxYXo7sFoysXq0nUs'
        }
      ])
    };
  }
});
</script>
