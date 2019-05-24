import React, { Component } from 'react';
import styles from './style.less';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.header} style={{ color: 'red' }}>
                header
      </div>
    )
  }
}
