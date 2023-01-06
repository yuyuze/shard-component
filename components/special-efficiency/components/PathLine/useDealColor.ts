import { directive } from '../../../../../zhly_old/src/hooks/usePoint';
import { stringToRGB } from '../../../../util/util';

/**
 * stop的属性类型
 */
interface ISVGStopAttr {
  offset?: string;
  stopColor: string;
  stopOpacity?: string;
}

interface LinearGradientDirection {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

/**
 * linearGradient内部数据抽象化
 */
interface ILinearGradient extends LinearGradientDirection {
  attr: ISVGStopAttr[];
}
/**
 * 处理方向
 */
export function dealDirection(direction: string): LinearGradientDirection {
  const isDirection = !(
    direction.startsWith('#') || direction.startsWith('rgb')
  );
  if (isDirection) {
    const directiveTrim = direction.trim().toLowerCase();

    if (directiveTrim.startsWith('to')) {
      let dirArr = directiveTrim.split(' ');
      dirArr = dirArr.slice(1);
      if (dirArr.length > 2 || dirArr.length === 0) {
        return {
          x1: '0',
          y1: '0',
          x2: '0',
          y2: '100%'
        };
      }
      const [dir1, dir2] = dirArr as ('left' | 'right' | 'top' | 'bottom')[];
      if (dir1 && !dir2) {
        return dealSingleDirection(dir1);
      }
    } else if (/^(\d*)deg$/.test(directiveTrim)) {
      const angle = Number(directiveTrim.match(/^(\d*)deg$/)[1]);
      return dealDegDirection(angle);
    }
    return {
      x1: '0',
      y1: '0',
      x2: '0',
      y2: '100%'
    };
  }
  return {
    x1: '0',
    y1: '0',
    x2: '0',
    y2: '100%'
  };
}

export const dealSingleDirection = (
  directive: 'left' | 'right' | 'top' | 'bottom'
): LinearGradientDirection => {
  switch (directive) {
    case 'top':
      return {
        x1: '0',
        y1: '100%',
        x2: '0',
        y2: '0'
      };
    case 'bottom':
      return {
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '100%'
      };
    case 'left':
      return {
        x1: '100%',
        y1: '0',
        x2: '0',
        y2: '0'
      };
    case 'right':
      return {
        x1: '0',
        y1: '0',
        x2: '100%',
        y2: '0'
      };
    default:
      return {
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '100%'
      };
  }
};

/**
 * 通过角度计算出渐变x1 x2 y1 y2方向
 * @param deg
 * @returns
 */
export const dealDegDirection = (deg: number): LinearGradientDirection => {
  let dealDeg = deg;
  dealDeg %= 360;
  dealDeg %= 90;
  if (dealDeg >= 45) {
    dealDeg = 90 - dealDeg;
  }
  // 弧度
  const radian = (dealDeg * Math.PI) / 180;
  const tanValue = parseFloat(Math.tan(radian).toFixed(2));
  const per = tanValue * 0.5 * 100;
  if (deg >= 0 && deg <= 45) {
    return {
      x2: 50 + per + '%',
      y2: '0',
      x1: 50 - per + '%',
      y1: '100%'
    };
  }
  if (deg > 45 && deg <= 90) {
    return {
      x1: '0%',
      y1: 50 + per + '%',
      x2: '100%',
      y2: 50 - per + '%'
    };
  }
  if (deg > 90 && deg <= 135) {
    return {
      x1: '0%',
      y1: 50 - per + '%',
      x2: '100%',
      y2: 50 + per + '%'
    };
  }
  if (deg > 135 && deg <= 180) {
    return {
      x1: 50 - per + '%',
      y1: '0',
      x2: 50 + per + '%',
      y2: '100%'
    };
  }

  if (deg > 180 && deg <= 225) {
    return {
      x1: 50 + per + '%',
      y1: '0',
      x2: 50 - per + '%',
      y2: '100%'
    };
  }

  if (deg > 225 && deg <= 270) {
    return {
      x1: '100%',
      y1: 50 - per + '%',
      x2: '0%',
      y2: 50 + per + '%'
    };
  }
  if (deg > 270 && deg <= 315) {
    return {
      x1: '100%',
      y1: 50 + per + '%',
      x2: '0%',
      y2: 50 - per + '%'
    };
  }
  if (deg > 315 && deg <= 360) {
    return {
      x1: 50 - per + '%',
      y1: '100%',
      x2: 50 + per + '%',
      y2: '0'
    };
  }
  return {
    x1: '0',
    y1: '0',
    x2: '0',
    y2: '100%'
  };
};

export function useDealColor(
  color: string | string[]
): ILinearGradient | string {
  if (typeof color === 'string') {
    return color;
  }
  if (Array.isArray(color)) {
    const isDirection = !(
      (color[0] && color[0].trim().startsWith('#')) ||
      color[0].trim().startsWith('rgb')
    );

    // 处理方向
    const writeColorArr = isDirection ? color.slice(1) : color.slice(0);
    const { x1, x2, y1, y2 } = dealDirection(color[0]);
    const currentStopAttr = writeColorArr.map((item, index) => {
      let offset = '';
      if (index === 0 && writeColorArr.length === 1) {
        offset = '100%';
      } else if (index === writeColorArr.length - 1) {
        offset = '100%';
      } else if (index === 0 && writeColorArr.length !== 1) {
        offset = '0%';
      }
      const trimItem = item.replaceAll(/( ?),( ?)/g, ',');
      const [color, offsetValue] = trimItem.split(' ');
      offset = offsetValue === undefined ? offset : offsetValue;
      const colorObj = stringToRGB(color);

      const baseObj: ISVGStopAttr = colorObj
        ? {
            // eslint-disable-next-line indent
            stopColor:
              (color && color.trim().startsWith('#')) ||
              color.trim().startsWith('rgb')
                ? `rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`
                : '#000',
            stopOpacity: String(colorObj.o)
          }
        : {
            // eslint-disable-next-line indent
            stopColor: 'rgb(0, 0, 0)',
            stopOpacity: '1'
          };
      return {
        ...baseObj,
        ...(offset
          ? {
              offset
            }
          : {})
      };
    });
    return {
      x1,
      y1,
      x2,
      y2,
      attr: currentStopAttr
    };
  }
  // 与css渐变一致默认是to bottom
  return {
    x1: '0',
    y1: '0',
    x2: '0',
    y2: '100%',
    attr: [
      {
        stopColor: '#fff',
        stopOpacity: '0.1'
      }
    ]
  };
}
