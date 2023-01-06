import { createFontSource } from '../../../util/util';
import { baseFontUrl } from '../../config/index';

export function loadCss() {
  const sourceUrl = import.meta.env.VITE_FONT_URL || baseFontUrl;

  createFontSource([
    {
      name: 'DSDIGIT',
      url: `url(${sourceUrl}/font/DS-DIGIT/DS-DIGIT.TTF)`
    }
  ]);
}
