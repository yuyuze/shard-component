import { computed } from 'vue';
import { Group, Text, Num } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  const styl = computed<any>(() => {
    return {
      '--bgColor': props.backgroundColor || '#45484d',
      '--height': props.height || '27px',
      '--width': props.width || '185px'
    };
  });
  return (
    <>
      <Group
        spacing={5}
        justify='center'
        align='center'
        cls={`${clsPrefix}-box`}
        style={styl.value}
      >
        <Text
          val={`${props.name} :`}
          color='#fff'
        ></Text>
        <Num
          val={props.value}
          style={{ color: '#ffa01c' }}
        ></Num>
        <Text
          val={props.unit}
          color='#fff'
        ></Text>
      </Group>
    </>
  );
};
