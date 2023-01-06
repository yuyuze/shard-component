<template>
  <demo-sort>
    <basic />
    <type />
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Type from './type.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Type
  },
  setup() {
    return {};
  }
});
</script>
