import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PageFrame from '../layouts/frame/index';

const history = createBrowserHistory();

export default class extends Component {
  render() {
    // 将 PageFrame 与 路由页面 作为兄弟节点，避免PageFrame重新渲染，导致页面也重新渲染的问题；
    return (
      <Router history={history}>
        <Route
          path="/"
          render={(props) => {
            if (!props) {
              return null;
            }
            return <PageFrame {...props} />
          }}
        />

      </Router>
    )
  }
}
