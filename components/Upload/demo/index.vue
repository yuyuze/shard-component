<template>
  <demo-sort>
    <basic />
    <Multiple></Multiple>
    <MaxCount></MaxCount>
    <OnlyPreview></OnlyPreview>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Multiple from './multiple.vue';
import MaxCount from './maxCount.vue';
import OnlyPreview from './onlyPreview.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Multiple,
    MaxCount,
    OnlyPreview
  },
  setup() {
    return {};
  }
});
</script>
