import { onMounted, ref } from 'vue';
import HighCharts from 'highcharts';
import type { Options } from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';

highcharts3d(HighCharts);
export default function useHighCharts() {
  const echartEl = ref(null);
  const chart = ref(null);

  function reflow(option) {
    HighCharts.chart(echartEl.value, option).reflow();
  }

  function setOption(option: Options) {
    if (echartEl.value) {
      chart.value = new HighCharts.Chart(echartEl.value, option);
      window.addEventListener('resize', reflow.bind(this, option));
    } else {
      throw new Error('缺少echartEl赋值Ref,并在beforeMount之后使用');
    }
  }
  return {
    setOption,
    echartEl,
    chart
  };
}
