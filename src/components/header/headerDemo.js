import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './headerDemo.less'

export default class HeaderDemo extends Component {
  render() {
    return (
      <div className='header-demo-wrap clearfix'>
        <div className="header-left fll">
            <h1>共享单车后台系统</h1>
        </div>
        <div className="header-right flr">
            <span className='children'>
                欢迎，江疏影
            </span>
            <span className='logout'>
                <Link to='/common/login'>退出</Link>
            </span>
        </div>
      </div>
    )
  }
}
