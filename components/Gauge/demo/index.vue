<template>
  <demo-sort>
    <Basic></Basic>
    <Advanced></Advanced>
    <Double></Double>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Advanced from './advanced.vue';
import Double from './double.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Advanced,
    Double
  },
  setup() {
    return {};
  }
});
</script>
