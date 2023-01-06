import { computed, defineComponent, ref } from 'vue';
import { useConfigInject } from '../../util/hooks';
import { withInstall } from '../../util/type';
import { getPropsSlot } from '../../util/props-util';
import { toSize } from '../../util/tools';
import VirtualList from '../vc-virtual-list';
import { scrollProps } from './type';
import classNames from '../../util/classNames';

const Scroll = defineComponent({
  name: 'VcScroll',
  props: scrollProps(),
  slots: ['renderItem'],
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('scroll', props);
    // const defaultNode = getPropsSlot(slots, props);
    const styl = computed(() => {
      const { width, height } = { ...props };
      return {
        width: toSize(width),
        height: toSize(height)
      };
    });

    // 滚动参数配置
    const ScrollProps = computed(() => {
      const {
        height,
        itemKey,
        itemHeight,
        virtual,
        fullHeight,
        auto,
        autoStep
      } = { ...props };
      return {
        height,
        virtual,
        fullHeight: fullHeight || false,
        itemHeight: Number(itemHeight) || 30,
        itemKey: itemKey || 1,
        auto: auto || false,
        autoStep: autoStep || 1
      };
    });

    // 判断是否为无限滚动
    const Infinitys = computed(() => {
      const { height, itemHeight, auto } = ScrollProps.value;
      const len = Math.ceil(Number(height) / itemHeight);
      const { data } = { ...props };
      return auto && data.length > len;
    });

    // 处理无限滚动值以及普通值的区别
    const ListData = computed(() => {
      const { height, itemHeight } = ScrollProps.value;
      const { data } = { ...props };
      let list = [];
      if (Infinitys.value) {
        const viewLen = Math.ceil(height / itemHeight);
        list = [...data.slice(-viewLen), ...data, ...data.slice(0, viewLen)];
      } else {
        list = [...data];
      }
      return list;
    });

    const ListBody = computed(() => {
      const listRef = ref(null);
      const { autoStep, height, itemHeight } = ScrollProps.value;
      const { data } = { ...props };
      const viewLen = Math.ceil(height / itemHeight);
      const allLen = data.length;
      const ScrollAuto = ref(true);
      const ScrollBody = ref(null);
      let ScrollTop = 0;
      let juli = 0;
      // 自动滚动
      if (Infinitys.value) {
        const start = viewLen * itemHeight;
        const end = allLen * itemHeight;
        // eslint-disable-next-line vue/no-async-in-computed-properties
        setTimeout(() => {
          juli = start;
          const gundong = () => {
            if (ScrollAuto.value) {
              if (juli > end) {
                juli -= end;
                listRef.value.scrollTo(juli);
              }
              juli += autoStep;
              listRef.value.scrollTo(juli);
            }
            Infinitys.value && requestAnimationFrame(gundong);
          };
          requestAnimationFrame(gundong);
          ScrollBody.value.onmousewheel = (e) => {
            if (e.wheelDelta > 0) {
              if (ScrollTop < start) {
                listRef.value.scrollTo(ScrollTop + end);
              }
            }
            if (e.wheelDelta < 0) {
              if (ScrollTop > end) {
                listRef.value.scrollTo(ScrollTop - end);
              }
            }
            juli = ScrollTop;
          };
        }, 1000);
      }
      const bodyCls = classNames(`${prefixCls.value}-body`, {
        [`${prefixCls.value}-auto-infinity`]: Infinitys.value
      });
      return (
        <div class={[bodyCls, props.cls]} ref={ScrollBody}>
          <VirtualList
            data={ListData.value}
            ref={listRef}
            onMouseenter={() => (ScrollAuto.value = false)}
            onMouseleave={() => (ScrollAuto.value = true)}
            onChangeTop={(e) => (ScrollTop = e.scrollTop)}
            children={(treenode, index) => {
              // 自定义渲染
              const renderItem = props?.renderItem || slots?.renderItem;
              return renderItem(treenode, index);
            }}
            {...ScrollProps.value}
          ></VirtualList>
        </div>
      );
    });

    return () => (
      <>
        <div style={styl.value} class={prefixCls.value}>
          {/* {defaultNode} */}
          {ListBody.value}
        </div>
      </>
    );
  }
});

export default withInstall(Scroll);
