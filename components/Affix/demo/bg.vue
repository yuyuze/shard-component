<!-- eslint-disable-next-line max-len -->
<docs>
---
order: 0
title:
  zh-CN: 背景
  en-US: Type
---

## zh-CN

背景可以调整 Affix 内容的展示，扩充其使用, 通过 `bg` 字段进行设置。可以为 `Base64` 也可以为 `png|jpg` 之类的图片，还能用背景色进行填充。

</docs>

<template>
  <div style="position: relative; width: 100%; height: 200px">
    <vc-affix padding="10" bg="rgba(0,0,0,0.3)"> 这是定位组件 </vc-affix>
    <vc-affix
      top="60"
      padding="10"
      bg="http://ys.hztujing.com:9999/IMSystemV/tjgis/tjglmap/tjmap/levelbox.png"
    >
      这是定位组件
    </vc-affix>
    <vc-affix
      top="120"
      padding="10"
      bg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADe0lEQVRogaVaW3LcMAyjZ/zXS/ea/elNInWy2bgyBJCgszMe25IfAAGSymaPX3/+/o76M99XrHt1vM7jhnMjYs6II76OA/fqOdszTpMEAsW5jGBB6DDBUnLv8WNkRBjodT9gjpEZZHzA+SQAI7mW3SOJZFZhwJGQs6lgMMKDjN/IIxEEhaBZxBmILil8DssPdU2gIj+JtpoPksTKSsz/FZmbtT4PjiInFOAAEF0lmFXWY5XkSPZSREVeKTWSOeVvpUZFLMuV67mnATo9Pr4aAbPISphFNVOCER4Ey0XyJCTw5UylC8Tc5xEkAmSkHBspUoMSeUeYgXf8jhHuAEpzoAjUxBwZU4NAhbJm1Yl2Zi1lt238FImriKzHylJ4bQV+GZ+DLFmy+zdFsMNi9DsWY43r07Jj8msWUAeOKTIbuRMGYyHBJGRjVfRf29QFwFl7ZVaLtSG60VZ5k3mevTxTs6XEmiPMSm4iV42PEXWAomLZfa/3oCKY+O4fN2WOJMSYVTICbO02sWo92TqLuw5wS4mVCOaISnR1XlknUzazUIvkk2TPLLJJXkR4AhEGvFLmRkQlqgMASVUqsPLrkC7L79OEdvzPLNvJgYzM+7mvb2Fu1spu6KyRXOIycXv95LgUqfztkKlIVI1R5ZwK8PYeZi030tl9H6alngSJ3qNy5CeW6iS+q255P7NW9iD0sUvGBfeUcJywvHYeoLyOJTXLiQ4px+Jxzv1BVeJ1+kfL58V72PXfny1HOl3bieLTskwrU7adjUgyEtWyAucqFVL7ZIE8xcWVVx2rOf53x9FO23WqjziRcwA+sVZmV2m/04i4erALsmMrldCVOoF9RNmmOle5UxUNN6lVAfgei07V6loisxEL3Ouc9LVYMGHClznyOn7/ryGzkrO8wRenQSiaM6p4KYvL+BvoyedcxQIAVEVlVYiqxSxlKfKgTCqbMiIIjK0uFIHt/CQWqOziAHNyRYGtOjsjQ7/Xcnzv2kpVNaYGs5lLZFOEeVVVG8yp7OUqKEqVDHyQfeC3KK73O4Cde1wFqBqrIm6f6NrO8T4j64Bf98Gs5UTQWcKgRRWwTnWSFmOdXYHKSmvXdiuYTKVKnev3AZgjjrVi+WlSZTNGdsIcA4gRx7XZdqxypCB1PO0hym6VhXB8+1QN0a08ZSld1m2VbVABpcb/T0T8A0AEDZcJaCz4AAAAAElFTkSuQmCC"
    >
      这是定位组件
    </vc-affix>
  </div>
</template>
