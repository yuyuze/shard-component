import { Text, Num, Structure } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Structure
      lr={{
        gap: 5
      }}
        left={<Text val={`${props.name}:`}></Text>}
        center={<Num val={props.value}></Num>}
        right={<Text val={props.unit}></Text>}
        lcls={`${clsPrefix}-left`}
        ccls={`${clsPrefix}-center`}
        rcls={`${clsPrefix}-right`}
      ></Structure>
    </>
  );
};
