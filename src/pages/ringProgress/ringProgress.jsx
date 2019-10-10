import React, { Component } from 'react'
import styles from './style.less';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/ringProgress'
export default class RingProgress extends Component {
    render() {
        return (
            <PageContent className={styles.content}>
                <table className={styles.tableClass}>
                    <tbody>
                        <tr>
                            <td>
                                <div className={styles.wrap}>
                                    <div className={styles.inside} />
                                </div>
                            </td>
                            <td>
                                <div className={styles.outRing} />
                            </td>
                            <td>
                                <div className={styles.ringByBorder} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: 14 }}>
                                <div className={styles.ringShadow} />
                            </td>
                            <td>
                                <div className={styles.ringGradient} />
                            </td>
                            <td>
                                <div className={styles.halfShadow}>
                                    <div className={styles.halfRingLeft} />
                                    <div className={styles.halfRingRight} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.ringSVG}>
                                    <svg xmlns="http://www.w3.org/200/svg" height="130" width="110">
                                        <circle cx="55" cy="55" r="50" fill="none" stroke="#9edec9" strokeWidth="8" strokeLinecap="round" />
                                        <circle
                                            className={styles.svgClass}
                                            cx="55"
                                            cy="55"
                                            r="50"
                                            fill="none"
                                            stroke="#009966"
                                            strokeWidth="10"
                                            strokeDasharray="1000"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </td>
                            <td>
                                <div className={styles.ringClipPath}>
                                    <div className={styles.ringClipPathtTop} />
                                </div>
                            </td>
                            <td>9</td>
                        </tr>
                    </tbody>
                </table>
            </PageContent>
        )
    }
}
