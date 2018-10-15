import React, { Component } from 'react'
import { Card } from 'antd'
import HeaderDemo from '../../components/header/headerDemo.js'
import './index.less'
import '../../axios'
import axios from '../../axios';

export default class OrderDetail extends Component {
    state= {
        orderInfo:{}
    }
    componentDidMount(){
        this.getData()
    }
    getData = () => {
        const {id} = this.props.match.params
        axios.get('/order/detail',{id}).then( res => {
            if(res.code == 0) {
                console.log(res)
                this.initMap(res.result)
                this.setState({
                    orderInfo:res.result
                })
            }  
        })
    }
    // 初始化地图
    initMap = (result) => {
        const BMap = window.BMap
        this.map = new BMap.Map("bmap-container");          
        this.addControl()  
        this.drawPolyline(result.position_list)  
        this.drawServiceArea(result.area)     
    }
    // 添加控件
    addControl = () => {
        const BMap = window.BMap
        const map = this.map
        map.addControl(new BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));    
        map.addControl(new BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));  
    }
    //绘制路径折线图
    drawPolyline = (position_list) => {
        const BMap = window.BMap
        const map = this.map
        let startPoint = position_list[0]
        let endPoint = position_list[position_list.length-1]
        let startBmapPoint = new BMap.Point(startPoint.lon, startPoint.lat) // 绘制一个百度地图的起点
        let endBmapPoint = new BMap.Point(endPoint.lon, endPoint.lat) // 绘制一个百度地图的终点

        let startIcon = new BMap.Icon("/imgs/start_point.png", new BMap.Size(36, 42), {    
            imageSize: new BMap.Size(36,42)
        });      
        // 创建标注对象并添加到地图  
        let endIcon = new BMap.Icon("/imgs/end_point.png", new BMap.Size(36, 42), {    
            imageSize: new BMap.Size(36,42)
        }); 
        let startMarker = new BMap.Marker(startBmapPoint, {icon: startIcon})
        let endMarker = new BMap.Marker(endBmapPoint,{icon: endIcon})
        map.addOverlay(startMarker) // 添加起始坐标点
        map.addOverlay(endMarker) // 添加结束坐标点
        map.centerAndZoom(startBmapPoint, 15); // 设置地图的中心点

        let polyline = new BMap.Polyline(position_list.map(point => {
            return new BMap.Point(point.lon, point.lat)
        }),
            {strokeColor:"#1869AD", strokeWeight:3, strokeOpacity:1}
            );
        map.addOverlay(polyline);
    }
    //绘制服务区
    drawServiceArea = (area) => {
        const BMap = window.BMap
        const map = this.map

        let polygon = new BMap.Polygon(
            area.map(point => new BMap.Point(point.lon, point.lat)),
            {
                strokeColor: '#ff0000',
                strokeWeight: 4,
                fillColor: '#ff6700',
                fillOpacity: 0.5
            }  
        )
        map.addOverlay(polygon)
    }

  render() {
      const info = this.state.orderInfo
    return (
      <div className='order-detail'>
        <HeaderDemo></HeaderDemo>
        <Card className = 'card1'>
            <div className="bmap-wrap" id="bmap-container"></div>
        </Card>
        <Card className = 'card'>
            <div className='basic-info detail-info'>
                <div className='title'>
                    基础信息
                </div>
                <ul>
                    <li>
                        <span className="info-left">用车模式</span>
                        <span className="info-right">{info.mode == 1 ? '服务区' : '停车点'}</span>
                    </li>
                    <li>
                        <span className="info-left">订单编号</span>
                        <span className="info-right">{info.order_sn}</span>
                    </li>
                    <li>
                        <span className="info-left">车辆编号</span>
                        <span className="info-right">{info.bike_sn}</span>
                    </li>
                    <li>
                        <span className="info-left">用户姓名</span>
                        <span className="info-right">{info.user_name}</span>
                    </li>
                    <li>
                        <span className="info-left">手机号码</span>
                        <span className="info-right">{info.mobile}</span>
                    </li>
                </ul>
            </div>
        </Card>
        <Card className = 'card'>
            <div className='drive-track detail-info'>
                <div className='title'>
                    行驶轨迹
                </div>
                <ul>
                    <li>
                        <span className="info-left">行程起点</span>
                        <span className="info-right">{info.start_location}</span>
                    </li>
                    <li>
                        <span className="info-left">行程终点</span>
                        <span className="info-right">{info.end_location}</span>
                    </li>
                    <li>
                        <span className="info-left">行驶里程</span>
                        <span className="info-right">{info.distance/1000+ 'KM'}</span>
                    </li>
                    
                </ul>
            </div>
        </Card>
      </div>
    )
  }
}
