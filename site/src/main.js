import '../../components/style';
import '../../template/style';
import 'nprogress/nprogress.css';
import { createApp, Transition, TransitionGroup } from 'vue';
import NProgress from 'nprogress';
import Business from 'business';
import Template from 'template';
import Antd from 'ant-design-vue';
import i18n from './i18n';
import router from './router';
import demoBox from './components/DemoBox.vue';
import demoContainer from './components/demoContainer.vue';
import demoSort from './components/demoSort.jsx';
import clipboard from './directives/clipboard';
import './theme/static/index.less';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';

const app = createApp(App);

app.use(Antd);
app.use(Business);
app.use(Template);
app.use(clipboard);
app.component('Transition', Transition);
app.component('TransitionGroup', TransitionGroup);
app.component('DemoBox', demoBox);
app.component('DemoContainer', demoContainer);
app.component('DemoSort', demoSort);
app.component('VNodes', (_, { attrs: { value } }) => {
  return value;
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    NProgress.done();
    document.documentElement.scrollTop = 0;
  }
});

app.use(router);
app.use(i18n);

app.config.globalProperties.$i18n = i18n;

app.mount('#app');
