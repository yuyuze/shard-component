import { App } from 'vue';
import { injectGlobal } from '@emotion/css';
import { Font } from './index.d';
import { IFont } from './type';

export default {
  async install(app: App, fonts: Font[] | IFont[]) {
    const fontResource = import.meta.glob('./style/**/index.ts');
    const fontUpper = (fonts || []).map((font: string | IFont) => {
      return typeof font === 'string'
        ? font.toLowerCase()
        : font.name.toLowerCase();
    });
    Object.keys(fontResource).forEach((key) => {
      const reg = /.*\/(.*)\/index\.ts/g;
      const res = reg.exec(key);
      if (res) {
        const name = res[1] || '';
        const upperName = name.toLowerCase();

        if (fontUpper.includes(upperName as Font)) {
          const module = fontResource[key];
          module().then((res) => {
            // injectGlobal(`${(res as any).default || ''}`);
            const index = fonts.findIndex((item) => {
              if (typeof item === 'string') {
                return false;
              }
              if (fontUpper.includes(item.name.toLowerCase())) {
                return true;
              }
              return false;
            });
            if (index === -1 && typeof fonts[index] === 'string') {
              res && res.loadCss && res.loadCss([]);
            } else {
              res && res.loadCss && res.loadCss((fonts[index] as any).fonts);
            }
          });
        }
      }
    });
  }
};
