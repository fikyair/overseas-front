import React, { Component } from 'react';
import styles from './style.less';

export default class PageContent extends Component {
    render() {
        const {
            footer, loading, children, collapsed, width, ...others
        } = this.props;

        return (
            <div style={{
                minHeight: '84%', left: '256px', position: 'absolute', margin: '0 auto',
            }}
            >
                <div {...others} className={styles.root}>
                    <div className={styles.pageContent}>{children}</div>
                </div>
            </div>
        );
    }
}
