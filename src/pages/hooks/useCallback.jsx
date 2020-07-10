import React, {
    useState, useCallback, useMemo, memo,
} from 'react';
import PageContent from '../../layouts/page-content';

let fn = null;
const Parent = () => {
    const [state, setState] = useState(() => ({
        count: 0,
        text: '',
    }));
    // parentChange 被 useCallBack 缓存了一个函数下来
    // useMemo 缓存的是一个值，对单独的一个 props
    // React.memo 对组件的前后 props 比较
    const parentChange = useCallback((e) => {
        setState({
            ...state,
            text: e.target.value,
        });
    }, []);

    const btnClick = () => {
        setState({
            count: state.count + 1,
        });
    };
    return (
        <PageContent>
            <div>{state.count}个</div>
            <button onClick={btnClick}>父button</button>
            <Child onChange={parentChange}/>
        </PageContent>
    );
};

const Child = (props) => {
    console.log('props: ', props);
    console.log('object', Object.is(fn, props.onChange));
    fn = props.onChange;
    // 父组件的 刷新导致 父组件的 parentChange 方法更新，传到子组件是一个新的值，所以子组件刷新
    console.log('child');

    return (
        <div>
            子组件 text:{props.text}
            <div>子组件 count:{props.count}</div>
            <input type="text" onChange={props.onChange} />
        </div>
    );
};


export default Parent;

// React.memo ，和 pureComponent 很相似，控制我们何时渲染重新渲染组件
// 组件仅在他的 props 发生改变的时候重新渲染，可以指定一个第二个回调函数，
// 返回 true ,表示前后 props 一致，故不会渲染组件
