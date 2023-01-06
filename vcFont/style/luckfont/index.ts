import { createFontSource } from '../../../util/util';
import { baseFontUrl } from '../../config/index';

export function loadCss() {
  const sourceUrl = import.meta.env.VITE_FONT_URL || baseFontUrl;

  createFontSource([
    {
      name: 'luckFont',
      url: `url(${sourceUrl}/font/LuckFont/luckFont.TTF)`
    }
  ]);
}
