import {
  defineComponent,
  computed,
  toRefs,
  CSSProperties,
  ref,
  onMounted,
  watch,
  watchEffect
} from 'vue';
import { isNumber } from 'lodash';
import { withInstall } from '../../../../util/type';
import { toSize } from '../../../../util/tools';
import Iconfont from '../../../Iconfont/index';
import { lightBlickSpecialProps } from '../../types/index';
import { useConfigInject } from '../../../../util/hooks';
import { specialIcon, themeColor } from '../../types/lightBlick/index';
import '../../style/lightBlink.less';

interface NewCss extends CSSProperties {
  [key: `--${string}`]: any;
}

const LightBlickSpecial = defineComponent({
  name: 'VcLightBlickSpecial',
  inheritprops: true,
  props: lightBlickSpecialProps,
  setup(props) {
    const { prefixCls } = useConfigInject('special', props);
    const lightBoxRef = ref([]);
    const pre = prefixCls.value;
    const {
      num,
      theme,
      icon,
      defaultColor,
      activeColor,
      effect,
      animation,
      time
    } = toRefs(props);

    const styl = computed(() => {
      const { width, height, time, gap, direction } = { ...props };
      return {
        width: toSize(width),
        height: toSize(height),
        gap: toSize(gap),
        '--time': time + 's',
        '--direction': direction
      };
    });

    const iconBoxStyl = computed(() => {
      const { iconWidth, iconHeight, icon, rotateZ } = { ...props };
      return {
        width: toSize(iconWidth),
        height: toSize(iconHeight),
        transform:
          icon === 'parallelogram' ? `rotateZ(${rotateZ}deg)` : 'rotateZ(0deg)'
      };
    });

    const iconStyl = computed(() => {
      const {
        iconWidth,
        iconHeight,
        defaultColor,
        activeColor,
        effect,
        theme
      } = {
        ...props
      };
      const colorObj = {};
      if (theme && Object.keys(themeColor).includes(theme)) {
        Object.assign(colorObj, {
          defaultColor: themeColor[theme].defaultColor,
          activeColor: themeColor[theme].activeColor,
          '--default-color': themeColor[theme].defaultColor,
          '--active-color': themeColor[theme].activeColor
        });
      }
      if (theme === undefined) {
        Object.assign(colorObj, {
          defaultColor,
          activeColor,
          '--default-color': defaultColor,
          '--active-color': activeColor
        });
      }

      return {
        animationDirection: effect,
        ...colorObj
      };
    });

    const animationdelay = function (i: number): NewCss {
      const { num, time } = { ...props };
      let singleTime = 1;
      if (isNumber(num) && isNumber(time)) {
        singleTime = time / num;
      }
      if (num === 0) {
        throw new Error('num is not 0, effect is no content');
      }
      return {
        // animationDelay: i * singleTime + 's',
        animationDuration: time + 's',
        '--num': num,
        '--item-index': i + 1,
        '--duration': singleTime + 's'
      };
    };
    let timer = null;
    let flag = false;
    // 动画
    watchEffect(() => {
      let i = 0;

      // 正开始 反开始
      if (props.animationDir === 'forward') {
        flag = false;
        i = 0;
      } else if (props.animationDir === 'opposite') {
        flag = true;
        i = (num.value as any) - 1;
      }
      if (animation.value && lightBoxRef.value.length === num.value) {
        timer = setInterval(() => {
          setTimeout(() => {
            if (i === (num.value as number) || (flag && i === -1)) {
              // 正反来回逻辑
              if (props.reverse) {
                flag = !flag;
              }

              if (!flag) {
                i = -1;
              } else {
                i = num.value as number;
              }
              // 消除所有样式
              lightBoxRef.value.forEach((item) => {
                if (item) {
                  const defaultColor = (item.style as any).defaultColor;
                  if (!specialIcon.includes(icon.value as string)) {
                    (item as any).$refs.use &&
                      (item as any).$refs.use.setAttribute(
                        'fill',
                        defaultColor
                      );
                  } else {
                    item.style.background = defaultColor;
                  }
                }
              });
            }
            // 点亮
            if (lightBoxRef.value[i]) {
              const ele = lightBoxRef.value[i] as HTMLElement;
              // const defaultColor = (ele.style as any).defaultColor;
              const activeColor = (ele.style as any).activeColor;

              if (!specialIcon.includes(icon.value as string)) {
                // ele.style.fill = activeColor;
                (ele as any).$refs.use &&
                  (ele as any).$refs.use.setAttribute('fill', activeColor);
              } else {
                ele.style.background = activeColor;
              }
            }
            // 正反逻辑处理
            if (!flag) {
              i += 1;
            } else {
              i -= 1;
            }
          }, props.setTimeOut as number);
        }, ((time.value as number) * 1000) / num.value);
      }
    });

    const renderContent = computed(() => {
      return new Array(num.value).fill(1).map((item, index) => {
        return (
          <div
            style={[iconBoxStyl.value, animationdelay(index)]}
            class={`${pre}__light-blink--element`}
          >
            {typeof icon.value === 'string' &&
              specialIcon.includes(icon.value) && (
                <div
                  style={[iconStyl.value, animationdelay(index)]}
                  class={`${pre}__light-blink--${icon.value}`}
                  ref={(el) => {
                    lightBoxRef.value.push(el);
                  }}
                ></div>
              )}
            {typeof icon.value === 'string' &&
              !specialIcon.includes(icon.value) && (
                <Iconfont
                  width={toSize(props.iconWidth)}
                  height={toSize(props.iconHeight)}
                  style={[iconStyl.value, animationdelay(index)]}
                  cls={`${pre}__light-blink--svg`}
                  href={icon.value}
                  color={(iconStyl.value as any).defaultColor}
                  ref={(el) => {
                    lightBoxRef.value.push(el);
                  }}
                ></Iconfont>
              )}
          </div>
        );
      });
    });
    return () => {
      return (
        <div class={prefixCls.value} style={props.styl}>
          <div style={styl.value} class={`${pre}__light-blink`}>
            {renderContent.value}
          </div>
        </div>
      );
    };
  }
});

export default withInstall(LightBlickSpecial);
