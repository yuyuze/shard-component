<template>
  <demo-sort>
    <basic />
    <Arrangement></Arrangement>
    <Vertical></Vertical>
    <Color></Color>
    <Newline></Newline>
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Arrangement from './arrangement.vue';
import Vertical from './vertical.vue';
import Color from './color.vue';
import Newline from './newline.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Arrangement,
    Vertical,
    Color,
    Newline
  }
});
</script>
