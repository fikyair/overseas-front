import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../breadcrumb';
import styles from './style.less';

export default class PageHeader extends Component {
    static propTypes = {
      title: PropTypes.string,
      breadcrumbs: PropTypes.array,
    };

    static defaultProps = {
      title: '',
      breadcrumbs: [],
    };

    render() {
      const { title, breadcrumbs } = this.props;

      return (
        <div className={styles.pageHeader}>
          <h1>{title}</h1>

          <div className={styles.breadcrumb}>
            <Breadcrumb
              dataSource={breadcrumbs}
            />
          </div>
        </div>
      )
    }
}
