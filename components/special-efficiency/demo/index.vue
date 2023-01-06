<template>
  <demo-sort>
    <basic />
    <LightBlick></LightBlick>
    <NeonLight></NeonLight>
    <PathLine></PathLine>
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import basic from './basic.vue'
import LightBlick from './LightBlick.vue'
import NeonLight from './NeonLight.vue'
import PathLine from './PathLine.vue'

export default defineComponent({
  doc,
  components: {
    basic,
    LightBlick,
    NeonLight,
    PathLine
  }
});
</script>
