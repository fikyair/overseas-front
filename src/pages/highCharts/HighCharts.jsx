/* eslint-disable no-array-constructor */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { json } from 'd3-request'
import { timeParse } from 'd3-time-format'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'

const parseTime = timeParse('%Y-%m-%d')

export const PAGE_ROUTE = 'hightcharts'

export default class HightCharts extends Component {
  constructor() {
    super()
    this.state = {
      config: {},
    }
  }

  componentWillMount() {
    const url =			'http://stock.liangyee.com/bus-api/stock/freeStockMarketData/getDailyKBar?userKey=5AD6AB8D906A4FACAC15E6CFAAAAAAAA&startDate=2015-01-01&symbol=600300&endDate=2016-02-20&type=0'

    json(url, (err, data) => {
      const result = data.result
      const ohlc = new Array()
      const volume = new Array()

      result.forEach((d) => {
        const items = d.split(',')
        const date = parseTime(items[0]).getTime()

        // 用于显示烛台图的数据
        ohlc.push([
          date, // 转换时间为时间戳格式
          +items[1], // 开盘价
          +items[3], // 最高价
          +items[4], // 最低价
          +items[2], // 收盘价
        ])

        // 用于显示成交量的数据
        volume.push({
          x: date, // 时间
          y: +items[5], // 成交量
          color: +items[1] - +items[2] > 0 ? 'green' : 'red',
        })
      })

      this.setState({
        config: {
          rangeSelector: {
            selected: 1,
            inputDateFormat: '%Y-%m-%d',
          },
          title: {
            text: '测试图表',
          },
          xAxis: {
            dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%m-%d',
              week: '%m-%d',
              month: '%y-%m',
              year: '%Y',
            },
          },
          yAxis: [
            {
              labels: {
                align: 'right',
                x: -3,
              },
              title: {
                text: '股价',
              },
              height: '60%',
              lineWidth: 2,
            },
            {
              labels: {
                align: 'right',
                x: -3,
              },
              title: {
                text: '成交量',
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2,
            },
          ],
          series: [
            {
              type: 'candlestick',
              name: 'AAPL',
              color: 'green',
              lineColor: 'green',
              upColor: 'red',
              upLineColor: 'red',
              tooltip: {},
              data: ohlc,
            },
            {
              type: 'column',
              name: 'Volume',
              data: volume,
              yAxis: 1,
            },
          ],
        },
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          <h2>Welcome to React</h2>
        </div>
        <ReactHighstock config={this.state.config} />
      </div>
    )
  }
}
