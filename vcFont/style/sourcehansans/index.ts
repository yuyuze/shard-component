import { createFontSource } from '../../../util/util';
import { baseFontUrl } from '../../config/index';
import { SOURCEHANSANSFont } from './type';

export function loadCss(fonts: SOURCEHANSANSFont[]) {
  const sourceUrl = import.meta.env.VITE_FONT_URL || baseFontUrl;

  const sourceObj = {
    [SOURCEHANSANSFont['SOURCEHANSANS-BOLD']]: {
      name: 'SOURCEHANSANS-BOLD',
      url: `url(${sourceUrl}/font/SOURCEHANSANS/SOURCEHANSANS-BOLD.ttf)`
    },
    [SOURCEHANSANSFont['SOURCEHANSANS-EXTRALIGHT']]: {
      name: 'SOURCEHANSANS-EXTRALIGHT',
      url: `url(${sourceUrl}/font/SOURCEHANSANS/SOURCEHANSANS-EXTRALIGHT.ttf)`
    },
    [SOURCEHANSANSFont['SOURCEHANSANS-HEAVY']]: {
      name: 'SOURCEHANSANS-HEAVY',
      url: `url(${sourceUrl}/font/SOURCEHANSANS/SOURCEHANSANS-HEAVY.ttf)`
    },
    [SOURCEHANSANSFont['SOURCEHANSANS-LIGHT']]: {
      name: 'SOURCEHANSANS-LIGHT',
      url: `url(${sourceUrl}/font/SOURCEHANSANS/SOURCEHANSANS-LIGHT.ttf)`
    },
    [SOURCEHANSANSFont['SOURCEHANSANS-MEDIUM']]: {
      name: 'SOURCEHANSANS-MEDIUM',
      url: `url(${sourceUrl}/font/SOURCEHANSANS/SOURCEHANSANS-MEDIUM.ttf)`
    },
    [SOURCEHANSANSFont['SOURCEHANSANS-NORMAL']]: {
      name: 'SOURCEHANSANS-NORMAL',
      url: `url(${sourceUrl}/font/SOURCEHANSANS/SOURCEHANSANS-NORMAL.ttf)`
    },
    [SOURCEHANSANSFont['SOURCEHANSANS-REGULAR']]: {
      name: 'SOURCEHANSANS-REGULAR',
      url: `url(${sourceUrl}/font/SOURCEHANSANS/SOURCEHANSANS-REGULAR.ttf)`
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
