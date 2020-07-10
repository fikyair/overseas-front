```js

const Parent = () => {
    const [state, setState] = useState(() => ({
        count: 0,
        text: '',
    }));
    // parentChange 被 useCallBack 缓存了一个函数下来
    // useMemo 缓存的是一个值，对单独的一个 props
    // React.memo 对组件的前后 props 比较
    const parentChange = (e) => {
        setState({
            ...state,
            text: 'nice',
        });
    };

    const btnClick = () => {
        setState({
            count: state.count + 1,
        });
    };
    return (
        <>
            <div>{state.count}个</div>
            <button onClick={btnClick}>父button</button>
            <Child text={state.text} onChange={parentChange}/>
        </>
    );
};

const Child = React.memo((props) => {
    console.log('child');

    return (
        <div>
            子组件 text:{props.text}
            <div>子组件 count:{props.count}</div>
            <input type="text" onChange={props.onChange} />
        </div>
    );
});

/**
 * 
 * 点击 btnClick，因为没有给 Child 传 count, 所以按道理子组件 Child 
 * 不会被刷新，但是由于每次 parent 的渲染，都会使 parentChange 组件重新创建
 * 而 parentChange 传给了子组件，所以子组件也会重新渲染。
 * 解决办法就是  parentChange 使用 useCallback，缓存这个函数，不会重新创建。
 * **/

```


```js

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
    console.log('object', Object.is(fn, props.onChange));  // 第一次 false， 之后都是 true
    fn = props.onChange;
    // 父组件的 刷新导致 父组件的 parentChange 方法更新，传到子组件是一个新的值，所以子组件刷新
    // console.log('child');

    return (
        <div>
            子组件 text:{props.text}
            <div>子组件 count:{props.count}</div>
            <input type="text" onChange={props.onChange} />
        </div>
    );
};

/**
 * 尽管 parentChange 被缓存了下来，但是传递给子组件后
 * 还是会因为点击 btnClick 子组件会重新渲染。
 * **/
````


/**
 * 性能优化的目的
 * useMemo 可以保存组件的一个渲染结果，根据条件来进行条件（数组）渲染，
 * 主要是用来优化性能，来避免一个复杂的计算，一个复杂的组件进行的重新的渲染
 * /