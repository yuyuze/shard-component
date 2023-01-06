import { defineComponent, ref } from 'vue';
import { FullscreenOutlined, CloseOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    const isBoxShow = ref(false);
    return () => (
      <>
        <div class='windowiframe-box'>
          <div class='windowiframe'>
            <div class='windowiframe-header'>
              项目后台
              <div>
                <FullscreenOutlined
                  class={'windowiframe-header-btn'}
                  onClick={() => {
                    isBoxShow.value = true;
                  }}
                ></FullscreenOutlined>
                <CloseOutlined
                  class={'windowiframe-header-btn'}
                  onClick={() => {
                    emit('change', false);
                  }}
                ></CloseOutlined>
              </div>
            </div>
            <div class='windowiframe-body'>
              <iframe
                class={'small'}
                src='http://ys.hztujing.com:9999/GIMSystemU/'
                frameborder='0'
              ></iframe>
            </div>
          </div>
        </div>
        {isBoxShow.value && (
          <div class='windowbox'>
            <div class='windowbox-header'>
              项目后台
              <CloseOutlined
                class={'windowbox-header-btn'}
                onClick={() => {
                  isBoxShow.value = false;
                  emit('change', false);
                }}
              ></CloseOutlined>
            </div>
            <div class='windowbox-body'>
              <iframe
                src='http://ys.hztujing.com:9999/GIMSystemU/'
                frameborder='0'
              ></iframe>
            </div>
          </div>
        )}
      </>
    );
  }
});
