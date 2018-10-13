import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import EchartsReact from 'echarts-for-react';
import themeLight from '../themeLight';
import { Card } from 'antd';
import './index.less'

class Admin extends Component {
    componentWillMount() {
        echarts.registerTheme('wangcai',themeLight)
    }

    pie1 = () => {
        return {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                right: '20',
                top: '20',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : '80%',
                    center: ['50%', '60%'],
                    data:[
                        {value:3000, name:'周一'},
                        {value:4000, name:'周二'},
                        {value:3500, name:'周三'},
                        {value:3000, name:'周四'},
                        {value:4000, name:'周五'},
                        {value:6000, name:'周六'},
                        {value:12000, name:'周日'}
                    ],
                }
            ]
        }
    }

    pie2 = () => {
        return {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                right: '20',
                top: '20',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : ['58%', '80%'],
                    center: ['50%', '60%'],
                    data:[
                        {value:3000, name:'周一'},
                        {value:4000, name:'周二'},
                        {value:3500, name:'周三'},
                        {value:3000, name:'周四'},
                        {value:4000, name:'周五'},
                        {value:6000, name:'周六'},
                        {value:12000, name:'周日'}
                    ],
                }
            ]
        }
    }
  render() {
    return (
      <div className="pie-demo">
        <Card title = '饼状图一'>
            <EchartsReact option={this.pie1()} theme='wangcai'></EchartsReact>
        </Card>
        <Card title = '饼状图二'>
            <EchartsReact option={this.pie2()} theme='wangcai'></EchartsReact>
        </Card>
      </div>
    );
  }
}

export default Admin;
