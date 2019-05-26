import React, { Component } from 'react';
import styles from './style.less';
import tabledemo3 from './image/item-bg.png';
import WordOutside from './image/word-outside.png';
import WordInside from './image/word-inside.png';

export const PAGE_ROUTE = '/intl';
export default class Home extends Component {
    state = {
      imageData: [
        {
          url: tabledemo3,
          title: '💺',
        },
        {
          url: tabledemo3,
          title: '💻',
        },
        {
          url: tabledemo3,
          title: '🎧',
        },
      ],
      souceData: [
        {
          value: '资源',
        }, {
          value: '资源',
        }, {
          value: '资源',
        },
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
              {
                this.state.imageData.map(item => (
                  <div>
                    <div className={styles.sideTitle}>
                      { item.title }
                    </div>
                    <div className={styles.sideContent}>
                      <img src={item.url} alt="图片" className={styles.img} />
                    </div>
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
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                margin: '0 2px',
              }}
              >
                {
                  this.state.souceData.map(item => (

                    <div
                      style={{
                        fontSize: 14,
                        color: '#fff',
                        backgroundImage: `url(${tabledemo3})`,
                        width: '31%',
                        padding: 5,
                        paddingBottom: 20,
                        textAlign: 'center',
                        height: 120,
                      }}
                      className={styles.bottomItem}
                    >
                      {item.value}
                    </div>
                  ))
                }
              </div>

            </div>
            <div className={styles.side}>
              {
                this.state.imageData.map(item => (
                  <div>
                    <div className={styles.sideTitle}>
                      { item.title }
                    </div>
                    <div className={styles.sideContent}>
                      <img src={item.url} alt="图片" className={styles.img} />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      );
    }
}
