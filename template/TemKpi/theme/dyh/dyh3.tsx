import { Group, Text, Num, Structure } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Structure
        top={
          <Group spacing={3} justify='center' align='baseline'>
            <Num
              val={props.value}
              style={{ color: 'rgb(0, 255, 221)', fontSize: '24px' }}
            ></Num>
            <Text val={props.unit} color='#fff'></Text>
          </Group>
        }
        bottom={<Text val={props.name}></Text>}
        bcls={`${clsPrefix}-bottom`}
        tcls={`${clsPrefix}-top`}
        cls={`${clsPrefix}-box`}
      ></Structure>
    </>
  );
};
