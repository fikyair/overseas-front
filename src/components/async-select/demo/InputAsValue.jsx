import React, {Component} from 'react';
import {AsyncSelect} from '../../index';


/**
 * 需要优化，在聚焦 select 框的时候就要去展示 options 选项。
 */
export default class Base extends Component {
    state = {
        value: 11,
    };

    handleChange = (value) => {
        this.setState({value});
    };

    render() {
        const {value} = this.state;
        return (
            <AsyncSelect
                style={{width: 300}}
                placeholder="请选择一项"
                inputAsValue
                value={value}
                onChange={this.handleChange}
                loadDataByUserInput={(value) => {
                    console.log(value);
                    return Promise.resolve([
                        {value: 'ONE', label: '我是11'},
                        {value: 'TWO', label: '我是22'},
                        {value: 'THREE', label: '我是33'},
                    ])
                }}
                loadDataByValue={(value) => {
                    console.log(value);
                    return Promise.resolve([
                        {value: 'ONE', label: '我是11'},
                    ])
                }}
            />
        );
    }
}


export const title = '用户输入也作为一个选项';

export const markdown = `
用户输入也作为一个选项，通常用于，即可用户输入，又可下拉选择的情况，这种情况下，下拉数据中的，value 和 label 通常是同一个只，都是label
`;


/**
 * 通过对数据的封装处理，首次加载不会渲染下拉框中的数据，在必要时进行展现
 */