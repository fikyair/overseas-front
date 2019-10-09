/*
 * @Description:
 * @Author: Xue Shiming
 * @Date: 2019-10-08 09:59:35
 * @GitLab: http://192.168.120.68/he_xia/gascard-front
 * @LastEditors: Xue Shiming
 * @LastEditTime: 2019-10-09 10:23:14
 */
import React, {
    Component,
} from 'react';
import Router from './router/Router';
import './App.less';

class App extends Component {
    componentWillMount() {
        console.log('app')
    }

    render() {
        return (<Router />
        );
    }
}

export default App;
