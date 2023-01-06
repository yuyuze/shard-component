import { PropsTypes } from '../../type';
import { Group, Text } from '../../../../components';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <div class={`${clsPrefix}-container`}>
        <Group class={`${clsPrefix}-percent`}>
          <Text
            val={props.value + props.unit}
            color={['#70fffa', '#0064f8']}
          ></Text>
        </Group>
        <Group
          height={30}
          direction='column'
          spacing={0}
          align={'center'}
          class={`${clsPrefix}-name_box`}
        >
          <Text
            color={['#ffffff', '#8edbff', '#ffffff', '#8edbff']}
            cls={`${clsPrefix}-line_1`}
            val={props.name.substring(0, 2)}
          ></Text>
          <Text
            color={['#ffffff', '#8edbff', '#ffffff', '#8edbff']}
            cls={`${clsPrefix}-line_1`}
            val={props.name.substring(2, props.name.length)}
          ></Text>
        </Group>
      </div>
    </>
  );
};
