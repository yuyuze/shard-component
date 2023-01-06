<template>
  <demo-sort>
    <basic />
    <Virtual></Virtual>
    <Auto></Auto>
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Virtual from './virtual.vue';
import Auto from './auto.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Virtual,
    Auto
  }
});
</script>
