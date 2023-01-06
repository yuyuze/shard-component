import { groupBy, sortBy } from 'lodash-es';
import type { ComputedRef } from 'vue';
import { computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GLOBAL_CONFIG } from '../SymbolKey';
import { routes as HeaderMenus } from '../router';

const typeOrder: any = {
  组件总览: { order: -1, en: 'Overview' },
  组件: { order: 1, en: 'Components' },
  基础: { order: 1, en: 'Base' },
  模板: { order: 1, en: 'Tem' },
  布局: { order: 2, en: 'Layout' },
  背景: { order: 2, en: 'Background' },
  图表: { order: 2, en: 'Chart' },
  低代码: { order: 2, en: 'LowCode' },
  设备: { order: 2, en: 'Equipment' },
  动画: { order: 3, en: 'Animate' },
  其他: { order: 4, en: 'Other' },
  核心: { order: 4, en: 'Core' }
};

const useMenus = (): {
  menus: ComputedRef<any[]>;
  dataSource: ComputedRef<any[]>;
  currentMenuIndex: ComputedRef<number>;
  activeMenuItem: ComputedRef<string>;
  activeTheme: ComputedRef<string>;
  headerMenu: ComputedRef<any[]>;
} => {
  const route = useRoute();
  const router = useRouter();
  const routes = router.getRoutes();
  const globalConfig = inject<any>(GLOBAL_CONFIG);
  const menus = computed(() => {
    const path = route.path;
    const category = path.split('/')[1];
    const pattern = /^\/iframe/;
    const docs = ['guide', 'design', 'interaction'];
    // 过滤 category
    const ms = routes
      .filter((r) => {
        const inCategory =
          r.meta &&
          r.meta.category &&
          (r.meta.category as string).toLowerCase() === category &&
          !pattern.test(r.path);
        // 文档系列判断
        if (inCategory && docs.includes(category)) {
          return true;
        }
        return inCategory;
      })
      .map((r) => ({ ...r.meta, path: r.path }));
    return ms;
  });
  const activeMenuItem = computed(() => {
    return route.path;
  });
  const activeTheme = computed(() => {
    return route.path.split('/')[1];
  });
  const currentMenuIndex = computed(() => {
    return menus.value.findIndex((m) => m.path === activeMenuItem.value);
  });

  const headerMenu = computed(() => {
    return HeaderMenus
      ? HeaderMenus.filter((e) => e.children && e.children.length > 0)
      : [];
  });

  const dataSource = computed(() => {
    const group = groupBy(menus.value, (m: any) => m.type || m.category);
    const keys: string[] = Object.keys(group);
    const newMenus = keys
      .map((key) => {
        return {
          title: key,
          order: typeOrder[key] && typeOrder[key].order,
          enTitle: typeOrder[key] && typeOrder[key].en,
          children: sortBy(group[key], 'title')
        };
      })
      .sort((a, b) => a.order - b.order);
    return keys.length === 1 ? menus.value : newMenus;
  });

  return {
    menus,
    dataSource,
    activeMenuItem,
    currentMenuIndex,
    activeTheme,
    headerMenu
  };
};

export default useMenus;
