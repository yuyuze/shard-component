<template>
  <h1>
    <a id="logo" :href="'/'">
      <img alt="logo" :src="logo" />
      VC-综合化平台
    </a>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import logo from '../../assets/logo.png';

export default defineComponent({
  setup() {
    return { logo };
  },
});
</script>

<style lang="less" scoped>
@import '../../theme/static/theme.less';
@import './index.less';

#logo {
  height: @header-height;
  padding-left: 40px;
  overflow: hidden;
  color: @site-heading-color;
  font-size: 18px;
  font-family: Avenir, @font-family, sans-serif;
  line-height: @header-height;
  white-space: nowrap;
  text-decoration: none;

  .ant-row-rtl & {
    float: right;
    padding-right: 40px;
    padding-left: 0;
  }

  img {
    position: relative;
    top: -1.5px;
    height: 32px;
    margin-right: 10px;

    .ant-row-rtl & {
      margin-right: 0;
      margin-left: 16px;
    }
  }
}

@media only screen and (max-width: @mobile-max-width) {
  #logo {
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
