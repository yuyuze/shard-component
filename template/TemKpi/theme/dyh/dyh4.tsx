import { Group, Text, Num, Structure, Image } from '../../../../components';
import type { PropsTypes } from '../../type';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Structure
        left={props.icon && <Image src={props.icon} preview={false}></Image>}
        center={<Text val={props.name}></Text>}
        right={
          <Group align='baseline' spacing={3}>
            <Num val={props.value} style={{ fontSize: '20px', color: '#fff', fontWeight: 'bold' }}></Num>
            <Text val={props.unit} color="rgb(188, 188, 188)" style={{ fontWeight: 'bold' }}></Text>
          </Group>
        }
        lcls={`${clsPrefix}-left`}
        ccls={`${clsPrefix}-center`}
        rcls={`${clsPrefix}-right`}
        cls={`${clsPrefix}-box`}
      ></Structure>
    </>
  );
};
