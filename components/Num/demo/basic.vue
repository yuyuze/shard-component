<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Basic Grid
---

## zh-CN

`val` 参数可接受文本和数字两种类型，当数据具备小数点时默认会开启小数点后两位展示，可通过 `decimals` 来调控展示的位数
当数据为文本时也不会报错，而是直接显示文本

> 当数据为 `1000.00` 时，由于 js 解析默认为 1000，所以不显示小数点
</docs>

<template>
  <vc-group spacing="10" padding="10">
    基本:
    <vc-num :val="1000"></vc-num>
  </vc-group>
  <vc-group spacing="10" padding="10">
    显示小数点:
    <vc-num val="1000.05"></vc-num>
  </vc-group>
  <vc-group spacing="10" padding="10">
    当数据为文本时:
    <vc-num val="这是文本"></vc-num>
  </vc-group>
  <vc-group spacing="10" padding="10">
    整值强制显示小数点:
    <vc-num val="1000" :isMandatory="true"></vc-num>
  </vc-group>
</template>
