import { Group, Text, Num } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Group cls={`${clsPrefix}-box`} spacing={5} justify='center'>
        <Text val={`${props.name}:`} color='#c5cad4' style={{ fontSize: '16px' }}></Text>
        <Num val={props.value} style={{ color: '#c5cad4', fontSize: '16px' }}></Num>
        {props.unit && <Text val={props.unit}></Text>}
      </Group>
    </>
  );
};
