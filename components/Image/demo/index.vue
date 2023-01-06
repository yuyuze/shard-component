<template>
  <demo-sort>
    <basic />
    <Fallback></Fallback>
    <Radius></Radius>
    <Lazy></Lazy>
    <Api></Api>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Fallback from './fallback.vue';
import Lazy from './lazy.vue';
import Radius from './radius.vue';
import Api from './api.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Fallback,
    Lazy,
    Radius,
    Api
  },
  setup() {
    return {};
  }
});
</script>
