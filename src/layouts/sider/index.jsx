import React, { Component } from 'react';
import Logo from '../logo';
import './style.less';

export default class Sider extends Component {
  render() {
    return (
      <div className="side">
        <div className="logo">
          <Logo />
        </div>
        <div className="test">滑动栏</div>
      </div>
    )
  }
}
