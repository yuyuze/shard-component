import { useWebSocket } from '@vueuse/core';

export interface WsMessage {
  action: string;
  data: any;
  module?: any;
}

class Ws {
  _cache: any;

  _close: any;

  _init: any;

  constructor() {
    this._cache = {};
    this._init = (socketUrl) => {
      const filter = ['hbConnect', 'connect_success'];
      const { close } = useWebSocket(socketUrl, {
        onMessage: (ws, event) => {
          const { action, module, data } = JSON.parse(event.data) as WsMessage;
          if (filter.includes(action)) {
            return;
          }
          const list = this._cache[module] || [];
          list.forEach((e) => {
            return e({
              action,
              data
            });
          });
        },
        // 重连次数
        autoReconnect: {
          retries: 3,
          delay: 1000,
          onFailed() {
            console.log('socket error==>', socketUrl);
          }
        },
        // 心跳检测
        heartbeat: {
          message: JSON.stringify({
            action: 'hbConnect'
          }),
          interval: 1000 * 5
        }
      });
      this._close = close;
    };
  }

  init(url) {
    this._init(url);
  }

  on(type: string, fn: (data: WsMessage) => void) {
    const list = this._cache[type] || [];
    list.push(fn);
    this._cache[type] = list;
  }

  off(type: string, fn) {
    const list = [...this._cache[type]] || [];
    if (list.length === 0) {
      return;
    }
    const index = list.findIndex((e) => e === fn);
    if (index === -1) {
      return;
    }
    list.splice(index, 1);
    this._cache[type] = list;
  }

  offAll(type: string) {
    const list = [...this._cache[type]] || [];
    if (list.length === 0) {
      return;
    }
    this._cache[type] = [];
    delete this._cache[type];
  }

  close() {
    this._close();
  }
}

export default new Ws();
