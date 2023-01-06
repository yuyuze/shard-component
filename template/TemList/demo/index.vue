<template>
  <demo-sort>
    <basic />
    <Cn></Cn>
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Cn from './cn.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Cn
  }
});
</script>
