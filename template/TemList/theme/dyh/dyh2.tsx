import { List } from '../../../../components';
import type { PropsTypes } from '../../type';

interface ThemeConfig {
  props: PropsTypes;
  clsPrefix: string;
  vnode: any;
  slots: any;
  emit: any;
}

export default (config: ThemeConfig) => {
  const { clsPrefix, props, emit } = config;

  return (
    <List
      data={props.data}
      column={props.column}
      header={props.isHeader}
      headClassName={`${clsPrefix}-head`}
      rowClassName={`${clsPrefix}-body`}
      animate={props.animate}
      height={props.height}
      onClickRow={(e) => {
        emit('click', e);
      }}
    ></List>
  );
};
