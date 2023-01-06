import { CaretRightOutlined } from '@ant-design/icons-vue';
import { computed } from 'vue';
import { Text, Structure, Shape, Group } from '../../../../components';
import type { PropsTypes } from '../../type';
import { toSize } from '../../../../util/tools';

interface ThemeConfig {
  props: PropsTypes;
  clsPrefix: string;
  vnode: any;
  slots: any;
  emit: any;
  null: any;
}

export default (config: ThemeConfig) => {
  const { clsPrefix, props, vnode, emit } = config;
  const rightNode = computed(() => {
    if (props.null) {
      return <div></div>;
    }
    return (
      <>
        {props.more ? (
          <div
            class={`${clsPrefix}-btn`}
            onClick={() => {
              emit('click');
            }}
          >
            {typeof props.more === 'string' ? props.more : '查看更多'}
            <CaretRightOutlined
              style={{
                fontSize: '10px'
              }}
            ></CaretRightOutlined>
          </div>
        ) : (
          <div class={`${clsPrefix}-blockline`}>
            <div></div>
            <div></div>
          </div>
        )}
      </>
    );
  });
  return (
    <div
      class={clsPrefix}
      style={{
        width: toSize(props.width),
        height: toSize(props.height)
      }}
    >
      {props.isTitle && (
        <Structure
          lr={{
            gap: 0,
            align: 'center',
            height: '100%'
          }}
          pd={[0, 13]}
          cls={`${clsPrefix}-title`}
          left={<Shape type={'circle'} width={9} color='#FFA01C'></Shape>}
          center={<Text val={props.name}></Text>}
          right={
            rightNode.value
            // props.more ? (
            //   <div
            //     class={`${clsPrefix}-btn`}
            //     onClick={() => {
            //       emit('click');
            //     }}
            //   >
            //     {typeof props.more === 'string' ? props.more : '查看更多'}
            //     <CaretRightOutlined
            //       style={{
            //         fontSize: '10px'
            //       }}
            //     ></CaretRightOutlined>
            //   </div>
            // ) : (
            //   <div class={`${clsPrefix}-blockline`}>
            //     <div></div>
            //     <div></div>
            //   </div>
            // )
          }
        ></Structure>
      )}

      <div class={`${clsPrefix}-body`}>{vnode}</div>
    </div>
  );
};
