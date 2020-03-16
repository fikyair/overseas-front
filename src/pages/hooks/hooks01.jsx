
// useState-useMemo-useEffect-useCallBack-React.Memo
import React, {
    useState, useMemo, useEffect, useCallback,
} from 'react';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/hooks01';
const Child = React.memo((props) => {
    console.log('props: ', props);
    useEffect(() => {
        document.getElementsByName('tag')[0].innerHTML = `生命周期：${props.count}`;
        // return () => {
        //     可以取消订阅
        // }
    });
    const date = new Date();
    return (
        <div>
            当前时间: { date.getHours()} : { date.getMinutes()} : { date.getSeconds()}
            <div>
                <input type="text" onChange={props.onChange} />
                {/*
                    当子组件输入发生变化时，父组件更新 text，但父组件的 handleOnChange 会使得 text 改变
                    这时 props.onChange 就会变为一个新的函数，所以子组件会重新渲染。
                    这个时候需要用 useCallback 来解决
                */}
            </div>
        </div >
    );
}); // 返回 true 不会更新

const Parent = () => {
    const [count, setCount] = useState(0);
    const [clickTimeCount, setClickTimeCount] = useState(0);
    const [text, setText] = useState('');
    const timeOption = useMemo(() => ({ clickTimeCount }), [clickTimeCount]);
    /**
     * useMemo：对单一的 props
     * 用来缓存变量，只有在 clickTimeCount 发生变化的时候才会执行,
     * 同时，不会因为 timeOption 改变而迫使子组件重新渲染
     */
    const handleOnChange = useCallback( // 回调函数被缓存下来，缓存了对于单一的函数
        (e) => {
            setText(e.target.value);
        },
        [],
    );

    return (
        <div>
            <div name="tag"></div>
            <div >
                count:{count}
            </div>
            <div>Text：{text}</div>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setClickTimeCount(clickTimeCount + 1)}> Get Current Time</button>
            <Child name={timeOption} count={clickTimeCount} onChange={handleOnChange} />
        </div>
    );
};


function App() {
    return (
        <PageContent>
            <Parent />
        </PageContent>
    );
}

export default App;
