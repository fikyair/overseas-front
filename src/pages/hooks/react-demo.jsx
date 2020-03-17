/* eslint-disable max-len */
import React, { useReducer, useState } from 'react';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/react-demo';

function reducer(state, action) {
    switch (action.type) {
    case 'add-todo':
        return {
            todos: [...state.todos, { text: action.text, completed: false }],
            todoCount: state.todoCount + 1,
        };
    case 'toggle-todo':
        return {
            todos: state.todos.map((t, idx) => (idx === action.idx ? { ...t, completed: !t.completed } : t)),
            todoCount: state.todoCount,
        };
    default:
        return state;
    }
}

const App = () => {
    const [{ todos, todoCount }, dispatch] = useReducer(reducer, { todos: [], todoCount: 0 });
    const [text, setText] = useState('');
    return (
        <PageContent>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch({ text, type: 'add-todo' });
                setText('');
            }}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            </form>
            <div> number of todos: {todoCount}</div>
            {todos.map((t, idx) => (
                <div
                    key={t.text}
                    onClick={() => dispatch({ type: 'toggle-todo', idx })}
                    style={{ textDecoration: t.completed ? 'line-through' : '' }}
                >
                    {t.text}
                </div>
            ))}
            {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
        </PageContent >
    );
};


export default App;
