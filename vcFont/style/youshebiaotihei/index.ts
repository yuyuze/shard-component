import { url } from 'inspector';
import { createFontSource } from '../../../util/util';
import { baseFontUrl } from '../../config/index';

export function loadCss() {
  const sourceUrl = import.meta.env.VITE_FONT_URL || baseFontUrl;
  createFontSource([
    {
      name: 'YouSheBiaoTiHei',
      url: `url(${sourceUrl}/font/YouSheBiaoTiHei/YouSheBiaoTiHei.ttf)`
    }
  ]);
}
