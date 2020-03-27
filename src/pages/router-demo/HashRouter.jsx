/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// 简单实现一下 HashRouter

/**
 * hash路由一个明显的标志是带有#,我们主要是通过监听url中的hash变化来进行路由跳转。
 * hash的优势就是兼容性更好,在老版IE中都有运行,问题在于url中一直存在#不够美观
 */
export default class Routers {
    constructor() {
        // 以键值对的形式储存路由
        this.routes = {};
        // 当前路由的URL
        this.currentUrl = '';
        this.refresh = this.refresh.bind(this);
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }

    /**
     * 1、将路由的hash以及对应的callback函数储存
     * 2、触发路由hash变化后,执行对应的callback函数
     */
    // 将path路径与对应的callback函数储存
    route(path, callback) {
        this.routes[path] = callback || function fn() { };
    }

    // 刷新
    refresh() {
        // 获取当前URL中的hash路径
        this.currentUrl = location.hash.slice(1) || '/';
        this.routes[this.currentUrl]();
    }
}

window.Router = new Routers();
const content = document.querySelector('body');
// change Page anything
function changeBgColor(color) {
    content.style.backgroundColor = color;
}
Router.route('/', () => {
    changeBgColor('yellow');
});
Router.route('/blue', () => {
    changeBgColor('blue');
});
Router.route('/green', () => {
    changeBgColor('green');
});

// https://codepen.io/xiaomuzhu/pen/KorqGx/


/**
 * 主要是通过 监听 hashchange 事件，然后通过 存储 每个路径的对应的 callback 函数
 * 在 触发 hash 路由变化之后，调用相应的回调
 *
 * 通过数组存储 历史的路由，然后通过指针来确定回退、前进的路由是哪个？
 * 进而实现路由的前进和后退
 */
