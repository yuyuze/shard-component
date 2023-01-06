<template>
  <header id="header" :class="headerClassName">
    <a-row :style="{ flexFlow: 'nowrap', height: 64 }">
      <a-col v-bind="colProps[0]">
        <Logo />
      </a-col>
      <a-col v-bind="colProps[1]" class="menu-row">
        <a-menu
          id="nav"
          :selected-keys="[activeTheme]"
          class="menu-site"
          mode="horizontal"
          disabled-overflow
        >
          <a-menu-item :key="item.meta.key" v-for="item in headerMenu">
            <router-link :to="item.path"> {{ item.meta.title }} </router-link>
          </a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
  </header>
</template>
<script lang="ts">
import { computed, defineComponent, inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { GlobalConfig } from '../../App.vue';
import { GLOBAL_CONFIG } from '../../SymbolKey';
import useMenus from '../../hooks/useMenus';
import Logo from './Logo.vue';

export default defineComponent({
  components: {
    Logo
  },
  setup() {
    const route = useRoute();
    const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG);
    const isHome = computed(() => {
      return ['', 'index', 'index-cn'].includes(route.path);
    });
    const { activeMenuItem, activeTheme, headerMenu } = useMenus();
    const colProps = isHome.value
      ? [{ flex: 'none' }, { flex: 'auto' }]
      : [
        {
          xxxl: 4,
          xxl: 4,
          xl: 5,
          lg: 6,
          md: 6,
          sm: 24,
          xs: 24
        },
        {
          xxxl: 20,
          xxl: 20,
          xl: 19,
          lg: 18,
          md: 18,
          sm: 0,
          xs: 0
        }
      ];
    const visibleAdblockBanner = ref(false);
    watch(globalConfig?.blocked, (val) => {
      visibleAdblockBanner.value = val;
    });
    return {
      headerClassName: {
        clearfix: true,
        'home-header': isHome.value
      },
      colProps,
      activeTheme,
      headerMenu
    };
  }
});
</script>
<style lang="less" src="./index.less"></style>
<style scope>
.adblock-banner {
  position: relative;
  z-index: 100;
  min-width: 1000px;
  padding: 16px;
  color: #8590a6;
  line-height: 28px;
  text-align: center;
  background-color: #ebebeb;
}

.close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
