import {
  computed,
  defineComponent,
  onMounted,
  watch,
  onBeforeUnmount
} from 'vue';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
import { toSize } from '../../util/tools';
// import { getPropsSlot } from '../../util/props-util';
import vueTypes from '../../util/vue-types';

/**
 * @description: skinLayout 配置文档 https://help.aliyun.com/document_detail/62948.html#section-mka-evr-sqt
 * align属性，组件相对于父级组件的对齐方式，可选项如下所示：
 * - 'cc'，相对于父组件绝对居中。
 * - 'tl'，相对于父组件左上对齐，受同级组件的占位影响，以组件的相对位置左上角作为偏移原点，可类比于css中的float: left。
 * - 'tr'，相对于父组件右上对齐，受同级组件的占位影响，以组件的相对位置右上角作为偏移原点，可类比于css中的float: right。
 * - 'tlabs'，相对于父组件左上绝对对齐，不受同级组件的占位影响，以父组件左上角作为偏移原点。
 * - 'trabs'，相对于父组件右上绝对对齐，不受同级组件的占位影响，以父组件右上角作为偏移原点。
 * - 'blabs'，相对于父组件左下绝对对齐，不受同级组件的占位影响，以父组件左下角作为偏移原点。
 * - 'brabs'，相对于父组件右下绝对对齐，不受同级组件的占位影响，以父组件右下角作为偏移原点。
 * x，y属性，组件相对于父级组件的位置，说明如下所示：
 * - x，{Number}，水平方向偏移量，偏移原点参考align的说明，cc时无效。
 * - y，{Number}，垂直方向偏移量，偏移原点参考align的说明，cc时无效。
 * @author: Guixiang
 */

const skinLayout = [
  {
    name: 'H5Loading',
    align: 'cc'
  }, // 加载动画
  { name: 'tooltip', align: 'blabs', x: 0, y: 56 }, // 移入提示文字
  { name: 'bigPlayButton', align: 'blabs', x: 30, y: 80 }, // 播放按钮
  {
    // 底部操控条
    name: 'controlBar',
    align: 'blabs',
    x: 0,
    y: 0,
    children: [
      { name: 'liveDisplay', align: 'tlabs', x: 15, y: 6 },
      { name: 'fullScreenButton', align: 'tr', x: 10, y: 10 },
      { name: 'volume', align: 'tr', x: 5, y: 10 }
    ]
  }
];

let index = 1;

const Monitor = defineComponent({
  name: 'VcMonitor',
  props: {
    width: vueTypes.unit.def('100%'),
    height: vueTypes.unit.def('300px'),
    type: vueTypes.string,
    src: vueTypes.string.def('')
  },
  emits: ['log', 'fail', 'success', 'init'],
  setup(props, { emit }) {
    const { prefixCls } = useConfigInject('monitor', props);
    let player;
    let init = false;
    const id = `monitor-${index++}`;

    const changeLog = (text) => {
      const log = {
        hls: props.src,
        status: player ? player.getStatus() : 'none',
        text
      };
      emit('log', log);
    };

    const initPlayer = () => {
      if (Aliplayer && props.src) {
        const { src } = { ...props };
        // 是销毁之前的视频，不销毁的话，它会一直存在。
        // player.dispose();
        player = new Aliplayer(
          {
            id,
            skinLayout,
            autoplay: true, // 自动播放
            width: '100%',
            height: '100%',
            isLive: true, // 是否直播
            source: src // 播放地址，可以是第三方点播地址，或阿里云点播服务中的播放地址。
          },
          () => {
            init = true;
            changeLog('开始播放');
            emit('success');
          }
        );
        emit('init', player);
        // 流中断(取流失败)
        player.on('onM3u8Retry', () => {
          changeLog('流地址加载失败, 继续尝试加载...');
        });
        // 播放失败
        player.on('liveStreamStop', () => {
          changeLog('播放失败');
          emit('fail');
        });
      }
    };

    watch(
      () => props.src,
      () => {
        // 是否进行初始化 否 => 初始化
        if (!init) {
          // 加载之前将之间的视频销毁
          // player.dispose();
          initPlayer();
          return;
        }

        // 播放类存在且 src 为 '' undefined null 则销毁播放类，等待重新初始化
        if (player && !props.src) {
          player?.dispose();
          init = false;
          return;
        }

        // 播放类存在且 src 为真值
        if (player && props.src) {
          player.loadByUrl(props.src);
        }
      }
    );
    onMounted(() => {
      initPlayer();
    });
    onBeforeUnmount(() => {
      // initPlayer();
      try {
        player?.stop();
        player?.dispose();
      } catch (e) {
        console.log(e);
      }
    });
    const styl = computed(() => {
      return {
        width: toSize(props.width),
        height: toSize(props.height)
      };
    });
    return () => (
      <div class={prefixCls.value} style={styl.value}>
        <div id={id}></div>
      </div>
    );
  }
});

export default withInstall(Monitor);
