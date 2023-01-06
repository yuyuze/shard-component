import { PropsTypes } from '../../type';
import { Group, Text, Num } from '../../../../components';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <div class={`${clsPrefix}-maodun`}>
        {/* <img title='bg' src={props.icon} class={`${clsPrefix}-maodun_bg`} /> */}
        <Num cls={`${clsPrefix}-number`} val={props.value}></Num>
        <Text cls={`${clsPrefix}-title`} val={props.name}></Text>
      </div>
    </>
  );
};
