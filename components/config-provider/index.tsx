import type {
  PropType,
  ExtractPropTypes,
  UnwrapRef,
  App,
  Plugin,
  WatchStopHandle
} from 'vue';
import { reactive, provide, defineComponent, watch, watchEffect } from 'vue';
import PropTypes from '../../util/vue-types';
import type { MaybeRef } from '../../util/type';
import { CONFIG_PROVIDER } from '../../util/SymbolKey';
// import ContextMenu from './ContextMenu';

// export type { RenderEmptyHandler };

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

export const configConsumerProps = [
  'getTargetContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'pageHeader'
];

export const defaultPrefixCls = 'vc';

function getGlobalPrefixCls() {
  return globalConfigForApi.prefixCls || defaultPrefixCls;
}
const globalConfigByCom = reactive<ConfigProviderProps>({});
const globalConfigBySet = reactive<ConfigProviderProps>({}); // 权重最大
export const globalConfigForApi = reactive<
  ConfigProviderProps & {
    getRootPrefixCls?: (
      rootPrefixCls?: string,
      customizePrefixCls?: string
    ) => string;
  }
>({});

watchEffect(() => {
  Object.assign(globalConfigForApi, globalConfigByCom, globalConfigBySet);
  globalConfigForApi.prefixCls = getGlobalPrefixCls();
  globalConfigForApi.getPrefixCls = (
    suffixCls?: string,
    customizePrefixCls?: string
  ) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls
      ? `${globalConfigForApi.prefixCls}-${suffixCls}`
      : globalConfigForApi.prefixCls;
  };
  globalConfigForApi.getRootPrefixCls = (
    rootPrefixCls?: string,
    customizePrefixCls?: string
  ) => {
    // Customize rootPrefixCls is first priority
    if (rootPrefixCls) {
      return rootPrefixCls;
    }

    // If Global prefixCls provided, use this
    if (globalConfigForApi.prefixCls) {
      return globalConfigForApi.prefixCls;
    }

    // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls
    if (customizePrefixCls && customizePrefixCls.includes('-')) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls();
  };
});

type GlobalConfigProviderProps = {
  prefixCls?: MaybeRef<ConfigProviderProps['prefixCls']>;
};

let stopWatchEffect: WatchStopHandle;
const setGlobalConfig = (params: GlobalConfigProviderProps) => {
  if (stopWatchEffect) {
    stopWatchEffect();
  }
  stopWatchEffect = watchEffect(() => {
    Object.assign(globalConfigBySet, reactive(params));
  });
};

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls
      ? `${getGlobalPrefixCls()}-${suffixCls}`
      : getGlobalPrefixCls();
  },
  getRootPrefixCls: (rootPrefixCls?: string, customizePrefixCls?: string) => {
    // Customize rootPrefixCls is first priority
    if (rootPrefixCls) {
      return rootPrefixCls;
    }

    // If Global prefixCls provided, use this
    if (globalConfigForApi.prefixCls) {
      return globalConfigForApi.prefixCls;
    }

    // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls
    if (customizePrefixCls && customizePrefixCls.includes('-')) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls();
  }
});

export const configProviderProps = {
  prefixCls: String,
  getPrefixCls: {
    type: Function as PropType<
      (suffixCls?: string, customizePrefixCls?: string) => string
    >
  },
  api: String,
  isDev: Boolean,
  isProd: Boolean
};

export type ConfigProviderProps = Partial<
  ExtractPropTypes<typeof configProviderProps>
>;

const ConfigProvider = defineComponent({
  name: 'VcConfigProvider',
  inheritAttrs: false,
  props: configProviderProps,
  setup(props, { slots }) {
    const getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls = defaultPrefixCls } = props;

      if (customizePrefixCls) return customizePrefixCls;

      return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
    };

    const configProvider = reactive({
      ...props,
      getPrefixCls
    });

    Object.keys(props).forEach((key) => {
      watch(
        () => props[key],
        () => {
          configProvider[key] = props[key];
        }
      );
    });

    provide(CONFIG_PROVIDER, configProvider);

    const renderProvider = () => {
      return (
        <>
          {/* <ContextMenu></ContextMenu> */}
          {slots.default?.()}
        </>
      );
    };

    return () => renderProvider();
  }
});

export const defaultConfigProvider: UnwrapRef<ConfigProviderProps> = reactive({
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
  },
  direction: 'ltr'
});

ConfigProvider.config = setGlobalConfig;

ConfigProvider.install = (app: App) => {
  app.component(ConfigProvider.name, ConfigProvider);
};

export default ConfigProvider as typeof ConfigProvider &
  Plugin & {
    readonly config: typeof setGlobalConfig;
  };
