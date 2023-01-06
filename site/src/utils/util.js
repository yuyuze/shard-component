export function isZhCN(name) {
  return /-cn\/?$/.test(name);
}

export function isLocalStorageNameSupported() {
  const testKey = "test";
  const storage = window.localStorage;
  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function getLocalizedPathname(path, zhCN, query = {}) {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  let fullPath;
  if (!zhCN) {
    // to enUS
    fullPath = /\/?index-cn/.test(pathname) ? "/" : pathname.replace("-cn", "");
  } else if (pathname === "/") {
    fullPath = "/index-cn";
  } else if (pathname.endsWith("/")) {
    fullPath = pathname.replace(/\/$/, "/");
  } else {
    fullPath = `${pathname}`;
  }
  return { path: fullPath, query };
}

export function changLang() {
  const {
    location: { pathname },
  } = window;
  const currentProtocol = `${window.location.protocol}//`;
  const currentHref = window.location.href.substr(currentProtocol.length);
  if (isLocalStorageNameSupported()) {
    localStorage.setItem("locale", isZhCN(pathname) ? "en-US" : "zh-CN");
  }

  window.location.href =
    currentProtocol +
    currentHref.replace(
      window.location.pathname,
      getLocalizedPathname(pathname, !isZhCN(pathname)).path
    );
}
