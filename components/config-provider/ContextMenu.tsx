import { defineComponent, onBeforeUnmount, ref, computed, reactive } from 'vue';
import type { CSSProperties } from 'vue';
import { toSize, AntToast } from '../../util/tools';
import { toggleFull } from '../../util/befull';
import { removeToken } from '../../util/auth';
import WindowIframe from './WindowIframe';

export default defineComponent({
  setup(props, ctx) {
    const position = reactive({
      x: 0,
      y: 0
    });
    const isShowWindow = ref(false);
    const isMask = ref(false);
    document.onmousedown = (down) => {
      if (down.button === 2) {
        const startTime = Date.now();
        const Distance = 1;
        document.onmouseup = (up) => {
          const endTime = Date.now();
          const isTime = endTime - startTime > 200; // true 长按 false 点击
          if (
            !isTime &&
            up.clientX === down.clientX &&
            up.clientY === down.clientY
          ) {
            const { clientX, clientY } = up;
            position.x = clientX + Distance;
            position.y = clientY + Distance;
            isMask.value = true;
          }
          document.onmouseup = null;
        };
      }
    };

    document.oncontextmenu = (e) => {
      return false;
    };

    const styl = computed<CSSProperties>(() => {
      return {
        left: toSize(position.x),
        top: toSize(position.y)
      };
    });

    // 隐藏右键菜单
    const hideContextMenu = () => {
      isMask.value = false;
    };
    onBeforeUnmount(() => {
      document.oncontextmenu = null;
    });

    const pluginList = [
      {
        name: '全屏',
        props: {
          onClick: () => {
            toggleFull();
            hideContextMenu();
          }
        }
      },
      {
        name: '刷新',
        props: {
          onClick: () => {
            hideContextMenu();
            const { origin, pathname, hash } = window.location;
            window.location.href = `${origin}${pathname}?key=${Date.now()}${hash}`;
          }
        }
      },
      {
        name: '退出',
        props: {
          onClick: () => {
            hideContextMenu();
            removeToken();
          }
        }
      }
      // {
      //   name: '项目后台',
      //   props: {
      //     onClick: () => {
      //       isShowWindow.value = true;
      //       hideContextMenu();
      //     }
      //   }
      // }
    ];
    return () => (
      <>
        {isMask.value && (
          <>
            <div
              class='contextmenu-mask'
              onClick={() => hideContextMenu()}
            ></div>
            <div class='contextmenu' style={styl.value}>
              {pluginList.map((e) => (
                <div class='contextmenu-item' {...e.props}>
                  {e.name}
                </div>
              ))}
            </div>
          </>
        )}
        {isShowWindow.value && (
          <WindowIframe
            onChange={() => {
              isShowWindow.value = false;
            }}
          ></WindowIframe>
        )}
      </>
    );
  }
});
