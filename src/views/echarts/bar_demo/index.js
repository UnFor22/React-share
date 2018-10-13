import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import EchartsReact from 'echarts-for-react';
import echartsTheme from '../echartTheme';
import { Card } from 'antd';
import './index.less'

export default class BarDemo extends Component {
  componentWillMount() {
    echarts.registerTheme('dyyao', echartsTheme)
  } 

  bar1 = () => {
    return {
      title: {
        text: 'OFO周订单'
      },
      tooltip : {
          trigger: 'axis',
      },
      xAxis : [
          {
              type : 'category',
              data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              axisTick: {
                  alignWithLabel: true
              }
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'ofo订单量',
              type:'bar',
              barWidth: '60%',
              data:[500, 1000, 1600, 3000, 2800, 2600, 2870]
          }
      ]
    };
  }

  bar2 = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      legend: {
          data: ['OFO', '摩拜', '小蓝单车']
      },
      xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisTick: {
            alignWithLabel: true
          }
      },
      yAxis: {
        type: 'value',
      },
      series: [
          {
              name: 'OFO',
              type: 'bar',
              data:[500, 1000, 1600, 3000, 2800, 2600, 2870],
          },
          {
              name: '摩拜',
              type: 'bar',
              data: [600, 1200, 1800, 5000, 6000, 8000, 10000]
          },
          {
              name: '小蓝单车',
              type: 'bar',
              data: [300, 600, 800, 1800, 2000, 1500, 1000]
          }
      ]
    }
    
  }

  render() {
    return (
      <div>
        <Card title='柱状图一'>
          <EchartsReact option={this.bar1()} theme='dyyao'></EchartsReact>
        </Card>
        <Card title='柱状图二'>
          <EchartsReact option={this.bar2()} theme='dyyao'></EchartsReact>
        </Card>
        
      </div>
    )
  }
}
