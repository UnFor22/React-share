import React,{Component} from 'react';
import { Cascader,DatePicker } from 'antd';
import './index.less'

const { RangePicker } = DatePicker;
const options = [{
    value: '浙江',
    label: '浙江',
}, {
    value: '江苏',
    label: '江苏',
},{
    value: '北京',
    label: '北京',
}];

class SecondPage extends Component {
        
    render() {
        return (
            <div className = 'second-wrap clearfix'>
                <div className = 'city-wrap fll'>
                    城市： <Cascader className='city' options={options} placeholder="请选择" />
                </div>
                <div className='order-wrap fll'>
                    订单时间：<RangePicker className='order' showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder={['开始时间', '结束时间']}/>
                </div>
            </div>
        )
    }
}
export default SecondPage