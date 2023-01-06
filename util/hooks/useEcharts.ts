import { log } from 'console';
import * as Echarts from 'echarts';
import { onUnmounted, ref } from 'vue';
import { EleResize } from '../Esresize/esresize';

export interface ImapJson {
  name: string;
  json: any;
}

const useEcharts = () => {
  // const EchartsEl = ref<HTMLElement>(null!);
  const EchartsEl = ref(null);
  let chart: Echarts.EChartsType;
  let autoTimer: any;

  const remove = () => {
    if (autoTimer) {
      clearInterval(autoTimer);
    }
  };

  const initEcharts = (type: 'canvas' | 'svg' = 'svg') => {
    chart = Echarts.init(EchartsEl.value, null, { renderer: type || 'svg' });
    const listener = (): void => {
      chart.resize();
    };
    EleResize.on(EchartsEl.value, listener);
    return chart;
  };

  onUnmounted(() => {
    remove();
  });

  const autoMatic = (length: number, time = 2000) => {
    const myChart = chart;
    if (autoTimer) {
      clearInterval(autoTimer);
    }
    let index = 0;
    function animate() {
      const dataLen = length;
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: index
      });
      index = (index + 1) % dataLen;
      // 高亮当前图形
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index
      });
      // 显示 tooltip
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: index
      });
    }
    myChart.on('mousemove', (e) => {
      for (let i = 0; i < length; i++) {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: i
        });
      }
      // 显示 tooltip
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: e.dataIndex
      });
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: e.dataIndex
      });
      index = e.dataIndex;
      autoTimer && clearInterval(autoTimer);
      autoTimer = null;
    });
    myChart.on('mouseout', () => {
      autoTimer && clearInterval(autoTimer);
      autoTimer = null;
      autoTimer = setInterval(animate, time);
    });
    autoTimer = setInterval(animate, time);
  };

  const setOption = (options: Echarts.EChartsOption) => {
    chart.clear();
    chart.setOption(options);
    return options;
  };

  return {
    EchartsEl,
    initEcharts,
    autoMatic,
    setOption,
    Echarts
  };
};
export { useEcharts };
