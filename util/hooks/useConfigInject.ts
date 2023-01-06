import type { ComputedRef, UnwrapRef } from 'vue';
import { computed, inject } from 'vue';
import type { ConfigProviderProps } from '../../components/config-provider';
import { defaultConfigProvider } from '../../components/config-provider';
import { CONFIG_PROVIDER } from '../SymbolKey';

/**
 * @description: 获取从 ConfigProvider 注入的全局参数
 * @param {ComputedRef} prefixCls class 前缀
 * @param {string} api 当前项目的请求前缀
 * @param {boolean} isDev 当前环境是否为 dev 开发环境
 * @param {boolean} isProd 当前环境是否为 prod 生产环境
 * @example
 * const { prefixCls } = useConfigInject('name', props);
 * @author: Guixiang
 */
export default (
  name: string,
  props: Record<any, any>,
): {
  prefixCls: ComputedRef<string>;
  api: string;
  isDev: boolean;
  isProd: boolean;
} => {
  const configProvider = inject<UnwrapRef<ConfigProviderProps>>(
    CONFIG_PROVIDER,
    defaultConfigProvider,
  );
  const prefixCls = computed(() => configProvider.getPrefixCls(name, props.prefixCls));

  return {
    prefixCls,
    api: configProvider.api,
    isDev: Boolean(configProvider.isDev),
    isProd: Boolean(configProvider.isProd)
  };
};
