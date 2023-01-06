import { defineComponent, computed, onMounted, ref } from 'vue';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall, tuple } from '../../util/type';
import { getPropsSlot } from '../../util/props-util';
import { toSize } from '../../util/tools';
import vueTypes from '../../util/vue-types';

const Adapt = tuple('width', 'height', 'two-way', 'scroll', 'auto');
const Target = tuple('parent', 'window');
const Resolution = tuple('16:9', '21:9', '32:9');

const Container = defineComponent({
  name: 'VcContainer',
  props: {
    targetWidth: vueTypes.number,
    targetHeight: vueTypes.number,
    width: vueTypes.number,
    height: vueTypes.number,
    customHeight: vueTypes.unit,
    adapt: vueTypes.oneOf(Adapt).def('width'),
    target: vueTypes.oneOf(Target).def('window'),
    resolution: vueTypes.oneOf(Resolution).isRequired,
    bg: vueTypes.string,
    styl: vueTypes.style
  },
  emits: ['scale', 'scaleXY', 'auto'],
  setup(props, { slots, emit }) {
    const { prefixCls } = useConfigInject('container', props);
    const defaultNode = computed(() => {
      return getPropsSlot(slots, props);
    });
    const ContainerEl = ref<HTMLDivElement>(null);
    const transform = ref('');
    const top = ref(0);
    const left = ref(0);
    const widthGroup = {
      '16:9': 1920,
      '21:9': 3440,
      '32:9': 7680
    };
    const heightGroup = {
      '16:9': 1080,
      '21:9': 1440,
      '32:9': 2160
    };
    // 获取目标宽高
    const getWidthHeight = () => {
      const { target, targetWidth, targetHeight } = { ...props };
      const obj = {
        targetWidth: window.innerWidth || targetWidth,
        targetHeight: window.innerHeight || targetHeight
      };
      if (target === 'parent') {
        const parent = ContainerEl.value.parentElement;
        Object.assign(obj, {
          targetWidth: parent.offsetWidth,
          targetHeight: parent.offsetHeight
        });
      }
      return obj;
    };

    const handler = () => {
      const { targetWidth, targetHeight } = getWidthHeight();
      const width = props.width || widthGroup[props.resolution];
      const height = props.height || heightGroup[props.resolution];
      const xScale = targetWidth / width;
      const yScale = targetHeight / height;

      const scaleVal = {
        width: [xScale],
        height: [yScale],
        'two-way': [xScale, yScale],
        scroll: [1, 1]
      };
      if (props.adapt === 'auto') {
        if (
          targetWidth / targetHeight >= 1 &&
          targetWidth / targetHeight <= width / height
        ) {
          (scaleVal as any).auto = [xScale];
          top.value = (targetHeight - height * xScale) / 2;
          left.value = 0;
        } else {
          (scaleVal as any).auto = [yScale];
          left.value = (targetWidth - width * yScale) / 2;
          top.value = 0;
        }
      }
      emit('scale', xScale);
      emit('auto', scaleVal[props.adapt][0]);
      emit('scaleXY', { xScale, yScale });
      transform.value = `scale(${scaleVal[props.adapt].join(',')})`;
    };
    onMounted(() => {
      handler();
      window.addEventListener('resize', handler);
      window.addEventListener(
        'beforeunload',
        () => {
          window.removeEventListener('resize', handler);
        },
        {
          once: true
        }
      );
    });
    function isImg(val) {
      const isImage = /.(png|jpg|gif|jpeg|webp)$/;
      const isBase64 = /data:image\/.*;base64,/;
      if (isImage.test(val) || isBase64.test(val)) {
        return true;
      }
      return false;
    }
    const styl = computed(() => {
      const { width, height, bg, resolution, customHeight, adapt } = {
        ...props
      };
      const targetHeight =
        toSize(customHeight) || toSize(height || heightGroup[resolution]);

      switch (adapt) {
        case 'width':
        case 'height':
        case 'two-way': {
          return `
            width: ${toSize(width || widthGroup[resolution])};
            height: ${targetHeight};
            transform: ${transform.value};
            background: ${isImg(bg) ? `url(${bg})` : bg};
          `;
        }
        case 'auto': {
          return `
            width: ${toSize(width || widthGroup[resolution])};
            height: ${targetHeight};
            transform: ${transform.value};
            --top: ${top.value + 'px'};
            --left: ${left.value + 'px'};
            background: ${isImg(bg) ? `url(${bg})` : bg};
          `;
        }
        default: {
          return `
            width: 100vw;
            height: 100vh;
          `;
        }
      }
    });

    const scrollStyl = computed(() => {
      const { bg, resolution } = { ...props };
      return {
        width: widthGroup[resolution] + 'px',
        height: heightGroup[resolution] + 'px',
        background: isImg(bg) ? `url(${bg})` : bg
      };
    });
    return () => {
      return (
        <>
          {props.adapt === 'scroll' ? (
            <div
              class={[prefixCls.value, `${prefixCls.value}-${props.adapt}`]}
              style={[styl.value, props.styl]}
              ref={ContainerEl}
            >
              <div style={scrollStyl.value}>{defaultNode.value}</div>
            </div>
          ) : (
            <div
              class={[prefixCls.value, `${prefixCls.value}-${props.adapt}`]}
              style={[styl.value, props.styl]}
              ref={ContainerEl}
            >
              {defaultNode.value}
            </div>
          )}
        </>
      );
    };
  }
});

export default withInstall(Container);
