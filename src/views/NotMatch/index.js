import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import notMatchImg from './timg.gif';
import './index.less'

class NotMatch extends Component {
    render() {
        return (
            <div className='notmatch clearfix'>
                <div className="notmatch-left fll">
                    <div className="title">
                        Oh My God!
                    </div>
                    <div className="desc">
                        404 没有找到你要的页面!
                    </div>
                    <strong>如有不满，请联系你的领导</strong>
                    <ul>
                        <li>或者你可以</li>
                        <li><Link to='/admin/home'>回首页</Link></li>
                    </ul>
                </div>
                <div className="img fll">
                    <img src={notMatchImg} alt=""/>
                </div>
            </div>
        )
    }
}
export default NotMatch