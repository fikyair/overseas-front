import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom'
import {
  Form, Button, Input, Icon,
} from 'antd';

export const PAGE_ROUTE = '/login';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Form.create()
@withRouter
export default class Login extends Component {
    state = {
      loading: false,
      message: '',
    };

    componentDidMount() {
    }

    render() {
      const {
        getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
      } = this.props.form;
      const { loading, message } = this.state;

      const userNameError = isFieldTouched('userName') && getFieldError('userName');
      const passwordError = isFieldTouched('password') && getFieldError('password');
      return (
        <div className="root">
          <Helmet>
            <title>登录</title>
          </Helmet>
          <div className="box">
            <div className="header">USER LOGIN</div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}
              >
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input autoFocus prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />,
                )}
              </Form.Item>
              <Form.Item
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
              >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />,
                )}
              </Form.Item>
              <Button
                styleName="submit-btn"
                loading={loading}
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                        Log in
              </Button>
            </Form>
            <div className="error-tip">{message}</div>
            <div className="tip">
              <span>Username：test </span>
              <span>Password：111</span>
            </div>
          </div>
        </div>
      );
    }
}
