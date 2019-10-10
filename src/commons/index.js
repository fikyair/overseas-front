/**
 * 获取当前登录用户
 * @returns {null}
 */
export function getCurrentLoginUser() {
    // 这里由于App.jsx 中要对storage进行初始化，要用到 currentLoginUser.id 作为 keyPrefix
    // 所以不能使用 封装的storage相关方法
    const currentLoginUser = window.sessionStorage.getItem('currentLoginUser');
    console.log('currentLoginUser: ', currentLoginUser);
    return currentLoginUser ? JSON.parse(currentLoginUser) : null;
}

/**
 * 是否登录
 * @returns {boolean}
 */
export function isAuthenticated() {
    return !!getCurrentLoginUser();
}

/**
 * 跳转到登录页面
 * @returns {null}
 */
export function toLogin() {
    const loginPath = '/login';
    const { pathname } = window.location;
    console.log('pathname: ', pathname);
    const isLogin = pathname.indexOf(loginPath) !== -1;

    if (isLogin) return null;

    window.sessionStorage.clear();
    window.sessionStorage.setItem('last-href', window.location.href);
    window.location.href = loginPath;

    return null;
}
