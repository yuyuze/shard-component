import { ref } from 'vue';
import { request } from '../http';

export function useRequest<T>(url, data: T, attr = 'data') {
  const isLoad = ref(false);
}
