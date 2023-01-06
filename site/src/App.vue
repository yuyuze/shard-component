<template>
  <vc-config-provider
    api="http://ys.hztujing.com:9999/GIMSystemV"
    :isDev="isDev"
    :isProd="isProd"
  >
    <router-view />
  </vc-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue';
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useMediaQuery from './hooks/useMediaQuery';
import { GLOBAL_CONFIG } from './SymbolKey';

export interface GlobalConfig {
  isMobile: Ref<boolean>;
  lang: Ref<'zh-CN' | 'en-US'>;
  isZhCN: Ref<boolean>;
  responsive: Ref<null | 'narrow' | 'crowded'>;
  blocked: Ref<boolean>;
}
export default defineComponent({
  setup() {
    const i18n = useI18n();
    const colSize = useMediaQuery();
    const isMobile = computed(
      () => colSize.value === 'sm' || colSize.value === 'xs'
    );
    const theme = ref(localStorage.getItem('theme') || 'default');
    const responsive = computed(() => {
      if (colSize.value === 'xs') {
        return 'crowded';
      }
      if (colSize.value === 'sm') {
        return 'narrow';
      }
      return null;
    });
    const globalConfig: GlobalConfig = {
      isMobile,
      responsive,
      lang: computed<any>(() => i18n.locale.value),
      isZhCN: computed(() => i18n.locale.value === 'zh-CN'),
      blocked: ref(false)
    };
    const changeTheme = (t: string) => {
      theme.value = t;
      localStorage.setItem('theme', t);
    };
    provide('themeMode', {
      theme,
      changeTheme
    });
    provide(GLOBAL_CONFIG, globalConfig);
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'adsbox';
      document.body.appendChild(div);
      globalConfig.blocked.value = getComputedStyle(div).display === 'none';
    }, 300);
    // watch(
    //   theme,
    //   () => {
    //     if (theme.value === 'dark') {
    //       document.getElementsByTagName('html')[0].setAttribute('data-doc-theme', 'dark');
    //       document.getElementsByTagName('body')[0].setAttribute('data-theme', 'dark');
    //     } else {
    //       document.getElementsByTagName('html')[0].setAttribute('data-doc-theme', 'light');
    //       document.getElementsByTagName('body')[0].setAttribute('data-theme', 'light');
    //     }
    //   },
    //   { immediate: true },
    // );
    return {
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD
    };
  }
});
</script>
