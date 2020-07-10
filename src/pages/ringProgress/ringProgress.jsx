import React, { Component } from 'react';
import { Form, Select, Button } from 'antd';
import styles from './style.less';
import PageContent from '../../layouts/page-content';
import Suggest from './Suggest';

export const PAGE_ROUTE = '/ringProgress';
export default class RingProgress extends Component {
    state = {
        val: 0,
        value: '01',
    }

    componentDidMount() {
        this.setState({
            val: this.state.val + 1,
        }, () => {
            console.log('223', this.state.val);
        });
        console.log(this.state.val);

        this.setState({
            val: this.state.val + 1,
        }, () => {
            console.log('112', this.state.val);
        });
        console.log(this.state.val);

        setTimeout(() => {
            this.setState({
                val: this.state.val + 1,
            });
            console.log(this.state.val);

            this.setState({
                val: this.state.val + 1,
            });
            console.log(this.state.val);
        });
    }

    onFinish = () => {
        console.log('object');
    }

    onFinishFailed =() => {
        console.log('onFinishFailed');
    }

    handle=(NAME) => {
        console.log('NAME: ', NAME);
        const fileUrl = NAME === 'first' ? 'first' : 'second';
        console.log('fileUrl: ', fileUrl);
    }

    render() {
        return (
            <PageContent className={styles.content}>
                <Suggest/>
                <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                    <Form.Item
                        name={'actTyp'}
                        rules={[{ required: true }]}
                        label="账户属性"
                        initialValue={this.state.value}
                    >
                        <Select
                            style={{ width: 120 }}
                        >
                            <Select.Option value="00">对公</Select.Option>
                            <Select.Option value="01">对私</Select.Option>
                        </Select>
                    </Form.Item>
                    <Button onClick={() => this.handle('first')}>提价</Button>
                    <Button onClick={() => this.handle('second')}>提价2</Button>

                </Form>
                <table className={styles.tableClass}>
                    <tbody>
                        <tr>
                            <td>
                                <div className={styles.wrap}>
                                    <div className={styles.inside} />
                                </div>
                            </td>
                            <td>
                                <div className={styles.outRing} />
                            </td>
                            <td>
                                <div className={styles.ringByBorder} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: 14 }}>
                                <div className={styles.ringShadow} />
                            </td>
                            <td>
                                <div className={styles.ringGradient} />
                            </td>
                            <td>
                                <div className={styles.halfShadow}>
                                    <div className={styles.halfRingLeft} />
                                    <div className={styles.halfRingRight} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.ringSVG}>
                                    <svg xmlns="http://www.w3.org/200/svg" height="130" width="110">
                                        <circle cx="55" cy="55" r="50" fill="none" stroke="#9edec9" strokeWidth="8" strokeLinecap="round" />
                                        <circle
                                            className={styles.svgClass}
                                            cx="55"
                                            cy="55"
                                            r="50"
                                            fill="none"
                                            stroke="#009966"
                                            strokeWidth="10"
                                            strokeDasharray="1000"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </td>
                            <td>
                                <div className={styles.ringClipPath}>
                                    <div className={styles.ringClipPathtTop} />
                                </div>
                            </td>
                            <td>9</td>
                        </tr>
                    </tbody>
                </table>
            </PageContent>
        );
    }
}
