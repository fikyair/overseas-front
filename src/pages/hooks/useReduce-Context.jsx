// hooks-useContext-useReducer
import React, {
    useReducer, useContext,
} from 'react';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/hooks02';

const Context = React.createContext(null);

const reducer = (state, action) => {
    switch (action.type) {
    case 'ADD':
        return state + 1;
    case 'SUB':
        return state - 1;
    default:
        return state;
    }
};

const Child = (props) => {
    const [count, dispatch] = useContext(Context);
    return (
        <div>
            <div>
                child: {count}
            </div>
            <button onClick={() => dispatch({ type: 'ADD' })}>+1</button>
            <button onClick={() => dispatch({ type: 'SUB' })}>-1</button>
        </div>
    );
};


const Parent = (props) => {
    const [count] = useContext(Context);

    return (
        <div>
            <div>
                parent: {count}
            </div>
            <Child />
        </div>
    );
};


function App() {
    const [count, dispatch] = useReducer(reducer, 10);
    return (
        <Context.Provider value={[count, dispatch]}>
            <PageContent>
                <Parent />
            </PageContent>
        </Context.Provider>
    );
}

export default App;

/**
 * redux 有一个单一的 store，如何去更新这个 store 呢？就是通过组件内部的 dispatch action，这个 action
 * 会流经 各种各样的 reducer，如果 reducer 里面的 action type 被命中，那他就会根据这个 type 对应的一个
 * 命中情况，返回一个新的 state。
 * 那么一个 reducer 函数时怎么样的呢？一个 reducer 是一个 纯函数，首先由两个参数，一个是 state，一个是 action
 * 还有，总是有一个默认的 返回 state，因为有一个 combine-reducer 概念，就是把一个单个的状态 拆成各种子状态，最后进过
 * combine-reducer 合起来，如果 流经 reducer 未被命中的话，如果没有默认值，就会出现 state 丢失的情况
 */
