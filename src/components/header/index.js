import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import '../../style/common.less';
import './index.less';
import {formDate} from '../../utils';
import axios from 'axios'

class Header extends Component {
    state = {
        time: '2018-08-11 22:55:45',
        weather: '低温 3.0℃ ~ 高温 16.0℃ 西北风 4-5级'
    }

    getTime = () => {
        setInterval(() => {
            let unixDate = new Date().getTime()
            let timeStr = formDate(unixDate)
            this.setState({
                time:timeStr
            })
        },1000)
    }

    getWeather = () => {
        axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`).then(res => {
            let weather = res.data.data.forecast[0]
            console.log(weather)
            let weatherStr = `${weather.low} ~ ${weather.high}  ${weather.fx} ${weather.fl}`
            this.setState({
                weather : weatherStr
            })
        })
    }

    componentWillMount(){
        this.getTime()
        this.getWeather()
    }

    render() {
        return (
            <div className = 'header-wrap'>
                <div className = 'user-info clearfix'>
                    <div className='flr'>
                        <Link to='/login'>退出</Link>
                    </div>
                    <div className = 'user-detail flr'>
                        欢迎， <span className='username'>张怡宁</span>
                    </div>
                </div>
                <div className="weather-wrap clearfix">
                    <div className='breadcrumb fll'>
                        首页
                    </div>
                    <div className="weather flr clearfix">
                        <div className='date fll'>
                            {this.state.time}
                        </div>
                        <div className='weather-detail fll'>
                            {this.state.weather}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header