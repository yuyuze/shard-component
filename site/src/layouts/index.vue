<template>
  <Header />
  <div class="main-wrapper">
    <!-- 判断是否为移动端 -->
    <a-row>
      <template v-if="isMobile">
        <a-drawer
          key="mobile-menu"
          :closable="false"
          placement="left"
          class="drawer drawer-left"
          :visible="visible"
          wrapper-class-name="drawer-wrapper"
          width="60%"
        >
          <Menu
            :menus="dataSource"
            :active-menu-item="activeMenuItem"
            :is-zh-c-n="isZhCN"
          />
          <template #handle>
            <div class="drawer-handle" @click="handleClickShowButton">
              <close-outlined v-if="visible" :style="iconStyle" />
              <MenuOutlined v-else :style="iconStyle" />
            </div>
          </template>
        </a-drawer>
      </template>
      <template v-else>
        <a-col
          :xxxl="4"
          :xxl="4"
          :xl="5"
          :lg="6"
          :md="6"
          :sm="24"
          :xs="24"
          class="main-menu"
        >
          <a-affix>
            <section class="main-menu-inner">
              <!-- <div></div> -->
              <Menu
                :menus="dataSource"
                :active-menu-item="activeMenuItem"
                :is-zh-c-n="isZhCN"
              />
            </section>
          </a-affix>
        </a-col>
      </template>
      <a-col :xxxl="20" :xxl="20" :xl="19" :lg="18" :md="18" :sm="24" :xs="24">
        <section ref="Scroll" :class="mainContainerClass">
          <div class="main-container-content">
            <Demo v-if="isDemo" :page-data="pageData" :is-zh-c-n="isZhCN">
              <component :is="matchCom" />
            </Demo>
            <router-view v-else />

            <a-affix v-if="headers.length" class="toc-affix" :offset-top="20">
              <a-anchor>
                <a-anchor-link
                  v-for="h in headers"
                  :key="h.title"
                  :href="h.href || `#${slugifyTitle(h.title)}`"
                  :title="h.title"
                ></a-anchor-link>
              </a-anchor>
            </a-affix>
          </div>
          <PrevAndNext
            :menus="menus"
            :current-menu-index="currentMenuIndex"
            :is-zh-c-n="isZhCN"
          />
        </section>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, computed, ref, provide, watch } from 'vue';
import { useRoute } from 'vue-router';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons-vue';
import type { GlobalConfig } from '../App.vue';
import { GLOBAL_CONFIG } from '../SymbolKey';
import Header from './header/index.vue';
import Menu from './Menu.vue';
import PrevAndNext from './PrevAndNext.vue';
import Demo from './Demo.vue';
import useMenus from '../hooks/useMenus';

// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001f]/g;
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;

export default defineComponent({
  name: 'Layout',
  components: {
    Demo,
    Header,
    Menu,
    PrevAndNext,
    CloseOutlined,
    MenuOutlined
  },
  setup() {
    const visible = ref(false);
    const route = useRoute();
    const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG);
    const { menus, activeMenuItem, currentMenuIndex, dataSource } = useMenus();
    const Scroll = ref(null);

    const demos = ref<any[]>([]);

    provide('addDemosInfo', (info: any) => {
      if (!demos.value.find((d) => d.href === info.href)) {
        demos.value.push(info);
      }
    });

    watch(
      () => route.path,
      () => {
        Scroll.value.scrollTo(0, 0);
        visible.value = false;
        demos.value.length = 0;
      }
    );

    const matchCom = computed(() => {
      return route.matched[route.matched.length - 1]?.components?.default;
    });

    // 判断进入的页面是否为示例页面
    const isDemo = computed(() => {
      return !!(matchCom.value as any).doc;
      // return (
      //   route.path.indexOf('/components') === 0 &&
      //   route.path.indexOf('/components/overview') !== 0
      // );
    });

    const isZhCN = globalConfig.isZhCN;
    const pageData = computed(() => {
      if (isDemo.value) {
        return (matchCom.value as any).doc?.pageData;
      }
      return (matchCom.value as any)?.pageData;
    });

    const headers = computed(() => {
      if (isDemo.value) {
        return [...demos.value, { title: 'API', href: '#API' }];
      }
      return (pageData.value?.headers || []).filter(
        (h: Header) => h.level === 2
      );
    });

    const mainContainerClass = computed(() => {
      return {
        'main-container': true,
        'main-container-component': isDemo.value
      };
    });
    const handleClickShowButton = () => {
      visible.value = !visible.value;
    };
    return {
      slugifyTitle: (str: string) => {
        return (
          str
            // Remove control characters
            .replace(rControl, '')
            // Replace special characters
            .replace(rSpecial, '-')
            // Remove continuos separators
            .replace(/\-{2,}/g, '-')
            // Remove prefixing and trailing separtors
            .replace(/^\-+|\-+$/g, '')
            // ensure it doesn't start with a number (#121)
            .replace(/^(\d)/, '_$1')
        );
      },
      visible,
      isMobile: globalConfig.isMobile,
      isZhCN,
      mainContainerClass,
      menus,
      currentMenuIndex,
      activeMenuItem,
      headers,
      isDemo,
      matchCom,
      pageData,
      dataSource,
      handleClickShowButton,
      iconStyle: {
        fontSize: '20px'
      },
      Scroll
    };
  }
});
</script>

<style lang="less" scoped>
.toc-affix :deep(.ant-anchor) {
  max-width: 110px;
  font-size: 12px;

  .ant-anchor-link {
    padding: 4px 0 4px 16px;
    border-left: 2px solid #f0f0f0;
  }

  .ant-anchor-link-active {
    border-left: 2px solid #1890ff;
  }

  .ant-anchor-ink::before {
    display: none;
  }

  .ant-anchor-ink-ball {
    display: none;
  }
}
</style>
