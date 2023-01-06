<template>
  <demo-sort :cols="1">
    <basic />
    <Dyh></Dyh>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Dyh from './dyh.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Dyh
  },
  setup() {
    return {};
  }
});
</script>
