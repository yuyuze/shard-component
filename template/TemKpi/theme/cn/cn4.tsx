import {
  Group,
  Text,
  Num,
  Structure,
  Pie,
  Gauge
} from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Structure
        top={<Text val={props.name}></Text>}
        center={
          <Group justify='center' spacing={5} width='100%'>
            <Num val={props.value}></Num>
            <Text val={props.unit}></Text>
          </Group>
        }
        tb={{
          gap: 4
        }}
        bottom={
          <div>
            <Gauge
              height={100}
              startAngle={90}
              endAngle={-210}
              center={['50%', '50%']}
              progress={props.progress as number}
              lineWidth={5}
              roundCap={true}
              color={['#ff9900']}
            ></Gauge>
            <img src={props.icon}></img>
          </div>
        }
        tcls={`${clsPrefix}-top`}
        bcls={`${clsPrefix}-bottom`}
        ccls={`${clsPrefix}-center`}
        cls={`${clsPrefix}-box`}
      ></Structure>
    </>
  );
};
