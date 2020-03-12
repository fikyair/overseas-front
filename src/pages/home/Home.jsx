/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PageContent from '../../layouts/page-content';
import FormItemLayout from '../../components/form-item-layout/demo/Basic'
import Float from '../../components/form-item-layout/demo/Float'
import Forms from '../../components/form-item-layout/demo/Form'
import Item from '../../components/tool-bar/demo/Basic'

export const PAGE_ROUTE = '/home'
export default class Home extends Component {
    render() {
        return (
            <PageContent>
                <FormItemLayout />
                <Float />
                <Forms />
                <Item />
            </PageContent>
        )
    }
}
