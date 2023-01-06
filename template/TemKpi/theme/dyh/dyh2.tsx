import { Structure, Text, Num, Group } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Structure
        left={props.icon && <img src={props.icon}></img>}
        lcls={`${clsPrefix}-left`}
        rcls={`${clsPrefix}-right`}
        lr={{
          gap: 10
        }}
        right={
          <Structure
            tcls={`${clsPrefix}-right-top`}
            bcls={`${clsPrefix}-right-bottom`}
            top={<Text val={props.name} ellipsis></Text>}
            bottom={
              <Group spacing={3}>
                <Num val={props.value} style={{ color: '#fff' }}></Num>
                <Text val={props.unit} color='#9fbece'></Text>
              </Group>
            }
          ></Structure>
        }
      ></Structure>
    </>
  );
};
