<template>
  <demo-sort>
    <basic />
    <Ellipsis></Ellipsis>
    <Color></Color>
    <Dates></Dates>
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Ellipsis from './ellipsis.vue';
import Color from './color.vue';
import Dates from './date.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Ellipsis,
    Color,
    Dates
  }
});
</script>
