import { createFontSource } from '../../../util/util';
import { baseFontUrl } from '../../config/index';

export function loadCss() {
  const sourceUrl = import.meta.env.VITE_FONT_URL || baseFontUrl;
  createFontSource([
    {
      name: 'Din',
      url: `url(${sourceUrl}/font/Din/DIN-Pro-Regular-2.otf)`
    }
  ]);
}
