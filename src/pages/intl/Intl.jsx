import React, { Component } from 'react';
import styles from './style.less';
import tabledemo3 from './image/item-bg.png';
import WordOutside from './image/word-outside.png';
import WordInside from './image/word-inside.png';

export const PAGE_ROUTE = '/intl';
export default class Home extends Component {
    state = {
      imageData: [
        tabledemo3, tabledemo3, tabledemo3,
      ],
    }

    render() {
      return (
        <div className={styles.indexWrap}>
          <div className={styles.navTop}>
             YOYO
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.side}>
              <div className={styles.sideTitle}>
                 左
              </div>
              {
                this.state.imageData.map(item => (
                  <div className={styles.sideContent}>
                    <img src={item} alt="图片" className={styles.img} />
                  </div>
                ))
              }
            </div>
            <div className={styles.middleWrap}>
              <div className={styles.middle}>
                <div className={styles.middleTitle}>
                        中
                </div>
                <div className={styles.outside}>
                  <img src={WordOutside} alt="" width="100%" />
                </div>
                <div className={styles.inside}>
                  <img src={WordInside} alt="" width="100%" />
                </div>
                <img src={tabledemo3} alt="图片" className={styles.middleRank} />
              </div>
              <div className={styles.middleBottom}>
                        三个
              </div>
            </div>
            <div className={styles.side}>
              <div className={styles.sideTitle}>
                 右
              </div>
              <div className={styles.sideContent}>
                表格数据
              </div>
            </div>
          </div>
        </div>
      );
    }
}
