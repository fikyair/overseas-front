import React from 'react';
import logo from './logo.svg';
// import Error from './error.png';
import styles from './style.less';

export default class Logo extends React.Component {
    static defaultProps = {
      title: 'OpenSource',
    }

    render() {
      return (
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1>OpenSource</h1>
        </div>
      )
    }
}
