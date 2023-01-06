import { Group, Text, Num } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Group spacing='9'>
        <div class={`${clsPrefix}-left`}>
          <div class={`${clsPrefix}-iconbox`}>
            {props.icon && (
              <img class={`${clsPrefix}-iconitem`} src={props.icon} alt='' />
            )}
          </div>
        </div>
        <div class={`${clsPrefix}-borderbar`}></div>
        <div class={`${clsPrefix}-right`}>
          <Group direction='column' align='start' spacing={[12, 0]}>
            <div class={`${clsPrefix}-right-name`}>
              <Text val={props.name} ellipsis></Text>
            </div>
            <Group spacing='5' align='baseline'>
              <Num cls={`${clsPrefix}-right-value`} val={props.value}></Num>
              <div class={`${clsPrefix}-right-unit`}>{props.unit}</div>
            </Group>
          </Group>
        </div>
      </Group>
    </>
  );
};
