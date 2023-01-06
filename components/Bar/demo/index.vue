<template>
  <demo-sort>
    <Basic></Basic>
    <Gradual></Gradual>
    <Stereo></Stereo>
    <Circle></Circle>
    <Circle2></Circle2>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Gradual from './gradual.vue';
import Stereo from './stereo.vue';
import Circle from './circle.vue';
import Circle2 from './circle2.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Gradual,
    Stereo,
    Circle,
    Circle2
  },
  setup() {
    return {};
  }
});
</script>
