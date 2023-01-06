<template>
  <demo-sort>
    <basic />
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';

export default defineComponent({
  doc,
  components: {
    Basic
  },
  setup() {
    return {};
  }
});
</script>
