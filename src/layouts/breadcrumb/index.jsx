import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router-dom';
import './style.less';
const Item = Breadcrumb.Item;

export default class BreadCrumb extends Component{

    static propTypes = {
        dataSource: PropTypes.array, // 数据源
    };

    static defaultProps = {
        dataSource: [],
    };

    renderItems(){
        const {dataSource} = this.props;
        if (dataSource && dataSource.length) {
            return dataSource.map(({key, icon, text, path}) => {
                if (path) {
                    return (
                        <Item key={key}>
                            <Link to={path}>
                                {icon ? <Icon type={icon}/> : null}
                                {text}
                            </Link>
                        </Item>
                    );
                }
                return (
                    <Item key={key}>
                        {icon ? <Icon type={icon}/> : null}
                        {text}
                    </Item>
                );
            })
        }
        return null;
    }

    render(){

        return(
            <div className = ''>
                <Breadcrumb>
                    {this.renderItems()}
                </Breadcrumb>
            </div>
        )
    }
}