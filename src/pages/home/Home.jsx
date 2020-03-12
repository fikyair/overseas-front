/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PageContent from '../../layouts/page-content';
import AsyncSelect from '../../commons/AsyncSelect'

export const PAGE_ROUTE = '/home'
export default class Home extends Component {
    state = {
        value: 11,
    };

    handleChange = (value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        return (
            <PageContent>
                <AsyncSelect
                    style={{ width: 300 }}
                    placeholder="请选择一项"
                    inputAsValue
                    value={value}
                    onChange={this.handleChange}
                    loadDataByUserInput={(value) => {
                        console.log(value);
                        return Promise.resolve([
                            { value: '我是11', label: '我是11' },
                            { value: '我是22', label: '我是22' },
                            { value: '我是33', label: '我是33' },
                        ])
                    }}
                    loadDataByValue={(value) => {
                        console.log(value);
                        return Promise.resolve([
                            { value: '我是11', label: '我是11' },
                        ])
                    }}
                />
            </PageContent>
        )
    }
}
