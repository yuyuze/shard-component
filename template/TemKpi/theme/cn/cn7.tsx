import { Group, Text, Num } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Group direction='column' class={`${clsPrefix}-box`} justify='center' spacing={2}>
          <Text val={`${props.name}${props.unit}`} color='#fff' cls={`${clsPrefix}-name`}></Text>
          <Group justify='space-between' align='baseline'>
            <Num val={props.value} cls={`${clsPrefix}-value`}></Num>
            <img src={props.icon} alt='' class={`${clsPrefix}-icon`}/>
          </Group>
        </Group>
    </>
  );
};
