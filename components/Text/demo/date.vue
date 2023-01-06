<docs>
---
order: 0
title:
  zh-CN: 日期
  en-US: Combination
---

## zh-CN

当文本为日期时，我们提供了一种方便的转换方式，可以将日期转换为需要的时间格式

## en-US

空

</docs>

<template>
  <a-row>
    <a-col :span="12">
      <vc-group spacing="10" padding="10">
        默认格式:
        <vc-text format :val="new Date()"></vc-text>
      </vc-group>
    </a-col>
    <a-col :span="12">
      <vc-group spacing="10" padding="10">
        年月日:
        <vc-text format="YYYY年MM月DD日" :val="new Date()"></vc-text>
      </vc-group>
    </a-col>
    <a-col :span="12" style="margin-top: 32px">
      <vc-group spacing="10" padding="10">
        日期时间:
        <vc-text format="YYYY-MM-DD HH:mm:ss" :val="new Date()"></vc-text>
      </vc-group>
    </a-col>
    <a-col :span="12" style="margin-top: 32px">
      <vc-group spacing="10" padding="10">
        日期上下午时间:
        <vc-text format="MM-DD A HH:mm:ss" :val="new Date()"></vc-text>
      </vc-group>
    </a-col>
    <a-col :span="12" style="margin-top: 32px">
      <vc-group spacing="10" padding="10">
        日期星期:
        <vc-text format="MM-DD 星期d" :val="new Date()"></vc-text>
      </vc-group>
    </a-col>
    <a-col :span="12" style="margin-top: 32px">
      <vc-group spacing="10" padding="10">
        年月日周:
        <vc-text format="YYYY-MM-DD 第w周" :val="new Date()"></vc-text>
      </vc-group>
    </a-col>
  </a-row>
</template>
