import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PageFrame from '../layouts/frame/index';
import pageRoutes from './page-routes';
import routes from '../pages/routes';
import AuthRoute from './AuthRoute';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import { isAuthenticated } from '../commons';


const history = createBrowserHistory();
const allRoutes = pageRoutes.concat(routes);

export default class extends Component {
    render() {
        // 将 PageFrame 与 路由页面 作为兄弟节点，避免PageFrame重新渲染，导致页面也重新渲染的问题；
        return (
            <Router history={history}>
                <Route exact path="/login" component={Login} />
                <Route
                    path="/"
                    render={(props) => {
                        if (props.location.pathname === '/login' || !isAuthenticated()) {
                            window.sessionStorage.removeItem('currentLoginUser')
                            return null;
                        }
                        return <PageFrame {...props} />;
                    }}
                />
                <Switch>
                    <AuthRoute exact path="/" component={Home} />
                    {
                        allRoutes.map(item => (
                            <AuthRoute
                                key={item.path}
                                exact
                                path={item.path}
                                component={item.component}
                            />
                        ))
                    }
                </Switch>
            </Router>
        )
    }
}