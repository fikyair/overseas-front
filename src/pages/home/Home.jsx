import React, { Component } from 'react';
import * as precision from '../../utils/number-precision';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/home';
export default class Home extends Component {
    render() {
        return (
            <PageContent>
                hi,this is my home
                {
                    console.log('divide', precision.plus(0.1, 0.2))
                }
            </PageContent>
        );
    }
}
