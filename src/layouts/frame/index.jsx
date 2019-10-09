import React from 'react';
import { Layout } from 'antd';
import Header from '../header';
import Slider from '../sider';
import PageHead from '../page-header';
import styles from './style.less';
import PageContent from '../page-content';

const {
    Footer,
} = Layout;

class Frame extends React.Component {
    render() {
        return (
            <div className="">
                <Slider />
                <Header style={{ background: '#fff', padding: 0 }} />
                <div className={styles.contentTopSpace} />
                <div className={styles.pageRoot}>
                    <div className={styles.pageLeftSpace} />
                    <div className={styles.content}>
                        <PageHead />
                        <PageContent />
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default Frame;
