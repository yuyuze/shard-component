import Axios from 'axios';
import { Modal } from 'ant-design-vue';
import { getToken, removeToken } from './auth';
import { AntToast } from './tools';

export type HttpType = 'get' | 'post';

export type ContentType =
  | 'application/x-www-form-urlencoded'
  | 'application/json; charset=utf-8'
  | 'multipart/form-data';

export interface InterfaceReturns<T> {
  data: T;
  msg: string;
  code: number;
  token: string;
  rows: T;
  total: number;
  [propName: string]: any;
}

export interface Http {
  apiGetToken?: any,
  method: HttpType;
  url: string;
  data?: any;
  ContentType?: ContentType;
  api?: string;
}

export type Api = <T = any>(data: Http) => Promise<InterfaceReturns<T>>;

const axios = Axios.create({
  timeout: 1000 * 30
});

// 请求拦截
axios.interceptors.request.use(
  (response) => {
    const token = getToken();
    const DonNotGetToken = response.headers.NotGetToken;
    if (token && response.url.includes(import.meta.env.VITE_BASE_API) && DonNotGetToken) {
      response.headers.common.Authorization = `Bearer ${token}`;
    }
    let url = response.url;
    if (
      response.method === 'get' &&
      (response.params !== undefined || response.params !== null)
    ) {
      url += '?'; // 拼接参数
      // 获取所有参数，通过循环 拼接所有参数，encodeURIComponent对参数编码，
      Object.keys(response.params).map((key) => {
        if (
          response.params[key] !== undefined &&
          response.params[key] !== null
        ) {
          url += `${key}=${encodeURIComponent(response.params[key])}&`;
          return url;
        }
      });
      url = url.substring(0, url.length - 1); // 删除最后一个&字符
      response.params = {}; // 参数已经存在于 url中
    }
    response.url = url;
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isShow = false;
// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // 非本我域名 过滤返回
    if (!response.config.url.includes(import.meta.env.VITE_BASE_API)) {
      return Promise.resolve(response);
    }
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    if (response.status === 200) {
      const { code, msg, status } = response.data as InterfaceReturns<''>;
      switch (code) {
        case 401:
          if (!isShow) {
            isShow = true;
            Modal.confirm({
              title: () => '提示',
              content: () => '当前用户过期,点击确认重新登陆！',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                removeToken();
                Modal.destroyAll();
                isShow = false;
              },
              onCancel() {
                isShow = false;
              }
            });
          }
          break;
        case 403: {
          AntToast({
            content: '账号无权限,请联系管理员!',
            type: 'error'
          });
          break;
        }
        case 404:
          AntToast({
            content: '网络错误',
            type: 'error'
          });
          break;
        case 500:
          AntToast({
            content: msg,
            type: 'error'
          });
          break;
        default:
      }
      return Promise.resolve(response);
    }
    // 否则的话抛出错误
    return Promise.reject(response);
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status;
      switch (code) {
        case 401:
          AntToast({
            content: '权限不足',
            type: 'error'
          });
          break;
        case 404:
          AntToast({
            content: '网络异常',
            type: 'error'
          });
          break;
        case 500:
          AntToast({
            content: '接口异常',
            type: 'error'
          });
          break;
        default:
      }
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export const request: Api = (arg) => {
  const {
    apiGetToken = true,
    method,
    ContentType = 'application/json; charset=utf-8',
    data = {},
    url,
    api = ''
  } = arg;
  const option = {
    method,
    url: api ? api + url : import.meta.env.VITE_BASE_API + url,
    params: {},
    data: {},
    headers: {
      'Content-Type': ContentType,
      // 以下键值对是给免登录接口使用，目的是为了防止免登录的接口获取token
      // 目前szxc-wl使用中,值传入false即为不传token给接口
      'NotGetToken': apiGetToken
    }
  };
  switch (method) {
    case 'get': {
      option.params = data;
      break;
    }
    case 'post': {
      option.data = data;
      break;
    }
    default: {
      throw Error('不存在该请求类型');
    }
  }
  return new Promise((resolve, reject) => {
    axios(option)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
