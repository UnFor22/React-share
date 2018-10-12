import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Menu,Icon } from 'antd';
import './index.less'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class NavLeft extends Component {
    
    render() {
        return (
            <div className = 'nav-left'>
                <Menu mode="vertical" theme='dark'>
                    <MenuItem key='首页'>
                        <Link to='/admin/home'>首页</Link>
                    </MenuItem>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>订单管理</span></span>}>
                        <MenuItem key='订单管理'>
                            <Link to='/admin/OrderDemo'>订单管理</Link>
                        </MenuItem>
                        <MenuItem key='订单管理demo'>
                            <Link to='/admin/OrderDemo'>订单管理demo</Link>
                        </MenuItem>
                    </SubMenu>
                    
                </Menu>
            </div>
        )
    }
}
export default NavLeft