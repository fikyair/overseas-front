import React, { Component } from 'react'
import styles from './style.less';

export const PAGE_ROUTE = '/ringProgress'
export default class RingProgress extends Component {
  render() {
    return (
      <div className={styles.content}>
        <table className={styles.tableClass} border="1">
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
              <td>7</td>
              <td>8</td>
              <td>9</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.half} />
      </div>
    )
  }
}
