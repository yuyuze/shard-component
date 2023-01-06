import { PropsTypes } from '../../type';
import { Group, Text, Num } from '../../../../components';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Group direction={'row'} width={'127px'} height={'82px'}>
        {/* <Group direction={'column'} cls={`${clsPrefix}-left`}>
          <Text
            cls={`${clsPrefix}-title`}
            fw={'bold'}
            fz={16}
            val={props.name}
            color={['#86e5ff 0%', '#00c9ff 100%']}
          ></Text>
          <Group direction={'column'} cls={`${clsPrefix}-total`}>
            <Num cls={`${clsPrefix}-people__num`} val={props.value}></Num>
            <Group cls={`${clsPrefix}-rate`}>
              <Num val={props.unit}></Num>
              <Text>%</Text>
            </Group>
          </Group>
        </Group> */}
        <Group
          direction={'column'}
          width={'50px'}
          class={
            props.isToday
              ? [`${clsPrefix}-compare`, `${clsPrefix}-compare_add`]
              : [`${clsPrefix}-compare`, `${clsPrefix}-compare_sub`]
          }
        >
          <Text cls={`${clsPrefix}-compare_title`} val={props.name}></Text>
          <Group cls={`${clsPrefix}-compare_number`}>
            <Text>{!props.isToday ? ' ' : '+'}</Text>
            <Num
              style={!props.isToday ? { marginTop: '-22px' } : {}}
              val={props.value}
            ></Num>
          </Group>
        </Group>
      </Group>
    </>
  );
};
