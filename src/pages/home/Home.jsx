/* eslint-disable max-classes-per-file */
import React from 'react';
import ReactDOM from 'react-dom';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/home';


class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = { common: 0 };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.clickCount !== nextProps.clickCount) {
            return true;
        }
        if (this.state.common !== nextState.common) {
            return true;
        }
        return false;
    }

    handleChild = () => {
        this.setState((state) => ({ common: state.common + 1 }));
    }

    render() {
        console.log('子组件');
        return (
            <div>
                common: {this.state.common}
                <div>
                    <button onClick={this.handleChild}>子组件改变本身</button>
                </div>
            </div>
        );
    }
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0, clickCount: 0 };
        this.change = this.change.bind(this);
        this.clickChange = this.clickChange.bind(this);
    }

    change() {
        this.setState((state) => ({ count: state.count + 1 }));
    }

    clickChange() {
        this.setState((state) => ({ clickCount: state.clickCount + 1 }));
    }

    render() {
        return (
            <div>
                <div >count：{this.state.count}</div>
                <button onClick={this.change}>+1</button>
                <div>
                    <button onClick={this.clickChange}>change</button>
                </div>
                <Child clickCount={this.state.clickCount} />
            </div>
        );
    }
}


class App extends React.Component {
    componentDidMount() {
        const $parent = ReactDOM.findDOMNode(this);
        const $child = $parent.querySelector('.child');
        $parent.addEventListener('click', this.onParentDOMClick, false);
        $child.addEventListener('click', this.onChildDOMClick, false);
    }

    onChildDOMClick = (evt) => {
        console.log('Dom Child Click');
    }

    onParentDOMClick = (evt) => {
        console.log('Dom Parent Click');
    }

    onParentClick = () => {
        console.log('React Parent Click');
    }

    onChildClick = (evt) => {
        evt.stopPropagation();
        console.log('React Child Click');
    }

    // Dom Child Click
    // Dom Parent Click
    // React Child Click

    render() {
        return (
            <PageContent>
                <div onClick={this.onParentClick}>
                    <div className="child" onClick={this.onChildClick}>
                        Demo
                    </div>
                </div>
                <Parent />
            </PageContent>
        );
    }
}

export default App;
