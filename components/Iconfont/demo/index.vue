<template>
  <demo-sort>
    <basic />
    <icon-size></icon-size>
    <test></test>
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import basic from './basic.vue'
import iconSize from './icon-size.vue'
import test from './test.vue';

export default defineComponent({
  doc,
  components: {
    basic,
    iconSize,
    test
  }
});
</script>
