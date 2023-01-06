<template>
  <demo-sort>
    <basic />
    <cn />
    <szjc />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Cn from './cn.vue';
import Szjc from './szjc.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Cn,
    Szjc
  }
});
</script>
