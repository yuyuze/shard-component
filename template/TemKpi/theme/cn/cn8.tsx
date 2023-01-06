import { Group, Text, Num } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Group class={`${clsPrefix}-box`}>
        <div class={`${clsPrefix}-iconBox`}>
          <img src={props.icon} alt='' class={`${clsPrefix}-icon`} />
        </div>
        <Group direction='column' class={`${clsPrefix}-right`}>
          <Text
            val={`${props.name}`}
            color='#fff'
            cls={`${clsPrefix}-name`}
          ></Text>
          <Group justify='space-between' cls={`${clsPrefix}-right-bottom`}>
            <Num val={props.value} cls={`${clsPrefix}-value`}></Num>
            <Text val={`${props.unit}`} cls={`${clsPrefix}-unit`}></Text>
          </Group>
        </Group>
      </Group>
    </>
  );
};
