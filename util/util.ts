import type { VueNode } from './type';

export const isFunction = (val) => typeof val === 'function';

export const isArray = Array.isArray;
export const isString = (val) => typeof val === 'string';
export const isSymbol = (val) => typeof val === 'symbol';
export const isObject = (val) => val !== null && typeof val === 'object';
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);

const cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);

// change from vue sourcecode
function resolvePropValue(options, props, key, value) {
  const opt = options[key];
  if (opt !== null) {
    const hasDefault = hasOwn(opt, 'default');
    // default values
    if (hasDefault && value === undefined) {
      const defaultValue = opt.default;
      value =
        opt.type !== Function && isFunction(defaultValue)
          ? defaultValue()
          : defaultValue;
    }
    // boolean casting
    if (opt.type === Boolean) {
      if (!hasOwn(props, key) && !hasDefault) {
        value = false;
      } else if (value === '') {
        value = true;
      }
    }
  }
  return value;
}

export function getDataAndAriaProps(props) {
  return Object.keys(props).reduce((memo, key) => {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      memo[key] = props[key];
    }
    return memo;
  }, {});
}

export function toPx(val) {
  if (typeof val === 'number' || Number(val) > 0) {
    return `${val}px`;
  }
  return val;
}

export function renderHelper<T = Record<string, any>>(
  v: VueNode | ((arg0: T) => VueNode),
  // eslint-disable-next-line default-param-last
  props: T = {} as T,
  defaultV?: any
) {
  if (typeof v === 'function') {
    return v(props);
  }
  return v ?? defaultV;
}

/**
 * 创建link标签在页面中
 * @param url 地址
 */
function addLinkCSS(url: string) {
  const link = document.createElement('link');
  link.href = url;
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.body.appendChild(link);
}

/**
 * 创建script脚本标签在页面中
 * @param url 地址
 */
function addScriptUrl(url: string) {
  const script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.async = false;
  document.body.appendChild(script);
  return new Promise((resolve) => {
    if ((script as any).readyState) {
      // IE
      (script as any).onreadystatechange = function () {
        if (
          (script as any).readyState === 'complete' ||
          (script as any).readyState === 'loaded'
        ) {
          (script as any).onreadystatechange = null;
          resolve(true);
        }
      };
    } else {
      // 非IE
      script.onload = function () {
        resolve(true);
      };
    }
  });
}

/**
 * 加入字体资源
 * @param hexString
 * @returns
 */
function createFontSource(
  fontSource: {
    name: string;
    url: string;
    baseStyle?: FontFaceDescriptors;
  }[]
) {
  // 创建字体对象
  fontSource.map((item) => {
    const baseStyle = item.baseStyle || {};
    const fontSource = new FontFace(item.name, item.url, {
      weight: 'normal',
      style: 'normal',
      ...baseStyle
    });
    fontSource.load().then((loadFace) => {
      document.fonts.add(loadFace);
    });
  });
}

// 转化十六进制颜色转化为rgb
function stringToRGB(hexString: string) {
  hexString = hexString.replace(/ /g, '');
  const regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,[.\d]+)?\)/;
  const reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  if (regRgba.test(hexString)) {
    const rgbRes = hexString.match(regRgba);
    return {
      r: rgbRes[1],
      g: rgbRes[2],
      b: rgbRes[3],
      o: rgbRes[4] === undefined ? 1 : rgbRes[4].slice(1)
    };
  }
  if (reg.test(hexString)) {
    hexString = hexString.startsWith('#') ? hexString.substring(1) : hexString;
    if (hexString.length === 3) {
      const rgb = hexString
        .match(/([\w\d]{1})/g)
        .map((item) => parseInt(item + item, 16));
      return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
        o: 1
      };
    }
    if (hexString.length === 6) {
      const rgb = hexString
        .match(/([\w\d]{2})/g)
        .map((item) => parseInt(item, 16));
      return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
        o: 1
      };
    }
  }
  return false;
}

export {
  createFontSource,
  stringToRGB,
  isOn,
  cacheStringFunction,
  camelize,
  hyphenate,
  capitalize,
  resolvePropValue,
  addLinkCSS,
  addScriptUrl
};
