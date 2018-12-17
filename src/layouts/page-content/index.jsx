import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from "antd";
import './style.less';


export default class PageContent extends Component {

    static propTypes = {
        footer: PropTypes.bool,
    };

    static defaultProps = {
        footer: true,
    };

    render() {
        return (
            <div className="page-content">
                
            </div>
        )
    }
}