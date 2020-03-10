// eslint-disable-next-line max-classes-per-file
import React, {
    PureComponent,
} from 'react';

class SubComponent extends PureComponent {
    render() {
        return (<div> 我是子组件啊 </div>);
    }
}
class AnotherComponents extends PureComponent {
    render() {
        return (<div> 我是另一个子组件啊 </div>);
    }
}

function OtherComponent() {
    return (
        <div> 我是 OtherComponent 啊 </div>
    );
}

export { SubComponent, AnotherComponents, OtherComponent };
