import { defineComponent, computed, watch, ref } from 'vue';
import { isFunction } from 'lodash';
import Text from '../Text';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
import { getPropsSlot } from '../../util/props-util';
import { toSize } from '../../util/tools';
import { useMove } from './useMove';
import propTypes from './type';
import { Image } from '../../components';
import type { Column } from './type';
import AnimateList from './AnimateList';

const Container = defineComponent({
  name: 'VcList',
  props: propTypes(),
  emits: ['clickRow'],
  setup(props, { slots, emit }) {
    const { prefixCls, api } = useConfigInject('list', props);
    const defaultNode = computed(() => {
      return getPropsSlot(slots, props);
    });
    const { stopPlay, autoPlay, setList } = useMove({
      animate: props.animate,
      animateLen: props.animateLen,
      animateTime: props.animateTime
    });

    // 计算宽度
    const calcWidth = (item) => {
      const { width, flex = '1' } = item;
      if (item.width) {
        return `width: ${toSize(width)}`;
      }
      return `flex: ${flex}`;
    };
    const animateList = ref([]);
    const initList = (list) => {
      let i = 0;
      animateList.value = list.map((e) => {
        const time = Date.now();
        // 生成列表项唯一key
        return {
          ...e,
          listKey: `${time}-${i++}`
        };
      });
      setList(animateList);
      if (props.animate) {
        autoPlay();
      } else {
        stopPlay();
      }
    };
    watch(
      () => props.data,
      (n) => {
        if (n) {
          initList(n);
        }
      },
      {
        immediate: true
      }
    );
    const listNode = computed(() => {
      const itemStyl = {
        'margin-top': props.rowSpacing ? toSize(props.rowSpacing) : null,
        height: props.rowHeight ? toSize(props.rowHeight) : null
      };
      // 根据 type 生成 Node
      const generateNode = (
        value: string,
        column: Partial<Column>,
        type: 'text' | 'img' = 'text'
      ) => {
        switch (type) {
          case 'img': {
            const {
              imgLocal = false,
              imgWidth = 50,
              imgHeight = null
            } = column;
            let src;
            if (imgLocal) {
              src = value;
            } else {
              src = value.includes('http') ? value : api + value;
            }
            const config = {
              width: imgWidth,
              height: imgHeight
            };
            return <Image {...config} src={src}></Image>;
          }
          default: {
            const {
              ellipsis = true,
              ellipsisLen = 1,
              fontColor,
              format,
              title
            } = column;
            const config = {
              ellipsis: ellipsis ? ellipsisLen : false,
              color: fontColor,
              title: title && value,
              format
            };
            return (
              <Text width='100%' {...config}>
                {value}
              </Text>
            );
          }
        }
      };
      // 生成 行 cls
      const generateCls = (item) => {
        if (typeof props.rowClassName === 'string') {
          return props.rowClassName;
        }
        if (isFunction(props.rowClassName)) {
          return props.rowClassName(item);
        }
        return '';
      };
      return animateList.value.map((e, index) => (
        <div
          class={[`${prefixCls.value}-body-item`, generateCls(e)]}
          style={itemStyl}
          key={e.listKey}
          onClick={() => emit('clickRow', e, index)}
        >
          {props.column.map((item) => {
            return (
              <div style={[item.style, calcWidth(item)]} title={e[item.key]}>
                {item.itemSlot
                  ? item.itemSlot(e[item.key], item, e)
                  : generateNode(e[item.key], item, item.type)}
              </div>
            );
          })}
        </div>
      ));
    });

    const headerNode = computed(() => {
      return (
        <div class={[`${prefixCls.value}-header`, props.headClassName]}>
          {/* item.style, */}
          {props.column.map((item) => (
            <div style={[calcWidth(item)]}>{`${item.name}`}</div>
          ))}
        </div>
      );
    });
    return () => (
      <div
        class={prefixCls.value}
        onMouseenter={() => {
          props.animate && stopPlay();
        }}
        onMouseleave={() => {
          props.animate && autoPlay();
        }}
      >
        {props.header ? headerNode.value : ''}
        <div
          class={[`${prefixCls.value}-body`, props.bodyClassName]}
          style={{
            height: toSize(props.height)
          }}
        >
          <AnimateList>{listNode.value}</AnimateList>
        </div>
        {defaultNode.value}
      </div>
    );
  }
});

export default withInstall(Container);
