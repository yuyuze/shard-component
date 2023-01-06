<docs>
---
order: 0
title:
  zh-CN: 省略号
  en-US: Combination
---

## zh-CN

当一段文本过长时，就需要添加省略号，`ellipsis` 则可以开启省略号功能，默认单行，传入数字时开启多行(仅支持-webkit-，且一定要具备宽度)

## en-US

空

</docs>

<template>
  <a-row>
    <a-col :span="12">
      <a-structure top="单行省略">
        <vc-text ellipsis :width="100" val="这是一行文本这是一行文本"></vc-text>
      </a-structure>
    </a-col>
    <a-col :span="12">
      <a-structure top="多行省略">
        <vc-text
          :ellipsis="2"
          :width="100"
          val="这是一个巨大的文本量这是一个巨大的文本量这是一个巨大的文本量这是一个巨大的文本量"
        >
        </vc-text>
      </a-structure>
    </a-col>
  </a-row>
</template>
