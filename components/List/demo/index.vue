<template>
  <demo-sort>
    <basic />
    <Row></Row>
    <Imgshow></Imgshow>
  </demo-sort>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import doc from '../doc.md';
import Basic from './basic.vue';
import Row from './row.vue';
import Imgshow from './imgshow.vue';

export default defineComponent({
  doc,
  components: {
    Basic,
    Row,
    Imgshow
  },
  setup() {
    return {};
  }
});
</script>
