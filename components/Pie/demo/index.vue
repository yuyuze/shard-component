<template>
  <demo-sort>
    <basic />
    <pie01></pie01>
    <pie02></pie02>
    <pie03></pie03>
    <pie04></pie04>
    <pie05></pie05>
    <pie06></pie06>
    <pie07></pie07>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import pie01 from './pie01.vue';
import pie02 from './pie02.vue';
import pie03 from './pie03.vue';
import pie04 from './pie04.vue';
import pie05 from './pie05.vue';
import pie06 from './pie06.vue';
import pie07 from './pie07.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    pie01,
    pie02,
    pie03,
    pie04,
    pie05,
    pie06,
    pie07
  },
  setup() {
    return {};
  }
});
</script>
