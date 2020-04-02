/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Select } from 'antd';
import PageContent from '../../layouts/page-content';
// import FormItemLayout from '../../components/form-item-layout/demo/Basic'
// import Float from '../../components/form-item-layout/demo/Float'
// import Forms from '../../components/form-item-layout/demo/Form'
import InputAsValue from '../../components/async-select/demo/InputAsValue'
import FormLay from '../../components/form-item-layout/demo/Basic';

const { Option } = Select;


export const PAGE_ROUTE = '/home'
export default class Home extends Component {
    onChange = (value) => {
        console.log(`selected ${value}`);
    }

    onBlur = () => {
        console.log('blur');
    }

    onFocus = () => {
        console.log('focus');
    }

    onSearch = (val) => {
        console.log('search:', val);
    }

    render() {
        return (
            <PageContent>
                <InputAsValue />
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={
                        (input, option) => option.props.children.toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>

                <FormLay />
            </PageContent>
        )
    }
}
