import React, { Component } from 'react';
import Logo from '../logo';
import styles from './style.less';

export default class Sider extends Component {
    render() {
        return (
            <div className={styles.slide}>
                <div className={styles.logo}>
                    <Logo />
                </div>
            </div>
        );
    }
}
