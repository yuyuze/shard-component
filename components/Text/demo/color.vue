<docs>
---
order: 0
title:
  zh-CN: 颜色
  en-US: Combination
---

## zh-CN

文本的颜色根据使用情况有两种区别，一种是纯色，一种是渐变。`color` 能根据传入的参数不同来实现渐变和纯色双向切换

## en-US

空

</docs>

<template>
  <a-row>
    <a-col :span="12">
      <vc-text color="red" val="这是一行文本这是一行文本"></vc-text>
    </a-col>
    <a-col :span="12">
      <vc-text :color="['red', 'blue']" val="这是一行文本"></vc-text>
    </a-col>
    <a-col :span="12" style="margin-top: 32px">
      <vc-text
        val="这是一行文本"
        block
        :color="['red 0%', 'blue 25%', 'yellow 50%', 'green 75%', '#000 100%']"
      >
      </vc-text>
    </a-col>
  </a-row>
</template>
