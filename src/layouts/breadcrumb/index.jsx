/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './style.less';

const { Item } = Breadcrumb;

export default class BreadCrumb extends Component {
    static propTypes = {
        dataSource: PropTypes.array, // 数据源
    };

    static defaultProps = {
        dataSource: [],
    };

    renderItems() {
        const { dataSource } = this.props;
        if (dataSource && dataSource.length) {
            return dataSource.map(({
                key, text, path,
            }) => {
                if (path) {
                    return (
                        <Item key={key}>
                            <Link to={path}>
                                {text}
                            </Link>
                        </Item>
                    );
                }
                return (
                    <Item key={key}>
                        {text}
                    </Item>
                );
            });
        }
        return null;
    }

    render() {
        return (
            <div className="">
                <Breadcrumb>
                    {this.renderItems()}
                </Breadcrumb>
            </div>
        );
    }
}
