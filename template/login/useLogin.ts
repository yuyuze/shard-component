import { reactive, ref } from 'vue';
import { request } from '../../util/http';
import { encrypt } from './jsencrypt';
import { AntToast } from '../../util/tools';

export const useLogin = (api: string) => {
  // 用户信息
  const loginForm = reactive({
    username: '',
    password: '',
    uuid: '',
    code: '',
    img: '',
  });
  // 用户信息校验
  const ruleForm = ref({
    username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'change' }],
  });
  // 校验 html
  const ruleFormEl = ref(null);

  // 切换验证码
  const SwitchVerificationCode = () => {
    request({
      method: 'get',
      url: '/captchaImage',
      api
    }).then((res) => {
      if (res.code === 200) {
        const img = 'data:image/jpg;base64,' + res.img;
        loginForm.uuid = res.uuid;
        loginForm.img = img;
      }
    });
  };

  // 验证函数
  const Validate = async (): Promise<Boolean> => {
    const form = ruleFormEl.value;
    // 判断是否将 ruleFormEl 绑定到 html 上
    if (!form) {
      return false;
    }
    // 调用其自带的校验方法
    try {
      await ruleFormEl.value.validate();
      return true;
    } catch (err) {
      return false;
    }
  };

  // 用户登录
  const userLogin = async () => {
    const { username, password, uuid, code } = loginForm;
    const res = await request({
      method: 'post',
      url: '/login',
      data: {
        username,
        password: encrypt(password),
        uuid,
        code
      },
      api,
    });
    if (res.code === 200) {
      AntToast({
        content: '登录成功',
        type: 'success'
      });
      return res;
    }
    return false;
  };

  return {
    loginForm,
    ruleForm,
    ruleFormEl,
    SwitchVerificationCode,
    Validate,
    userLogin
  };
};
