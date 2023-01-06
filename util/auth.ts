// 获取权限
export function getToken() {
  return sessionStorage.getItem('token');
}

// 设置权限
export function setToken(token) {
  sessionStorage.setItem('token', token);
}

// 去除权限
export function removeToken() {
  sessionStorage.setItem('token', '');
  sessionStorage.removeItem('token');
  // 去除token 刷新浏览器
  window.location.reload();
}
