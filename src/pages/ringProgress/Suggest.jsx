import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const Suggest = (props) => {
    const inputRef = useRef();
    const [state, setState] = useState(() => ({
        suggestResult: [],
        displayResult: false,
        value: '',
    }));

    const mockData = ['Hello World'];

    const handleInput = (e) => {
        console.log(inputRef.current.value, 'www');
        // const { value } = e.target;
        // console.log('value: ', value);
        const trueData = [].filter((item) => item === 'value');
        setState({
            ...state,
            mockData: trueData,
            displayResult: true,
        });
    };


    const handleInput2 = (e) => {
        e.persist();
        console.log('e: ', e.target);
        // const { value } = e.target;
        // console.log('value: ', value);
        const trueData = [].filter((item) => item === 'value');
        setState({
            ...state,
            mockData: trueData,
            displayResult: true,
            value: e.target.value,
        });
    };


    // 防抖
    const debounce = (fn, wait = 50) => {
        let timer = null;
        return function name(...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, wait);
        };
    };

    const onChange = (e) => {
        const val = e.target.value;
        setState({
            value: e.target.value,
        });
    };

    return (
        <>
            <div><input placeholder="请输入想要搜索的内容" ref={inputRef} onKeyUp={debounce(handleInput, 2000)}></input></div>
            <div><input placeholder="请输入想要搜索的内容" value={state.value} onChange={onChange}></input></div>
            {
                state.displayResult
                    ? <div>{state.mockData}</div> : null
            }
        </>
    );
};

Suggest.propTypes = {
    content: PropTypes.string,
    displayResult: PropTypes.bool,
};

export default Suggest;
