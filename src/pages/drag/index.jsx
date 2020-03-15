import React, { Component } from 'react';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
import PageContent from '../../layouts/page-content';
import styles from './style.less';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const PAGE_ROUTE = '/drag';

export default class Drag extends Component {
    render() {
        const layout = [
            {
                i: 'a', x: 0, y: 0, w: 4, h: 2, static: false,
            },
            {
                i: 'b', x: 1, y: 0, w: 3, h: 2,
            },
            {
                i: 'c', x: 0, y: 0, w: 1, h: 2,
            }];
        const layoutlg = [
            {
                i: 'a', x: 0, y: 0, w: 24, h: 2, static: false,
            },
            {
                i: 'b', x: 1, y: 0, w: 24, h: 2,
            },
            {
                i: 'c', x: 0, y: 0, w: 24, h: 2,
            }];
        const layouts = {
            lg: layoutlg, md: layout, sm: layout, xs: layout, xxs: layout,
        };
        return (
            <PageContent className={styles.pageContent}>
                <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                    <div key="a" className={styles.grad}>a</div>
                    <div key="b" className={styles.grad}>b</div>
                    <div key="c" className={styles.grad}>c</div>
                </GridLayout>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={{
                        lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0,
                    }}
                    cols={{
                        lg: 24, md: 10, sm: 6, xs: 4, xxs: 2,
                    }}
                >
                    <div key="a" className={styles.grad}>d</div>
                    <div key="b" className={styles.grad}>e</div>
                    <div key="c" className={styles.grad}>f</div>
                </ResponsiveGridLayout>
            </PageContent>
        );
    }
}
