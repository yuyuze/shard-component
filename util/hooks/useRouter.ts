import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/**
 * @description 简化获取路由信息
 * @returns route  路由信息
 * @returns router  路由对象
 * @returns currentRoute  当前路由路径
 */
export function useRouters() {
  const route = useRoute();
  const router = useRouter();
  // 当前的路由
  const currentRoute = computed(() => {
    return route.path;
  });
  return {
    route,
    router,
    currentRoute
  };
}
