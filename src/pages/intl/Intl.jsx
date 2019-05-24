import React, { Component } from 'react';
import styles from './style.less';

export const PAGE_ROUTE = '/intl';
export default class Home extends Component {
  render() {
    return (
      <div className={styles.indexWrap}>
        {
          console.log('==>', styles)
        }
      </div>
    );
  }
}
