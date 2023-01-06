import { SOURCEHANSANSFont } from './style/sourcehansans/type';
import { SimheiFont } from './style/simhei/type';
import { PuhuitiFont } from './style/puhuiti/type';
import { PingFangFont } from './style/pingfang/type';
import { luckFontFont } from './style/luckfont/type';
import { DSDIGITFont } from './style/dsdigit/type';
import { DIGITALFont } from './style/digital/type';
import { ALiHanYiFont } from './style/alihanyi/type';
import { AliHYAiHeiFont } from './style/alihyaihei/type';
import { DinFont } from './style/din/type';
import { LianmengqiyiFont } from './style/lianmeng/type';
import { Font } from './index.d';
import { PangMenZhengDaoFont } from './style/pangmengzhengdao/type';

interface IFont {
  name: Font;
  fonts:
    | ALiHanYiFont
    | SOURCEHANSANSFont
    | SimheiFont
    | PuhuitiFont
    | PingFangFont
    | luckFontFont
    | DSDIGITFont
    | DIGITALFont
    | AliHYAiHeiFont
    | DinFont
    | LianmengqiyiFont
    | PangMenZhengDaoFont;
}

export {
  SOURCEHANSANSFont,
  PuhuitiFont,
  PingFangFont,
  luckFontFont,
  DSDIGITFont,
  DIGITALFont,
  ALiHanYiFont,
  AliHYAiHeiFont,
  DinFont,
  LianmengqiyiFont,
  PangMenZhengDaoFont,
  IFont
};
