import React, { Component } from 'react';
import logo from './logo.svg';
import './logo.less';

export default class Logo extends Component{

    static defaultProps = {
        title: 'OpenSource'
    }
    render(){
        const { title } = this.props;
        return(
            <div >
                <img src={logo} alt="logo"/>
                <h1>{ title }</h1>
            </div>
        )
    }
}