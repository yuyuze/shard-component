import { string, array } from 'vue-types';
import vueTypes from '../../util/vue-types';

/**
 * @description:
 * @params Img 图片
 * @params Audio 音频
 * @params Video 视频
 * @author: Guixiang
 */
export enum Multimedia {
  Img = '0',
  Audio = '1',
  Video = '2'
}
export const ListType = {
  text: 'text',
  picture: 'picture',
  pictureCard: 'picture-card'
};

interface File {
  type: string;
  url: string;
  name: string;
  uid: string;
}

export const propsTypes = () => ({
  url: vueTypes.string.isRequired,
  interface: vueTypes.string.isRequired,
  accept: vueTypes.string,
  fileList: array<any>().def([]),
  multiple: vueTypes.bool.def(false),
  listType: vueTypes.string,
  width: vueTypes.unit,
  height: vueTypes.unit,
  size: vueTypes.unit,
  maxCount: vueTypes.number,
  onlyPreview: vueTypes.bool.def(false)
});
