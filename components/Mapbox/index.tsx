/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-09-11 13:04:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-05 15:15:47
 */
import { defineComponent, computed, onMounted, watch, onUnmounted } from 'vue';
import type { CSSProperties } from 'vue';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
import { toSize } from '../../util/tools';
import vueTypes from '../../util/vue-types';
import { request } from '../../util/http';

const Mapbox = defineComponent({
  name: 'VcMapbox',
  props: {
    width: vueTypes.unit.def('100%'),
    height: vueTypes.unit.def('100%'),
    mapkey: vueTypes.string,
    type: vueTypes.string,
    rotateDisable: vueTypes.bool.def(false)
  },
  emits: ['load'],
  setup(props, { slots, emit }) {
    const { prefixCls, api } = useConfigInject('mapbox', props);
    let Tmap;
    const styl = computed<CSSProperties>(() => {
      const { width, height } = { ...props };
      return {
        width: toSize(width),
        height: toSize(height)
      };
    });
    function mapRemove() {
      Tmap && Tmap.remove();
      Tmap = null;
    }
    watch(
      () => props.mapkey,
      async () => {
        mapRemove();
        let Tmap;
        const config = {
          el: 'mapbox-main',
          url: api,
          key: props.mapkey,
          load: () => {
            emit('load', Tmap);
          }
        };
        Tmap = await TJMap.initMap(config);
        // emit('load', Tmap);
      }
    );
    onMounted(async () => {
      let Tmap;

      if (props.mapkey) {
        const config = {
          el: 'mapbox-main',
          url: api,
          key: props.mapkey,
          load: () => {
            emit('load', Tmap);
          }
        };
        Tmap = await TJMap.initMap(config);

        if (props.rotateDisable) {
          Tmap.touchPitch.disable();
          // Tmap.touchZoomRotate.disableRotation();
          // Tmap.touchZoomRotate.disable();
          // Tmap.dragRotate.disable();
          // Tmap.dragPan.disable();
        }
      } else {
        const res = await request({
          api,
          method: 'get',
          url: '/bus/dimBasDistrict/getInfoByUser'
        });

        const data = res.data;
        const config = {
          el: 'mapbox-main',
          url: api,
          key: data.mapKey25D,
          load: () => {
            emit('load', Tmap);
          }
        };
        Tmap = await TJMap.initMap(config);
        if (props.rotateDisable) {
          Tmap.touchPitch.disable();
          // Tmap.touchZoomRotate.disableRotation();
          // Tmap.dragRotate.disable();
          // Tmap.dragPan.disable();
        }
        emit('load', Tmap);
      }
    });
    onUnmounted(() => {
      mapRemove();
    });
    return () => (
      <div id='mapbox-main' class={prefixCls.value} style={styl.value}></div>
    );
  }
});

export default withInstall(Mapbox);
