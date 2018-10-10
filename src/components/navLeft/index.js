import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import './index.less'

const MenuItem = Menu.Item;

class NavLeft extends Component {
    
    render() {
        return (
            <div className = 'nav-left'>
                <Menu mode="vertical" theme='dark'>
                    <MenuItem key='首页'>
                        <Link to='/admin/home'>首页</Link>
                    </MenuItem>
                    <MenuItem key='订单管理'>
                        <Link to='/admin/secondPage'>订单管理</Link>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}
export default NavLeft