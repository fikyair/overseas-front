import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import {
    Form, Button, Input, Icon,
} from 'antd';
import styles from './style.less';


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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log('values: ', values);
            if (!err) {
                window.sessionStorage.setItem('currentLoginUser', JSON.stringify(values));
                window.location.href = '/';
            }
        })
    }

    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const { loading, message } = this.state;

        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div className={styles.root}>
                <Helmet>
                    <title>登录</title>
                </Helmet>
                <div className={styles.box}>
                    <div className={styles.header}>USER LOGIN</div>
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
                            className={styles.submitBtn}
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            Log in
                        </Button>
                    </Form>
                    <div className={styles.errorTip}>{message}</div>
                    <div className={styles.tip}>
                        <span>Username：guest </span>
                        <span>Password：guest</span>
                    </div>
                </div>
            </div>
        );
    }
}
