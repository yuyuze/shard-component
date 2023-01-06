import { Group, Text, Image } from '../../../../components';
import type { PropsTypes } from '../../type';
export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Group
        cls={`${clsPrefix}-longcontainerBox`}
        style={{
          position: 'relative'
        }}
      >
        {/* 左侧图片部分 */}
        <Image
          // width={40}
          height={51}
          preview={false}
          src={props.icon}
          style={{
            marginTop: '10px',
            display: 'inline-block'
          }}
        ></Image>

        {/* 右侧图片部分 */}
        {props.value && (
          <div>
            <Text
              cls={`${clsPrefix}-numText`}
              fz={'20px'}
              block
              color={['rgba(0, 255, 198, 1)', 'rgba(0, 185, 220, 1)']}
              val={props.value}
            ></Text>
            <div class={`${clsPrefix}-top_space`}>{props.unit}</div>
          </div>
        )}
      </Group>
    </>
  );
};
