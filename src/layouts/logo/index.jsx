import React from 'react';
import logo from './logo.svg';
import './logo.less';

export default class Logo extends React.Component {
    static defaultProps = {
      title: 'OpenSource',
    }

    render() {
      // const { title } = this.props;
      return (
        <div>
          <img src={logo} alt="logo" />
          <h1>OpenSource</h1>
        </div>
      )
    }
}
