import { Group, Text, Num, Structure } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Structure
        top={<Text val={props.name}></Text>}
        tb={{
          gap: 1
        }}
        bottom={
          <Group spacing={3} justify='center' align='baseline'>
            <Num
              val={props.value}
              style={{ fontSize: '20px', fontWeight: 'bold' }}
            ></Num>
            <Text val={props.unit} style={{ fontSize: '13px' }}></Text>
          </Group>
        }
        tcls={`${clsPrefix}-top`}
        bcls={`${clsPrefix}-bottom`}
        cls={`${clsPrefix}-box`}
      ></Structure>
      <div class={`${clsPrefix}-div1`}></div>
      <div class={`${clsPrefix}-div2`}></div>
      <div class={`${clsPrefix}-div3`}></div>
      <div class={`${clsPrefix}-div4`}></div>
    </>
  );
};
