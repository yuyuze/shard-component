<template>
  <demo-sort>
    <Basic></Basic>
    <Circle></Circle>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Circle from './circle.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Circle
  },
  setup() {
    return {};
  }
});
</script>
