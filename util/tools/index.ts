import { isNumber, isString } from 'lodash';
import { message } from 'ant-design-vue';

export { default as KeyCode } from './KeyCode';
export { default as Classes } from './component-classes';

/**
 * @description: 转变单位,默认补充 px
 * @param {String | Number} val 尺寸单位
 * @returns {String} string
 * @author: Guixiang
 * @example
 * toSize(10); // 10px
 * toSize('10rem'); // 10rem
 */
export const toSize = (val): string => {
  if (isNumber(val) || isString(val)) {
    return String(Number.isNaN(+val) ? val : val + 'px');
  }
  return '';
};

/**
 * @description: 消息弹窗
 * @param {string} content 消息文本
 * @param {string} type 消息类型
 * @param {number} duration 动画时间。 1 = 1000
 * @author: Guixiang
 * @example
 * AntToast({
 *  content: '文本内容',
 *  type: 'success',
 * })
 */
export const AntToast = (option: {
  content: string;
  type: 'info' | 'success' | 'error' | 'warning' | 'loading';
  duration?: number;
}) => {
  const { content, type, duration = 2 } = option;
  return message[type](content, duration);
};

/**
 * @description: 获取数据的类型，返回的是小写的
 * @param {*} obj
 * @returns {*}
 * @author: Guixiang
 */
export const getDataType = (obj) => {
  let type;
  if (obj === null) {
    return String(obj);
  }
  if (typeof obj === 'object') {
    type = Object.prototype.toString
      .call(obj)
      .replace('[object ', '')
      .replace(']', '')
      .toLowerCase();
  } else {
    type = typeof obj;
  }
  return type;
};

/**
 * @description: 深合并，不合并数组
 * @param {target} 合并的目标对象
 * @param {origin} 合并的源数据对象
 * @returns {any}
 * @author: Guixiang
 * @example
 * DeepMerge(obj1, obj2);
 */
export const DeepMerge = (target, origin) => {
  const obj = target;
  Object.entries(origin).forEach(([key, value]) => {
    // 判断源对象的当前属性是否在目标对象中具有
    // 不具有则直接将原属性替换
    if (obj[key]) {
      /*
        为对象时则需要再次合并
        没有则直接替换
      */
      if (getDataType(value) === 'object') {
        obj[key] = DeepMerge(obj[key], value);
      } else {
        obj[key] = value;
      }
    } else {
      obj[key] = value;
    }
  });
  return obj;
};

/**
 * @description: 判断当前环境是否为开发环境
 * @returns {boolean} true | false
 * @author: Guixiang
 * @example
 * const isBool = isDev();
 */
export function isDev(): boolean {
  return import.meta.env.DEV;
}

// 下载文件
export function downLoad(url = '') {
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = url;
  document.body.appendChild(tempLink);
  setTimeout(() => {
    tempLink.click();
    setTimeout(() => {
      document.body.removeChild(tempLink);
    }, 0);
  }, 0);
}

/**
 * @description: 为数组补充参数,返回一个新数组
 * @param {Array} arr 原数组
 * @param {number} targetLen 数组的目标长度
 * @param {any} val 需要补充的参数，默认为0
 * @param {string} pos 补充前缀还是后缀 'before' | 'after'
 * @returns {Array} 返回一个数组
 * @author: Guixiang
 * @example
 * const arr = Replenish([], 5, 1); // [1, 1, 1, 1, 1]
 */
export const supVal = (
  arr: any[],
  targetLen: number,
  val: any = 0,
  pos: 'before' | 'after' = 'before'
) => {
  if (arr.length >= targetLen) {
    return [...arr];
  }
  const len = arr.length;
  const diff = targetLen - len;
  const newArr = Array(diff).fill(val);
  const posFn = {
    before: () => newArr.push(...arr),
    after: () => newArr.unshift(...arr)
  };
  posFn[pos]();
  return newArr;
};

// 转换范围经纬度
export const conversionRange = (
  range: string,
  type: string = ';'
): number[][] => {
  if (type === ';') {
    return range.split(';').map((e) => [+e.split(',')[0], +e.split(',')[1]]);
  }
  const list = range.split(',');
  const len = list.length / 2;
  const arr = [];
  for (let i = 0; i < len; i++) {
    const now = i * 2;
    arr.push([list[now], list[now + 1]]);
  }
  return arr;
};
