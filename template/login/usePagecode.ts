export const usePagecode = (code, env: boolean) => {
  const key = env ? code : window.location.pathname.split('/').filter((e) => e)[0];
  const LoginConfig = {
    code: key === 'demo' ? 'hzdl' : key,
    env: env ? 'dev' : 'pro'
  };
  return LoginConfig;
};
