import {
  defineComponent,
  computed,
  onMounted,
  watch,
  ref,
  watchEffect
} from 'vue';
import { merge } from 'lodash';
import { request } from '../../util/http';
import { useEcharts, useConfigInject } from '../../util/hooks';
import * as baseConfig from './config';
import { toSize } from '../../util/tools';
import { withInstall } from '../../util/type';
import { propTypes } from './type';

const Echartsmap = defineComponent({
  name: 'VcEchartsmap',
  emits: ['changeMap'],
  props: propTypes(),
  setup(props, ctx) {
    console.log(22, props);
    const { EchartsEl, initEcharts, setOption, Echarts } = useEcharts();
    const myChart = ref(null);
    const { api } = useConfigInject('echartsmap', props);
    const styl = computed(() => {
      const { width, height } = { ...props };
      return {
        width: toSize(width),
        height: toSize(height)
      };
    });
    watchEffect(() => {
      if (props.clickMap && myChart.value) {
        myChart.value.getZr().on('click', (params) => {
          if (params.target) {
            ctx.emit('changeMap', params.target);
          } else {
            ctx.emit('changeMap', '中华人民共和国');
          }
        });
      }
    });
    async function mergeOption(type) {
      const {
        legend,
        tooltip,
        extend,
        grid,
        series,
        title,
        color,
        geotype,
        ...config
      } = {
        ...props
      };
      const geoJson = await request({
        // api: 'http://220.189.235.230:8082/ljData/china.json',
        // url: '',
        api,
        // url: `/profile/upload/plugins/echartsMap/${props.subGeotype}.json`,
        url: `/mlcz/datavAreaV3/geojson?name=${props.geotype}`,
        method: 'get'
      });
      Echarts.registerMap(geotype, geoJson as any);
      const option = merge(
        {},
        baseConfig[type](props.data, {
          geotype,
          ...config
        }),
        {
          legend,
          color,
          tooltip,
          title,
          grid,
          series
        },
        extend
      );
      return option;
    }
    watch(
      [() => props.data, () => props.extend, () => props.subGeotype],
      async () => {
        if (props.type) {
          setOption(await mergeOption(props.type));
        }
      }
    );
    onMounted(async () => {
      myChart.value = initEcharts();
      if (props.type) {
        setOption(await mergeOption(props.type));
      }
    });
    return () => (
      <>
        <div style={styl.value} ref={EchartsEl}></div>
      </>
    );
  }
});

export default withInstall(Echartsmap);
