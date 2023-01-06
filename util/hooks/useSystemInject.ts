import { inject, ref, unref } from 'vue';
import {
  CONFIG_CONTROL,
  CONFIG_ANALYSIS,
  CONFIG_VISUALIZATION,
  CONFIG_RESOURCES
} from '../SymbolKey';

export const defaultConfigControl = {
  backgroundUrl: '',
  logoUrl: '',
  headerRouter: [],
  nav: [],
  theme: '',
  title: '',
  plugins: []
};

// 系统 code
const SystemCode = {
  control: CONFIG_CONTROL,
  visualization: CONFIG_VISUALIZATION,
  analysis: CONFIG_ANALYSIS,
  resources: CONFIG_RESOURCES
};

export default (code: keyof typeof SystemCode) => {
  const refConfig = inject(SystemCode[code], ref(defaultConfigControl));
  const unrefConfig = unref(refConfig);
  return {
    ...unrefConfig
  };
};
