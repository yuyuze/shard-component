import { Tooltip } from 'ant-design-vue';
import { PropsTypes } from '../../type';
import { Structure, Text, Num } from '../../../../components';

export default (props: PropsTypes, clsPrefix: string) => {
  return (
    <>
      <Tooltip
        color='rgb(7, 48, 72, 0)'
        title={props.hover && <>{/* {slots.hoverEle && slots.hoverEle()} */}</>}
      >
        <div
          style={{
            width: props.width + 'px' || '60px',
            height: props.height + 'px' || '60px'
            // ...props.style
          }}
          // onClick={(e) => {
          //   e.stopPropagation();
          //   emit('clicked', e);
          // }}
          class={`${clsPrefix}-kpi_box`}
        >
          <img
            // style={props.imgStyl}
            class={`${clsPrefix}-bg`}
            src={props.icon}
            alt=''
          />
          <Structure
            styl={{
              marginTop: props.value !== undefined ? '0px' : '10px',
              overflow: 'visible'
            }}
            tcls={`${clsPrefix}-top`}
            bcls={`${clsPrefix}-bottom`}
            tb={{ gap: 2 }}
            top={
              <Text
                style={{ top: '-12px' }}
                cls={`${clsPrefix}-text`}
                fz={18}
                val={props.name}
                color={[
                  'rgba(200, 245, 255, 1) 12%',
                  'rgba(51, 233, 254, 1) 53%',
                  'rgba(228, 250, 255, 1) 85%',
                  'rgba(133, 242, 255, 1) 98%'
                ]}
                fw={'bold'}
              ></Text>
            }
            bottom={
              props.value !== undefined && (
                <Num
                  cls={`${clsPrefix}-num`}
                  {...props.numProps}
                  style={{
                    fontSize: 16 + 'px',
                    color: '#fff'
                    // marginTop: '6px'
                  }}
                  val={props.value}
                ></Num>
              )
            }
          ></Structure>
        </div>
      </Tooltip>
    </>
  );
};
