import React, { Component } from 'react';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/home'
export default class Home extends Component {
  render() {
    return (
      <PageContent>
        hi,this is my home
      </PageContent>
    )
  }
}
