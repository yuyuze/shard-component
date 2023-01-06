import {
  computed,
  defineComponent,
  nextTick,
  reactive,
  ref,
  toRef,
  Transition,
  watch
} from 'vue';
import { string, bool, func, object } from 'vue-types';
import Iconfont from '../Iconfont';
import '../../assets/h5player.min.js';
import vueTypes from '../../util/vue-types';
import './index.less';
import { toSize } from '../../util/tools';

export default defineComponent({
  emits: ['error'],
  props: {
    width: vueTypes.unit.def(400),
    height: vueTypes.unit.def(500),
    urls: object<{
      realplay?: string;
      talk?: string;
      playback?: string;
    }>()
  },
  setup(props, { emit }) {
    const _uid = +new Date();
    const player = ref();
    const fullscreen = ref(false);
    const playback = reactive({
      rate: 0
    });
    const isShowTool = ref(false);
    const playing = ref(false);
    const muted = ref(true);
    const urls = toRef(props, 'urls');
    const IS_MOVE_DEVICE = document.body.clientWidth < 992; // 是否移动设备
    function createPlayer() {
      player.value = new (window as any).JSPlugin({
        szId: 'player' + _uid,
        szBasePath: './',
        iMaxSplit: 1,
        iCurrentSplit: 1,
        iWidth: props.width,
        iHeight: props.height,
        openDebug: true,
        oStyle: {
          borderSelect: IS_MOVE_DEVICE ? '#000' : '#FFCC00'
        }
      });

      // 事件回调绑定
      player.value.JS_SetWindowControlCallback({
        windowEventSelect(iWndIndex: any) {
          // 插件选中窗口回调
          console.log('windowSelect callback: ', iWndIndex);
        },
        pluginErrorHandler(iWndIndex: any, iErrorCode: any, oError: any) {
          // 插件错误回调
          console.log('pluginError callback: ', iWndIndex, iErrorCode, oError);

          emit('error', iWndIndex, iErrorCode, oError);
        },
        windowEventOver(iWndIndex: any) {
          // 鼠标移过回调
          // console.log(iWndIndex);
        },
        windowEventOut(iWndIndex: any) {
          // 鼠标移出回调
          // console.log(iWndIndex);
        },
        windowEventUp(iWndIndex: any) {
          // 鼠标mouseup事件回调
          // console.log(iWndIndex);
        },
        windowFullCcreenChange(bFull: any) {
          // 全屏切换回调
          console.log('fullScreen callback: ', bFull);
        },
        firstFrameDisplay(iWndIndex: any, iWidth: any, iHeight: any) {
          // 首帧显示回调
          console.log(
            'firstFrame loaded callback: ',
            iWndIndex,
            iWidth,
            iHeight
          );
        },
        performanceLack() {
          // 性能不足回调
          console.log('performanceLack callback: ');
        }
      });
    }
    function init() {
      // 设置播放容器的宽高并监听窗口大小变化
      window.addEventListener('resize', () => {
        player.value.JS_Resize();
      });
    }
    /* 预览&对讲 */
    function realplay() {
      if (urls.value && player.value) {
        const index = player.value.currentWindowIndex;
        const playURL = urls.value.realplay;
        console.log('urls.value && player.value', playURL, index);

        // 普通模式
        player.value.JS_Play(playURL, { playURL, mode: 'mse' }, index).then(
          () => {
            playing.value = true;
            console.log('realplay success');
          },
          (e: any) => {
            console.log(11, e);
            console.error(e);
          }
        );
      }
    }
    function stopPlay() {
      if (player.value) {
        player.value.JS_Stop().then(
          () => {
            playing.value = false;
            playback.rate = 0;
            console.log('stop realplay success');
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }
    function talkStart() {
      if (urls.value && urls.value.talk && player.value) {
        const url = urls.value.talk;

        player.value.JS_SetConnectTimeOut(0, 1000);
        player.value.JS_StartTalk(url).then(
          () => {
            console.log('talkStart success');
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }
    function talkStop() {
      if (player.value) {
        player.value.JS_StopTalk().then(
          () => {
            console.log('talkStop success');
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }
    function stopAllPlay() {
      if (player.value) {
        player.value.JS_StopRealPlayAll().then(
          () => {
            playback.rate = 0;
            console.log('stopAllPlay success');
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }

    function playbackPause() {
      if (player.value) {
        player.value.JS_Pause().then(
          () => {
            console.log('playbackPause success');
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }

    function playbackResume() {
      if (player.value) {
        player.value.JS_Resume().then(
          () => {
            console.log('playbackResume success');
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }

    /* 声音、抓图、录像 */
    function openSound() {
      if (player.value) {
        player.value.JS_OpenSound().then(
          () => {
            console.log('openSound success');
            muted.value = false;
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }
    function closeSound() {
      if (player.value) {
        player.value.JS_CloseSound().then(
          () => {
            console.log('closeSound success');
            muted.value = true;
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }

    function wholeFullScreen() {
      if (player.value) {
        player.value.JS_FullScreenDisplay(true).then(
          () => {
            console.log('wholeFullScreen success');
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }

    function wholecloseScreen() {
      if (player.value) {
        player.value.JS_FullScreenDisplay(false).then(
          () => {
            console.log('wholeFullScreen success');
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    }

    watch(
      () => props.urls,
      () => {
        nextTick(() => {
          createPlayer();
          init();
          realplay();
          player.value.JS_Resize();
        });
      },
      { deep: true, immediate: true }
    );

    const styl = computed(() => {
      return {
        width: toSize(props.width),
        height: toSize(props.height)
      };
    });

    return () => (
      <>
        <div
          style={styl.value}
          class={['h5player-box']}
          onMouseenter={() => {
            !fullscreen.value && (isShowTool.value = true);
          }}
          onMouseleave={() => {
            !fullscreen.value && (isShowTool.value = false);
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%'
            }}
            id={`player${_uid}`}
          ></div>
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
                      boxCls={'h5player-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-ai07'}
                      onClick={(event) => {
                        event.stopPropagation();
                        stopPlay();
                      }}
                    ></Iconfont>
                  ) : (
                    <Iconfont
                      color='#fff'
                      boxCls={'h5player-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-shipinbofangshibofang'}
                      onClick={(event) => {
                        event.stopPropagation();
                        realplay();
                      }}
                    ></Iconfont>
                  )}

                  {/* <Iconfont
                    color='#fff'
                    boxCls={'h5player-btn'}
                    size={20}
                    height={'28px'}
                    href={'#icon-shexiangtou_guanbi'}
                    onClick={(event) => {
                      event.stopPropagation();
                      destroy();
                    }}
                  ></Iconfont> */}
                  {muted.value ? (
                    <Iconfont
                      color='#fff'
                      boxCls={'h5player-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-shengyinguanbi'}
                      onClick={(event) => {
                        event.stopPropagation();
                        // 静音
                        closeSound();
                      }}
                    ></Iconfont>
                  ) : (
                    <Iconfont
                      color='#fff'
                      boxCls={'h5player-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-shengyin'}
                      onClick={(event) => {
                        event.stopPropagation();
                        // 取消静音
                        openSound();
                      }}
                    ></Iconfont>
                  )}
                </div>
                <div class='buttons-box-right'>
                  <span class='h5player-btn'>{playback.rate || 0} kb/s</span>
                  <Iconfont
                    color='#fff'
                    boxCls={'h5player-btn'}
                    size={20}
                    height={'28px'}
                    href={'#icon-shuaxin'}
                    onClick={(event) => {
                      event.stopPropagation();
                      // playBtnClick();
                    }}
                  ></Iconfont>
                  {fullscreen.value ? (
                    <Iconfont
                      color='#fff'
                      boxCls={'h5player-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-quxiaoquanping_o'}
                      onClick={(event) => {
                        event.stopPropagation();
                        wholeFullScreen();
                        fullscreen.value = true;
                      }}
                    ></Iconfont>
                  ) : (
                    <Iconfont
                      color='#fff'
                      boxCls={'h5player-btn'}
                      size={20}
                      height={'28px'}
                      href={'#icon-quanping'}
                      onClick={(event) => {
                        event.stopPropagation();
                        wholecloseScreen();
                        fullscreen.value = true;
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
