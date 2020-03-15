import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Form, Button, Input,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './style.less';


export const PAGE_ROUTE = '/login';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const userNameError = form.isFieldTouched('userName') && form.getFieldError('userName');
    const passwordError = form.isFieldTouched('password') && form.getFieldError('userName');

    const onFinish = (values) => {
        window.sessionStorage.setItem('currentLoginUser', JSON.stringify(values));
        window.location.href = '/';
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.root}>
            <Helmet>
                <title>登录</title>
            </Helmet>
            <div className={styles.box}>
                <div className={styles.header}>USER LOGIN</div>
                <Form onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}
                        name="userName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input autoFocus prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Button
                        className={styles.submitBtn}
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(form.getFieldsError())}
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
};

export default Login;
