/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
class Routers {
    constructor() {
        this.routes = {};
        this._bindPopState();
    }

    init(path) {
        history.replaceState({ path }, null, path);
        this.routes[path] && this.routes[path]();
    }

    route(path, callback) {
        this.routes[path] = callback || function () {};
    }

    go(path) {
        history.pushState({ path }, null, path);
        this.routes[path] && this.routes[path]();
    }

    _bindPopState() {
        window.addEventListener('popstate', (e) => {
            const path = e.state && e.state.path;
            this.routes[path] && this.routes[path]();
        });
    }
}

window.Router = new Routers();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');
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

ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        Router.go(e.target.getAttribute('href'));
    }
});

// https://juejin.im/post/5ac61da66fb9a028c71eae1b#heading-1

/**
 * - 【history.replaceState】方法的参数与pushState方法一模一样，
 * 区别是它修改浏览历史中当前纪录,而非添加记录,同样不触发跳转。
 *
 * - 【history.pushState】用于在浏览历史中添加历史记录,但是并不触发跳转,此方法接受三个参数
 * state:一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
 * title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
 * url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
 *
 * - 【popstate】事件,每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。
 * 需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，
 * 只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用back、forward、go方法时才会触发。
 * 另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发
 *
 * 主要是通过监听 popstate 事件，就可以实现前进和倒退，
 * 使用 history.pushState 或者 是 history.replaceState 进行路由的跳转
 */
