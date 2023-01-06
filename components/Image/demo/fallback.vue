<docs>
---
order: 0
title:
  zh-CN: 加载失败
  en-US: Type
---

## zh-CN

图片加载失败后，会显示一个默认图片。通过 `fallback` 参数可以设置需要显示的默认图片

</docs>

<template>
  <vc-group :spacing="20">
    <vc-image
      width="200"
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuu.png"
    >
    </vc-image>

    <vc-image
      width="200"
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuu.png"
      fallback="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/f53decdde71190ef1f5b3dc8c11b9d16fdfa6009.jpg"
    >
    </vc-image>
  </vc-group>
</template>
