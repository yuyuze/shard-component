<template>
  <demo-sort>
    <basic />
    <Separator />
    <Animate />
    <Memory></Memory>
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Separator from './separator.vue';
import Animate from './animate.vue';
import Memory from './memory.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Separator,
    Animate,
    Memory
  }
});
</script>
