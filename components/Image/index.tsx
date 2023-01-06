import { defineComponent, computed, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { EyeOutlined } from '@ant-design/icons-vue';
import { Image as AntImage, Spin } from 'ant-design-vue';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
import classNames from '../../util/classNames';
import { toSize } from '../../util/tools';
import { propsTypes } from './type';
import fallback from './fallback.png';

const Image = defineComponent({
  name: 'VcImage',
  props: propsTypes(),
  setup(props) {
    const { prefixCls } = useConfigInject('image', props);
    const el = ref(null);
    const parentEl = ref(null);
    const isFallBack = ref(false);
    const imgSrc = ref('');
    let isImgElShow = false;
    const isLoading = ref();

    function loadSrc() {
      const imgEl = el.value as HTMLImageElement;
      const Img = document.createElement('img');
      Img.src = props.src;
      if (!Img.complete && props.loading) {
        isLoading.value = true;
      }
      Img.onload = () => {
        imgEl.src = props.src;
        imgSrc.value = props.src;
        isLoading.value = false;
      };
      Img.onerror = () => {
        isFallBack.value = true;
        imgEl.src = props.fallback || fallback;
        isLoading.value = false;
      };
    }

    watch(
      () => props.src,
      () => {
        if (isImgElShow) {
          loadSrc();
        }
      }
    );

    onMounted(() => {
      if (props.lazy) {
        const Intersection = new IntersectionObserver(
          (items) => {
            items.forEach((e) => {
              if (e.isIntersecting) {
                isImgElShow = true;
                loadSrc();
                Intersection.disconnect();
              }
            });
          },
          {
            threshold: [0]
          }
        );
        Intersection.observe(parentEl.value);
      }
    });
    const visible = ref<boolean>(false);
    const setVisible = (value): void => {
      visible.value = value;
    };
    return () => {
      const styl = computed<CSSProperties>(() => {
        const { width, height, radius } = { ...props };
        return {
          width: toSize(width),
          height: toSize(height),
          borderRadius: toSize(radius)
        };
      });
      const cls = computed(() => {
        return classNames(prefixCls.value, {
          // [`${prefixCls.value}-preview`]: !isFallBack.value && props.preview
        });
      });
      return (
        <div ref={parentEl} class={cls.value} style={styl.value}>
          {isLoading.value && props.loading ? <Spin /> : ''}
          <img
            ref={el}
            style={{
              height: props.height ? toSize(props.height) : 'auto',
              ...props.style,
              objectFit: 'fill',
              display: !isLoading.value ? 'block' : 'none'
            }}
            class={`${prefixCls.value}-img`}
          />
          {!isFallBack.value && props.preview ? (
            <div
              class={`${prefixCls.value}-previewmask`}
              onClick={() => setVisible(true)}
            >
              <EyeOutlined></EyeOutlined>
              预览
            </div>
          ) : (
            ''
          )}
          {!isFallBack.value && props.preview ? (
            // :preview="{ visible, onVisibleChange: vis => (visible = vis) }"
            // <ImagePreviewGroup preview={}></ImagePreviewGroup>
            <AntImage
              style={{
                display: 'none',
                height: '0'
              }}
              preview={{
                src: imgSrc.value,
                visible: visible.value,
                onVisibleChange: setVisible
              }}
            ></AntImage>
          ) : (
            ''
          )}
        </div>
      );
    };
  }
});

export default withInstall(Image);
