
    export default [
      
      {
        path: 'ComList',
        meta: {"category":"Template","type":"低代码","title":"ComList","subtitle":"列表","cover":"https://gw.alipayobjects.com/zos/alicdn/5rWLU27so/Grid.svg"},
        component: () => import('../../../template/ComList/demo/index.vue'),
      },
      {
        path: 'TemKpi',
        meta: {"category":"Template","type":"模板","title":"TemKpi","subtitle":"指标","cover":"https://gw.alipayobjects.com/zos/alicdn/5rWLU27so/Grid.svg"},
        component: () => import('../../../template/TemKpi/demo/index.vue'),
      },
      {
        path: 'TemList',
        meta: {"category":"Template","type":"模板","title":"TemList","subtitle":"列表","cover":"https://gw.alipayobjects.com/zos/alicdn/5rWLU27so/Grid.svg"},
        component: () => import('../../../template/TemList/demo/index.vue'),
      },
      {
        path: 'TemTitle',
        meta: {"category":"Template","type":"模板","title":"TemTitle","subtitle":"标题","cover":"https://gw.alipayobjects.com/zos/alicdn/5rWLU27so/Grid.svg"},
        component: () => import('../../../template/TemTitle/demo/index.vue'),
      },
      {
        path: 'TemMod',
        meta: {"category":"Template","type":"模板","title":"TemMod","subtitle":"模块","cover":"https://gw.alipayobjects.com/zos/alicdn/5rWLU27so/Grid.svg"},
        component: () => import('../../../template/TemMod/demo/index.vue'),
      }
    ];