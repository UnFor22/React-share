import React, { Component } from 'react'
import { Card } from 'antd'
import HeaderDemo from '../../components/header/headerDemo.js'
import './index.less'
import '../../axios'
import axios from '../../axios';

export default class OrderDetail extends Component {
    componentDidMount(){
        this.initMap()
        this.drawPolyline()
        this.addControl()
        this.drawServiceArea()
    }
    // 初始化地图
    initMap = () => {
        const BMap = window.BMap
        var map = new BMap.Map("bmap-container");          
        var point = new BMap.Point(116.404, 39.915);  
        map.centerAndZoom(point, 15);               
    }
    // 添加控件
    addControl = () => {
        const BMap = window.BMap
        this.map.addControl(new BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));    
        this.map.addControl(new BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));  
    }
    //绘制路径折线图
    drawPolyline = () => {
        const {detailid} = this.props.match.params
        axios.get('/order/detail',{id:detailid}).then( res => {
            if(res.code == 0) {
                console.log(res)

            }  
        })
    }
    //绘制服务区
    drawServiceArea = () => {

    }

  render() {
    return (
      <div className='order-detail'>
        <HeaderDemo></HeaderDemo>
        <Card>
            <div className="bmap-wrap" id="bmap-container"></div>
        </Card>
      </div>
    )
  }
}
