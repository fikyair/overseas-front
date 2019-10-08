import React from 'react';
// import logo from './logo.svg';
import antd from './antd.png';
import styles from './style.less';

export default class Logo extends React.Component {
    static defaultProps = {
      title: 'OpenSource',
    }

    render() {
      return (
        <div className={styles.logo}>
          <img src={antd} alt="logo" />
          <h1>{ this.props.title }</h1>
        </div>
      )
    }
}
