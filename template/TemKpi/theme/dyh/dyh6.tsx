import { Text, Structure } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Structure
        tb={{
          gap: 5
        }}
        top={<Text val={props.name}></Text>}
        bottom={<Text val={`${props.value} ${props.unit}`} cls={`${clsPrefix}-bottom-text`}></Text>}
        bcls={`${clsPrefix}-bottom`}
        tcls={`${clsPrefix}-top`}
      ></Structure>
    </>
  );
};
