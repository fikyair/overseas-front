import React, {
    Suspense, lazy,
} from 'react';
// import Router from './router/Router';
import './App.less';
import MyErrorBoundary from './ErrorBoundaries';

const imgUrl = require('./logo192.png');

const SubComponent = lazy(() => new Promise((resolve, reject) => {
    import('./SubComponent')
        .then((module) => {
            resolve({
                default: module.OtherComponent,
            });
        }).catch((err) => {
            reject(err);
        });
}));
// ./AnotherSubComponent does not match the underlying filesystem  import/no-unresolved
// 应该是由于在webpack里面配置了别名和路径,而eslint没有适配这个规则导致的  eslint-import-resolver-webpack, 并配置

// 有时因为网络问题可能会出现“Error: Loading chunk failed”，可以尝试加载失败后自动重试
// 如果重试依然加载失败，可以检查文件是否丢失、被拦截、文件体积超过服务器设定上限。
// 如果使用了 webpack，并且依赖的代码中包含 __webpack_public_path__字段，刷新页面时也会产生该错误。
const retry = (fn, retriesLeft = 5, interval = 1000) => new Promise((resolve, reject) => {
    fn()
        .then(resolve)
        .catch((error) => {
            setTimeout(() => {
                if (retriesLeft === 1) {
                    reject(error);
                } else {
                    retry(fn, retriesLeft - 1, interval).then(resolve, reject);
                }
            }, interval);
        });
});

const reTryLazy = (fn) => lazy(() => retry(fn));


const ReTrySubComponent = reTryLazy(() => import(/* webpackChunkName: "retry--subComponent" */ './AnotherSubComponent'));
const AnotherSubComponent = lazy(() => import(/* webpackChunkName: "another--subComponent" */ './AnotherSubComponent'));

class CodeSplitting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    handleClick = () => {
        console.log('nihao')();
        import('./utils/number-precision').then((math) => {
            this.setState({
                text: math.divide(12, 4),
            });
        }).catch((err) => console.log(`${err}，引用是失败`));
    }

    render() {
        return (
            <div>
                {this.state.text}
                <button type="button" onClick={this.handleClick}>点击</button>
            </div>
        );
    }
}
function App() {
    return (
        < >
            <MyErrorBoundary>
                <Suspense fallback={<div> ...Loading </div>}>
                    <SubComponent />
                    <hr />
                    <AnotherSubComponent />
                    <hr />
                    <ReTrySubComponent />
                </Suspense>
            </MyErrorBoundary>
            <img src={imgUrl} alt="tu"/>
            <hr />
            <CodeSplitting />
        </>
    );
}

export default App;
