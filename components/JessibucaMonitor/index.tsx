import {
  computed,
  defineComponent,
  onMounted,
  ref,
  Transition,
  watch
} from 'vue';
import { func, string } from 'vue-types';
import { toSize } from '../../util/tools';
import { useConfigInject } from '../../util/hooks';
import { withInstall } from '../../util/type';
import Iconfont from '../Iconfont';
import vueTypes from '../../util/vue-types';
// import '../../assets/js/jessibuca/jessibuca.js';
// import decoder from '../../assets/js/jessibuca/decoder.js';
import './style/index.less';

const jessibucaPlayer: any = {};

const VcJessibucaMonitor = defineComponent({
  name: 'VcJessibucaMonitor',
  props: {
    width: vueTypes.unit.def(400),
    height: vueTypes.unit.def(500),
    _uid: string(),
    url: string().isRequired
  },
  setup(props, ctx) {
    const { prefixCls } = useConfigInject('jessibucaMonitor', props);
    const jessibucaEl = ref(null);
    const fullscreen = ref(false);
    const performa = ref(''); // 工作情况
    const playing = ref(false);
    const isShowTool = ref(false);
    const loaded = ref(false);
    const quieting = ref(false);
    const err = ref('');
    const isNotMute = ref(false);
    const kBpsText = ref(0);
    const _uid = props._uid === undefined ? +new Date() : props._uid;
    onMounted(() => {
      create();
    });
    const decoder = new URL(
      '../../assets/js/jessibuca/decoder.js',
      import.meta.url
    ).href;
    const decoderWasm = new URL(
      '../../assets/js/jessibuca/decoder.wasm',
      import.meta.url
    ).href;
    // 监测是否支持占满屏幕
    function isFullscreen() {
      return (
        (document as any).fullscreenElement ||
        (document as any).msFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).webkitFullscreenElement ||
        false
      );
    }
    function fullscreenSwich() {
      const isFull = isFullscreen();
      jessibucaPlayer[_uid].setFullscreen(!isFull);
      fullscreen.value = !isFull;
    }

    // 暂停视频
    function pause() {
      if (jessibucaPlayer[_uid]) {
        jessibucaPlayer[_uid].pause();
      }
      playing.value = false;
      err.value = '';
      performa.value = '';
    }
    // 播放视频
    function play() {
      if (jessibucaPlayer[_uid]) {
        destroy();
      }
      create();
    }

    // 销毁视频
    function destroy() {
      if (jessibucaPlayer[_uid]) {
        jessibucaPlayer[_uid].destroy();
      }
      jessibucaPlayer[_uid] = null;
      playing.value = false;
      err.value = '';
      performa.value = '';
    }

    function create() {
      const options = {};
      // 初始化Jessibuca播放器
      jessibucaPlayer[_uid] = new (window as any).Jessibuca({
        container: jessibucaEl.value,
        videoBuffer: 0.2, // 最大缓冲时长，单位秒
        isResize: true,
        decoder,
        useMSE: false,
        showBandwidth: false,
        isFlv: true,
        // text: "WVP-PRO",
        // background: "static/images/zlm-logo.png",
        loadingText: '加载中',
        hasAudio: true,
        debug: false,
        supportDblclickFullscreen: false, // 是否支持屏幕的双击事件，触发全屏，取消全屏事件。
        operateBtns: {
          fullscreen: false,
          screenshot: false,
          play: false,
          audio: false,
          recorder: false
        },
        record: 'record',
        // vod: this.vod,
        // forceNoOffscreen: this.forceNoOffscreen,
        isNotMute: isNotMute.value,
        ...options
      });
      jessibucaPlayer[_uid].on('load', () => {
        jessibucaPlayer[_uid].play(props.url || '');
      });
      const jessibuca = jessibucaPlayer[_uid];
      jessibuca.on('load', () => {
        console.log('on load init');
      });

      jessibuca.on('log', (msg: any) => {
        console.log('on log', msg);
      });
      jessibuca.on('record', (msg: any) => {
        console.log('on record:', msg);
      });
      jessibuca.on('pause', () => {
        playing.value = false;
      });
      jessibuca.on('play', () => {
        playing.value = true;
      });
      jessibuca.on('fullscreen', (msg: any) => {
        console.log('on fullscreen', msg);
        fullscreen.value = msg;
      });

      jessibuca.on('mute', (msg: any) => {
        console.log('on mute', msg);
        isNotMute.value = !msg;
      });
      jessibuca.on('audioInfo', (msg: any) => {
        // console.log("audioInfo", msg);
      });

      jessibuca.on('videoInfo', (msg: any) => {
        // this.videoInfo = msg;
        console.log('videoInfo', msg);
      });

      jessibuca.on('bps', (bps: any) => {
        // console.log('bps', bps);
      });
      let _ts = 0;
      jessibuca.on('timeUpdate', (ts: any) => {
        // console.log('timeUpdate,old,new,timestamp', _ts, ts, ts - _ts);
        _ts = ts;
      });

      jessibuca.on('videoInfo', (info: any) => {
        console.log('videoInfo', info);
      });

      jessibuca.on('error', (error: any) => {
        console.log('error', error);
      });

      jessibuca.on('timeout', () => {
        console.log('timeout');
      });

      jessibuca.on('start', () => {
        console.log('start');
      });

      jessibuca.on('performance', (performance: any) => {
        let show = '卡顿';
        if (performance === 2) {
          show = '非常流畅';
        } else if (performance === 1) {
          show = '流畅';
        }
        performa.value = show;
      });
      jessibuca.on('buffer', (buffer: any) => {
        // console.log('buffer', buffer);
      });

      jessibuca.on('stats', (stats: any) => {
        // console.log('stats', stats);
      });

      jessibuca.on('kBps', (kBps: any) => {
        kBpsText.value = Math.round(kBps);
      });

      // 显示时间戳 PTS
      jessibuca.on('videoFrame', () => {});

      //
      jessibuca.on('metadata', () => {});
    }

    // 刷新
    function playBtnClick() {
      play();
    }
    // 静音
    function mute() {
      if (jessibucaPlayer[_uid]) {
        jessibucaPlayer[_uid].mute();
      }
    }
    // 播放声音
    function cancelMute() {
      if (jessibucaPlayer[_uid]) {
        jessibucaPlayer[_uid].cancelMute();
      }
    }

    const styl = computed(() => {
      return {
        width: toSize(props.width),
        height: toSize(props.height)
      };
    });

    // 替换播放器
    watch(
      () => props.url,
      () => {
        // 重新播放
        playBtnClick();
      }
    );
    return () => (
      <>
        <div
          onDblclick={fullscreenSwich}
          ref={jessibucaEl}
          style={styl.value}
          class={['jessibuca-box', prefixCls.value]}
          onMouseenter={() => {
            !fullscreen.value && (isShowTool.value = true);
          }}
          onMouseleave={() => {
            !fullscreen.value && (isShowTool.value = false);
          }}
        >
          <Transition name='top'>
            {isShowTool.value && (
              <div
                class='buttons-box'
                id='buttonsBox'
                onDblclick={(event) => {
                  event.stopPropagation();
                }}
              >
                <div class='buttons-box-left'>
                  {playing.value ? (
                    <Iconfont
                      color='#fff'
                      boxCls={'jessibuca-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-ai07'}
                      onClick={(event) => {
                        event.stopPropagation();
                        pause();
                      }}
                    ></Iconfont>
                  ) : (
                    <Iconfont
                      color='#fff'
                      boxCls={'jessibuca-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-shipinbofangshibofang'}
                      onClick={(event) => {
                        event.stopPropagation();
                        play();
                      }}
                    ></Iconfont>
                  )}

                  <Iconfont
                    color='#fff'
                    boxCls={'jessibuca-btn'}
                    size={20}
                    height={'28px'}
                    href={'#icon-shexiangtou_guanbi'}
                    onClick={(event) => {
                      event.stopPropagation();
                      destroy();
                    }}
                  ></Iconfont>
                  {isNotMute.value ? (
                    <Iconfont
                      color='#fff'
                      boxCls={'jessibuca-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-shengyinguanbi'}
                      onClick={(event) => {
                        event.stopPropagation();
                        // 静音
                        mute();
                      }}
                    ></Iconfont>
                  ) : (
                    <Iconfont
                      color='#fff'
                      boxCls={'jessibuca-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-shengyin'}
                      onClick={(event) => {
                        event.stopPropagation();
                        // 取消静音
                        cancelMute();
                      }}
                    ></Iconfont>
                  )}
                </div>
                <div class='buttons-box-right'>
                  <span class='jessibuca-btn'>{kBpsText.value} kb/s</span>
                  <Iconfont
                    color='#fff'
                    boxCls={'jessibuca-btn'}
                    size={20}
                    height={'28px'}
                    href={'#icon-shuaxin'}
                    onClick={(event) => {
                      event.stopPropagation();
                      playBtnClick();
                    }}
                  ></Iconfont>
                  {fullscreen.value ? (
                    <Iconfont
                      color='#fff'
                      boxCls={'jessibuca-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-quxiaoquanping_o'}
                      onClick={(event) => {
                        event.stopPropagation();
                        fullscreenSwich();
                      }}
                    ></Iconfont>
                  ) : (
                    <Iconfont
                      color='#fff'
                      boxCls={'jessibuca-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-quanping'}
                      onClick={(event) => {
                        event.stopPropagation();
                        fullscreenSwich();
                      }}
                    ></Iconfont>
                  )}
                </div>
              </div>
            )}
          </Transition>
        </div>
      </>
    );
  }
});

export default withInstall(VcJessibucaMonitor);
