import { defineComponent, ref, computed, watch } from 'vue';
import { isArray } from 'lodash';
import { useConfigInject } from '../../util/hooks';
import { withInstall } from '../../util/type';
import { request } from '../../util/http';
import TemList from '../TemList';
import { generateProps } from './type';

const ComList = defineComponent({
  name: 'VcComList',
  props: generateProps(),
  emits: ['click', 'fail', 'success'],
  setup(props, { slots, emit }) {
    const { prefixCls, api } = useConfigInject('comlist', props);
    const data = ref([]);
    const column = ref([]);
    const original = computed(() => {
      const { theme, height, isHeader } = props;
      return {
        theme,
        height,
        isHeader
      };
    });
    const filterObj = computed(() => {
      return props.filter.reduce((a, b) => {
        a[b] = true;
        return a;
      }, {});
    });

    const mergeObj = computed(() => {
      return props.merge.reduce((a, b) => {
        a[b.key] = b;
        return a;
      }, {});
    });

    const columnFilter = computed(() => {
      const f = filterObj.value;
      const m = mergeObj.value;
      const list = column.value.filter((e) => !f[e.key]);

      return list.map((e) => {
        return {
          ...e,
          ...m[e.key]
        };
      });
    });
    const getListVal = (parame) => {
      request({
        method: props.method,
        url: props.api,
        data: parame || {},
        api: props.http || api
      })
        .then((res) => {
          if (res.code === 200) {
            const { dataTh, dataTb } = res.data;
            const list = isArray(dataTb) ? dataTb : [];
            data.value = list.slice(0, 30);
            column.value = dataTh;
            emit('success');
          }
        })
        .catch((err) => {
          emit('fail', err);
        });
    };
    watch(
      () => props.parame,
      () => {
        getListVal(props.parame);
      }
    );
    getListVal(props.parame);
    return () => (
      <TemList
        onClick={(...e) => {
          emit('click', ...e);
        }}
        {...original.value}
        data={[...data.value]}
        column={[...columnFilter.value]}
      ></TemList>
    );
  }
});

export default withInstall(ComList);
