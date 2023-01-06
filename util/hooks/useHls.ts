import { ref } from 'vue';

export const useHls = () => {
  const videoEl = ref(null);
  let hlsCache: any = null;
  function startHls(src: any) {
    if (hlsCache) {
      hlsCache.destroy();
      hlsCache = null;
    }
    const hls: any = new Hls();
    videoEl.value.src = src;
    hls.loadSource(src);
    hls.attachMedia(videoEl.value);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoEl.value.play();
    });
    hlsCache = hls;
  }

  function endHls() {
    if (hlsCache) {
      hlsCache.destroy();
      hlsCache = null;
    }
  }

  return {
    videoEl,
    startHls,
    endHls
  };
};
