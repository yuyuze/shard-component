export interface IformatNumber {
  num: number | string;
  decimals: number;
  decimal: string;
  separator: string;
  prefix: string;
  suffix: string;
}
export type IeasingFn = (
  progress: number,
  StartVal: number,
  diff: number,
  duration: number,
) => number;
// 格式化小数点
export const formatNumber = (arg: IformatNumber): string => {
  let num = (arg.num as number).toFixed(arg.decimals);
  num += '';
  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? arg.decimal + x[1] : '';
  const reg = /(\d+)(\d{3})/;
  if (arg.separator && !isNumber(arg.separator)) {
    while (reg.test(x1)) {
      x1 = x1.replace(reg, '$1' + arg.separator + '$2');
    }
  }
  return arg.prefix + x1 + x2 + arg.suffix;
};
// 判断是否是数字
export const isNumber = (val: any): boolean => {
  return !Number.isNaN(parseFloat(val));
};

/**
 * @description: 动画函数
 * @param {*} progress 进度
 * @param {*} StartVal 起始值
 * @param {*} diff 最终值
 * @param {*} duration 动画时间
 * @returns {number} 计算值
 * @author: Guixiang
 */
export const easingFn: IeasingFn = (progress, StartVal, diff, duration) => {
  /**
   * 当具备小数点时，progress 会大于 duration，导致最终展示的值出现问题
   * FIX: 当 progress 大于 duration 时，直接采用 duration 即可解决问题
   */
  const nowProgess = progress > duration ? duration : progress;
  if (duration !== 0) {
    const num = (diff * (-(2 ** ((-10 * nowProgess) / duration)) + 1) * 1024) / 1023 + StartVal;
    return num;
  }
  return diff;
};
