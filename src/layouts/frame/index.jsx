import React from 'react';
import Header from '../header';
import Slider from '../sider';
import PageHead from '../page-header';
import styles from './style.less';

class Frame extends React.Component {
    render() {
        return (
            <div className="">
                <Header style={{ background: '#fff', padding: 0 }} />
                <Slider />
                <div className={styles.contentTopSpace} />
                <div className={styles.pageRoot}>
                    <div className={styles.pageLeftSpace} />
                    <div className={styles.content}>
                        <PageHead />
                    </div>
                </div>
            </div>
        );
    }
}

export default Frame;
