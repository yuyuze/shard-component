<template>
  <demo-sort>
    <basic />
    <Bg></Bg>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Bg from './bg.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Bg
  },
  setup() {
    return {};
  }
});
</script>
