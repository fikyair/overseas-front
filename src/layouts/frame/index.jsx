import React from 'react';
import { Layout } from 'antd';
import Header from '../header';
import Sider from '../sider';
import PageHead from '../page-header';
import './style.less';
import PageContent from '../page-content';

const {
  Footer,
} = Layout;

class Frame extends React.Component {
  render() {
    return (
      <div className="">

        <Sider />
        <Header style={{ background: '#fff', padding: 0 }} />
        <div className="content-top-space" />
        <div className="page-root">
          <div className="page-left-space" />
          <div className="content">
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
