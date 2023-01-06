<template>
  <demo-sort>
    <basic />
    <Filter></Filter>
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Filter from './filter.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Filter
  }
});
</script>
