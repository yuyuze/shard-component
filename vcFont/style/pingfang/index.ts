import { createFontSource } from '../../../util/util';
import { PingFangFont } from './type';
import { baseFontUrl } from '../../config/index';

export function loadCss(fonts: PingFangFont[]) {
  const sourceUrl = import.meta.env.VITE_FONT_URL || baseFontUrl;
  const sourceObj = {
    [PingFangFont['PingFang-Medium']]: {
      name: 'PingFang-Medium',
      url: `url(${sourceUrl}/font/PingFang/PINGFANG_MEDIUM.TTF)`
    },
    [PingFangFont.PingFang]: {
      name: 'PingFang',
      url: `url(${sourceUrl}/font/PingFang/PINGFANG_MEDIUM.TTF)`
    },
    [PingFangFont['PingFang-Bold']]: {
      name: 'PingFang-Bold',
      url: `url(${sourceUrl}/font/PingFang/PINGFANG_BOLD.TTF)`
    },
    [PingFangFont['PingFang-SC-Regular']]: {
      name: 'PingFang-SC-Regular',
      url: `url(${sourceUrl}/font/PingFang/PINGFANG_REGULAR.TTF)`
    },
    [PingFangFont['PingFang-Extralight']]: {
      name: 'PingFang-Extralight',
      url: `url(${sourceUrl}/font/PingFang/PINGFANG_EXTRALIGHT.TTF)`
    },
    [PingFangFont['PingFang-Heavy']]: {
      name: 'PingFang-Heavy',
      url: `url(${sourceUrl}/font/PingFang/PINGFANG_HEAVY.TTF)`
    },
    [PingFangFont['PingFang-light']]: {
      name: 'PingFang-light',
      url: `url(${sourceUrl}/font/PingFang/PINGFANG_LIGHT.TTF)`
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
