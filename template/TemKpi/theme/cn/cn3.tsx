import { Group, Text, Num, Structure } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Structure
        top={<Text val={props.name}></Text>}
        bottom={
          <Group justify='center' spacing={3}>
            <Num val={props.value}></Num>
            <Text val={props.unit}></Text>
          </Group>
        }
        tcls={`${clsPrefix}-top`}
        bcls={`${clsPrefix}-bottom`}
        tb={{
          gap: 4
        }}
        cls={`${clsPrefix}-box`}
      ></Structure>
      <div class={`${clsPrefix}-div1`}></div>
      <div class={`${clsPrefix}-div2`}></div>
      <div class={`${clsPrefix}-div3`}></div>
      <div class={`${clsPrefix}-div4`}></div>
    </>
  );
};
