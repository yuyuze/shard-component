<template>
  <demo-sort>
    <basic />
    <prefix />
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Prefix from './prefix.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Prefix
  },
  setup() {
    return {};
  }
});
</script>
