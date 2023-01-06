import { PropsTypes } from '../../type';
import { Text } from '../../../../components';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <div class={`${clsPrefix}-container`}>
        <Text
          shadow={true}
          shadowBlur={3}
          offset={[0, 2]}
          cls={`${clsPrefix}-percent`}
          val={props.value}
          color={['#00ffc6', '#005df8']}
        ></Text>
        <Text cls={`${clsPrefix}-title`} val={props.name}></Text>
      </div>
    </>
  );
};
