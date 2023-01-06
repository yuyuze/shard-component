import { defineComponent, computed, TransitionGroup, toRef } from 'vue';
import type { CSSProperties } from 'vue';
import { array, number, string } from 'vue-types';
import { Text, Num } from '../components';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
import { toSize } from '../../util/tools';
import { getPropsSlot } from '../../util/props-util';
import vueTypes from '../../util/vue-types';
// import * as baseConfig from './config';

const Container = defineComponent({
  name: 'VcProgress',
  props: {
    type: string().def('line'),
    name: vueTypes.string.def(''), // 默认名称
    width: vueTypes.string.def('50%'), // 进度条长度
    strokeWidth: vueTypes.number.def(10), // 进度条粗细
    radius: vueTypes.number.def(10), // 圆角
    percentage: vueTypes.number.def(0), // 百分比(0-100)
    value: vueTypes.oneOfType([number(), string()]).def(0), // 值
    unit: vueTypes.string.def(''), // 值单位
    direction: vueTypes.string.def('90deg'), // 渐变方向
    color: array<any>().def([]), // 进度条颜色
    isHidden: vueTypes.bool.def(false), // 是否显示进度条背景
    backgroundColor: vueTypes.string.def('#ebeef5'), // 进度条背景颜色
    steps: vueTypes.number.def(13) // 块数
  },
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('progress', props);
    const defaultNode = computed(() => {
      return getPropsSlot(slots, props);
    });
    // 背景色
    const bgColor = computed(() => {
      return props.isHidden ? 'rgba(0, 0, 0, 0)' : props.backgroundColor;
    });
    // 默认进度条颜色
    const colors = computed(() => {
      const len = props.color.length;
      const key = props.color;
      if (len > 1) {
        const step = {
          2: ['0%', '100%'],
          3: ['0%', '50%', '100%'],
          4: ['0%', '35%', '65%', '100%'],
          5: ['0%', '0%', '50%', '100%', '100%']
        };
        if (step[len]) {
          for (let i = 0; i < len; i++) {
            // 遍历的颜色 会疯狂在后面加2次数据
            key[i] = `${key[i]} ${step[len][i]}`;
          }
          return `linear-gradient(${props.direction}, ${key.join(',')})`;
        }
      }
      return `${key[0] || key}`;
    });
    // 进度条(line)
    const progressLine = computed(() => {
      const styl = {
        '--bgColor': bgColor.value,
        '--width': props.percentage > 100 ? '100%' : props.percentage + '%',
        '--lineColor': colors.value,
        '--strokeWidth': toSize(props.strokeWidth),
        '--radius': toSize(props.radius),
        '--linewidth': props.width
      } as CSSProperties;
      return (
        <div class={`${prefixCls.value}-item-line`} style={styl}>
          <div class={`${prefixCls.value}-item-line-item`} style={styl}></div>
        </div>
      );
    });

    const progressNode = computed(() => {
      switch (props.type) {
        case 'line': {
          return progressLine.value;
        }
        default: {
          return progressLine.value;
        }
      }
    });

    // 前缀
    const prefixNode = computed(() => {
      const prefix = getPropsSlot(slots, props, 'prefix');
      return prefix ? (
        // 插槽存在数据遗漏问题
        <div>{prefix}</div>
      ) : (
        <Text width='100%' ellipsis>
          {props.name}
        </Text>
      );
    });
    // 后缀
    const suffixNode = computed(() => {
      const suffix = getPropsSlot(slots, props, 'suffix');
      return suffix ? (
        // 插槽存在数据遗漏问题
        <div>{suffix}</div>
      ) : (
        <Num suffix={props.unit} val={props.value}></Num>
      );
    });

    // 数值
    const valueNode = computed(() => {
      const valueGap = props.isHidden
        ? `${parseInt(-(100 - props.percentage) / 2)}%`
        : '0%';
      return (
        <div
          class={`${prefixCls.value}-item-value`}
          style={`left: ${valueGap};`}
          data-ant='ant-progressvalue'
        >
          {suffixNode.value}
        </div>
      );
    });

    return () => (
      <div class={`${prefixCls.value}`}>
        <div class={`${prefixCls.value}-item`}>
          <div class={`${prefixCls.value}-item-name`}>{prefixNode.value}</div>
          {progressNode.value}
          {valueNode.value}
        </div>
      </div>
    );
  }
});

export default withInstall(Container);
