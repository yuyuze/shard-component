import { onUnmounted, Ref, ref } from 'vue';
import type { PropTypes } from './type';

export function useMove(
  config: PropTypes = {
    animate: true,
    animateLen: 3,
    animateTime: 4
  }
) {
  let autoTimer;
  let list: Ref<any[]>;
  // 清除第一个列表
  function removeItem() {
    const firstItem = list.value.shift();
    return firstItem;
  }
  // 追加数据
  function addItem<T>(firstItem: T) {
    list.value.push(firstItem);
  }
  // 清除后追加
  function raList() {
    const firstItem = removeItem();
    const timer = setTimeout(() => {
      addItem(firstItem);
      clearTimeout(timer);
    }, 1000);
  }
  // 停止循环播放
  function stopPlay() {
    console.log(autoTimer);
    clearInterval(autoTimer);
  }
  // 自动播放
  function autoPlay() {
    if (!config.animate) {
      return;
    }
    // 确保 list 且个数大于 min
    if (!(list && list.value)) {
      return;
    }
    if (list.value.length < config.animateLen) {
      return;
    }
    stopPlay();
    autoTimer = setInterval(() => {
      raList();
    }, 1000 * config.animateTime);
  }

  function setList(targetlist: Ref<any[]> = ref([])) {
    if (targetlist && targetlist.value.length < config.animateLen) {
      return;
    }
    list = targetlist;
  }

  onUnmounted(() => {
    stopPlay();
  });

  return {
    stopPlay,
    autoPlay,
    setList
  };
}
