import { Group, Text, Num } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Group cls={`${clsPrefix}-box`} spacing={5}>
        <Text val={`${props.name}:`} color='#fff' style={{ fontSize: '16px' }}></Text>
        <Num val={props.value} style={{ color: '#00bdd8', fontSize: '16px', fontWeight: 'bold' }}></Num>
        {props.unit && <Text val={props.unit}></Text>}
      </Group>
    </>
  );
};
