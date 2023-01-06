import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue';

export const useLifecycle = () => {
  const onBeforeMountList: any[] = [];
  const onMountedList: any[] = [];
  const onBeforeUpdateList: any[] = [];
  const onUpdatedList: any[] = [];
  const onBeforeUnmountList: any[] = [];
  const onUnmountedList: any[] = [];

  // dom 加载前
  onBeforeMount(() => {
    onMountedList.forEach((e) => e());
  });
  // dom 加载后
  onMounted(() => {
    onMountedList.forEach((e) => e());
  });
  // 数据更新前
  onBeforeUpdate(() => {
    onBeforeUpdateList.forEach((e) => e());
  });
  // 数据更新后
  onUpdated(() => {
    onUpdatedList.forEach((e) => e());
  });
  // 组件销毁前
  onBeforeUnmount(() => {
    onBeforeUnmountList.forEach((e) => e());
  });
  // 组件销毁后
  onUnmounted(() => {
    onUnmountedList.forEach((e) => e());
  });

  return {
    onBeforeMountList,
    onMountedList,
    onBeforeUpdateList,
    onUpdatedList,
    onBeforeUnmountList,
    onUnmountedList
  };
};
