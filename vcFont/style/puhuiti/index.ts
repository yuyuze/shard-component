import { createFontSource } from '../../../util/util';
import { baseFontUrl } from '../../config/index';
import { PuhuitiFont } from './type';

export function loadCss(fonts: PuhuitiFont[]) {
  const sourceUrl = import.meta.env.VITE_FONT_URL || baseFontUrl;

  const sourceObj = {
    [PuhuitiFont['Alibaba-PuHuiTi-Bold']]: {
      name: 'Alibaba-PuHuiTi-Bold',
      url: `url(${sourceUrl}/font/PuHuiTi/Alibaba-PuHuiTi-Bold.otf)`
    },
    [PuhuitiFont['Alibaba-PuHuiTi-Heavy']]: {
      name: 'Alibaba-PuHuiTi-Heavy',
      url: `url(${sourceUrl}/font/PuHuiTi/Alibaba-PuHuiTi-Heavy.otf)`
    },
    [PuhuitiFont['Alibaba-PuHuiTi-Light']]: {
      name: 'Alibaba-PuHuiTi-Light',
      url: `url(${sourceUrl}/font/PuHuiTi/Alibaba-PuHuiTi-Light.otf)`
    },
    [PuhuitiFont['Alibaba-PuHuiTi-Medium']]: {
      name: 'Alibaba-PuHuiTi-Medium',
      url: `url(${sourceUrl}/font/PuHuiTi/Alibaba-PuHuiTi-Medium.otf)`
    },
    [PuhuitiFont['Alibaba-PuHuiTi-Regular']]: {
      name: 'Alibaba-PuHuiTi-Regular',
      url: `url(${sourceUrl}/font/PuHuiTi/Alibaba-PuHuiTi-Regular.otf)`
    }
  };
  const loadSource = fonts
    .map((item) => {
      if (sourceObj[item]) {
        return sourceObj[item];
      }
      return undefined;
    })
    .filter((item) => {
      return item;
    });
  createFontSource(loadSource as any);
}
