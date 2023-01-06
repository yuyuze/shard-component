import { merge } from 'lodash';
import type { PieSeriesOption } from 'echarts';

type AutoMatic = {
  autoMatic: Function;
  timer: number;
};

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(
  startRatio,
  endRatio,
  isSelected,
  isHovered,
  k,
  h
) {
  const midRatio = (startRatio + endRatio) / 2;
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;

  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x(u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y(u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z(u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    }
  };
}

function fomatFloat(num, n) {
  let f = parseFloat(num);
  if (Number.isNaN(f)) {
    return false;
  }
  f = Math.round(num * 10 ** n) / 10 ** n; // n 幂
  let s = f.toString();
  let rs = s.indexOf('.');
  // 判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + n) {
    s += '0';
  }
  return s;
}

function getHeight3D(series, height) {
  series.sort((a, b) => {
    return b.pieData.value - a.pieData.value;
  });
  return (height * 25) / series[0].pieData.value;
}

export default (
  data = [],
  internalDiameterRatio = 0.8,
  configure = {},
  auto: AutoMatic = {
    autoMatic: () => {},
    timer: 3000
  }
) => {
  const pieData = [...data];
  // internalDiameterRatio:透明的空心占比
  const series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let legendBfb = [];
  const k = 1 - internalDiameterRatio;

  pieData.sort((a, b) => {
    return b.value - a.value;
  });

  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;
    const seriesItem: any = {
      name:
        typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k
      },
      center: ['10%', '50%']
    };

    if (typeof pieData[i].itemStyle !== 'undefined') {
      const itemStyle: any = {};
      typeof pieData[i].itemStyle.color !== 'undefined'
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity !== 'undefined'
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  legendData = [];
  legendBfb = [];

  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
    const bfb = fomatFloat(series[i].pieData.value / sumValue, 4);
    legendData.push({
      name: series[i].name,
      value: bfb
    });
    legendBfb.push({
      name: series[i].name,
      value: bfb
    });
  }
  const boxHeight = getHeight3D(series, 26); // 通过传参设定3d饼/环的高度，26代表26px
  const option = {
    legend: {
      data: legendData,
      orient: 'horizontal',
      left: 10,
      top: 10,
      itemGap: 10,
      textStyle: {
        color: '#A1E2FF'
      },
      show: false,
      icon: 'circle',
      formatter(param) {
        const item = legendBfb.filter((item) => item.name === param)[0];
        const bfs = fomatFloat(item.value * 100, 2) + '%';
        return `${item.name}  ${bfs}`;
      }
    },
    labelLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,0,0,0)'
      }
    },
    label: {
      show: false,
      position: 'center',
      rich: {
        b: {
          color: '#7BC0CB',
          fontSize: 12,
          lineHeight: 20
        },
        c: {
          fontSize: 16
        }
      },
      formatter: '{b|{b} \n}{c|{c}}{b|  亩}'
    },
    tooltip: {
      formatter: (params) => {
        if (
          params.seriesName !== 'mouseoutSeries' &&
          params.seriesName !== 'pie2d'
        ) {
          // console.log(params.seriesName)
          const bfb = (
            (option.series[params.seriesIndex].pieData.endRatio -
              option.series[params.seriesIndex].pieData.startRatio) *
            100
          ).toFixed(2);
          return (
            `${params.seriesName}<br/>` +
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
            `${bfb}%<br/>` +
            `${data[params.seriesIndex].value}`
          );
        }
        return '';
      }
    },
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    grid3D: {
      show: false,
      boxHeight, // 圆环的高度
      viewControl: {
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 20, // 角度
        distance: 200, // 调整视角到主体的距离，类似调整zoom
        rotateSensitivity: 1, // 设置为0无法旋转
        zoomSensitivity: 1, // 设置为0无法缩放
        panSensitivity: 1, // 设置为0无法平移
        autoRotate: true // 自动旋转
      }
    },
    series
  };
  return merge({}, option);
};
