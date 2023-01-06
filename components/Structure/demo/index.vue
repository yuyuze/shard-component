<template>
  <demo-sort>
    <basic />
    <Tb></Tb>
    <Lr></Lr>
    <Block></Block>
    <Nested></Nested>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Block from './block.vue';
import Nested from './nested.vue';
import Tb from './tb.vue';
import Lr from './lr.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Block,
    Nested,
    Tb,
    Lr
  },
  setup() {
    return {};
  }
});
</script>
