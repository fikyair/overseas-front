/* eslint-disable import/extensions */
// 如果有特殊路由配置，可以在这个文件中进行
import Hooks01 from './hooks/hooks01.jsx';
import Hooks02 from './hooks/hooks02.jsx';
import Hooks03 from './hooks/hooks03.jsx';
import Hooks04 from './hooks/react-demo.jsx';
import Redirects from './router-demo/AuthExample';
import HashRouter from './router-demo/HashRouter';

export default [{
    path: '/hooks01',
    component: Hooks01,
},
{
    path: '/hooks02',
    component: Hooks02,
},
{
    path: '/hooks03',
    component: Hooks03,
},
{
    path: '/react-demo',
    component: Hooks04,
},
{
    path: '/hash-router',
    component: HashRouter,
}];
