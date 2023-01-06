import { defineComponent, ref, computed, reactive } from 'vue';
import { Form, Input, Button } from 'ant-design-vue';
import {
  UserOutlined,
  LockOutlined,
  BarcodeOutlined
} from '@ant-design/icons-vue';
import { merge } from 'lodash';
import { withInstall, tuple } from '../../util/type';
import { useConfigInject, useRouters } from '../../util/hooks';
import vuetypes from '../../util/vue-types';
import { usePagecode } from './usePagecode';
import { useLogin } from './useLogin';
import { decrypt } from './jsencrypt';
import { setToken } from '../../util/auth';
import { request } from '../../util/http';
import { KeyCode } from '../../util/tools';

const LoginType = tuple('szxc', 'yq', 'ksh');

export interface LoginConfig {
  backgroundUrl: string;
  loginType: typeof LoginType[number];
  title: string;
}

const Login = defineComponent({
  name: 'VcLogin',
  props: {
    code: vuetypes.string,
    autologin: vuetypes.bool.def(true),
    targetPath: vuetypes.string.def('/'),
    success: vuetypes.func.def(() => {}),
    fail: vuetypes.func.def(() => {}),
    updatePageTitle: vuetypes.bool.def(true)
  },
  setup(props, ctx) {
    const { prefixCls, api, isDev } = useConfigInject('login', props);

    const {
      loginForm,
      ruleForm,
      ruleFormEl,
      SwitchVerificationCode,
      Validate,
      userLogin
    } = useLogin(api);

    const config = reactive<LoginConfig>({
      backgroundUrl: '',
      loginType: 'szxc',
      title: ''
    });

    const { router } = useRouters();
    const data = usePagecode(props.code, isDev);
    request({
      method: 'get',
      url: '/openApiDev/bus/dimBasDistrictPageConfig/getInfo',
      data,
      api
    }).then((res) => {
      if (res.code === 200) {
        const {
          backgroundUrl,
          title,
          loginType,
          username,
          password,
          pageTitle
        } = res.data;
        config.backgroundUrl = api + backgroundUrl;
        config.title = title;
        config.loginType = loginType;
        if (isDev) {
          loginForm.username = username;
          loginForm.password = String(decrypt(password));
        }
        if (props.updatePageTitle) {
          document.title = pageTitle;
        }
      }
    });

    const iconStyl = computed(() => {
      const obj = {
        szxc: {
          color: 'rgba(192, 196, 204, 1)'
        },
        yq: {
          color: 'rgba(47, 226, 254, 1)'
        },
        ksh: {
          color: 'rgba(0, 241, 255, 1)'
        }
      };
      return merge({}, obj[config.loginType], {
        fontSize: '22px'
      });
    });

    const isLoad = ref(false);
    const handlerLogin = async () => {
      isLoad.value = true;
      // 校验并登录
      const isTrue = await Validate();
      if (isTrue) {
        const res = await userLogin();
        if (res) {
          props.success && props.success({ ...res, code: data.code });
          if (props.autologin) {
            setToken(res.token);
            // 在开发环境中采用传入的路径，生产环境中采用 toPath
            router.replace({
              path: (isDev ? props.targetPath : res.toPath) || props.targetPath
            });
          }
          return;
        }

        props.fail && props.fail();
        SwitchVerificationCode();
      }
      isLoad.value = false;
    };

    SwitchVerificationCode();

    return () => (
      <div class={prefixCls.value} data-set='login'>
        <div class={`${prefixCls.value}-box`} data-login={config.loginType}>
          <div class={`${prefixCls.value}-box-title`}>{config.title}</div>
          <div class={`${prefixCls.value}-box-form`}>
            <Form
              model={loginForm}
              ref={ruleFormEl}
              rules={ruleForm.value as any}
            >
              <Form.Item name='username'>
                <Input
                  {...{
                    autocomplete: 'off'
                  }}
                  // autocomplete='off'
                  value={loginForm.username}
                  onChange={(e) => (loginForm.username = e.target.value)}
                  disabled={isLoad.value}
                  prefix={<UserOutlined style={iconStyl.value}></UserOutlined>}
                  placeholder='请输入用户名'
                ></Input>
              </Form.Item>
              <Form.Item name='password'>
                <Input
                  type={'password'}
                  value={loginForm.password}
                  onChange={(e) => (loginForm.password = e.target.value)}
                  disabled={isLoad.value}
                  prefix={<LockOutlined style={iconStyl.value}></LockOutlined>}
                  placeholder='请输入密码'
                ></Input>
              </Form.Item>
              <Form.Item name='code'>
                <div class={`${prefixCls.value}-box-form__verification`}>
                  <Input
                    // autocomplete='off'
                    {...{
                      autocomplete: 'off'
                    }}
                    value={loginForm.code}
                    onKeydown={(e) => {
                      KeyCode.isEnter(e.keyCode) && handlerLogin();
                    }}
                    onChange={(e) => (loginForm.code = e.target.value)}
                    disabled={isLoad.value}
                    prefix={
                      <BarcodeOutlined style={iconStyl.value}></BarcodeOutlined>
                    }
                    placeholder='请输入验证码'
                  ></Input>
                  <img
                    src={loginForm.img}
                    alt=''
                    onClick={SwitchVerificationCode}
                  />
                </div>
              </Form.Item>
              <Button
                loading={isLoad.value}
                size='large'
                type='primary'
                block
                onClick={handlerLogin}
              >
                登录
              </Button>
            </Form>
          </div>
        </div>
        <div class={`${prefixCls.value}-bg`}>
          {config.backgroundUrl && <img src={config.backgroundUrl} alt='' />}
        </div>
      </div>
    );
  }
});

export default withInstall(Login);
