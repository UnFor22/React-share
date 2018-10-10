import React, { Component } from 'react';
import Header from '../../components/header';
import NavLeft from '../../components/navLeft';
import Footer from '../../components/footer';
import { Row, Col } from 'antd';
import './index.less'

class Admin extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (
      <div className="admin">
      <Row>
        <Col span={4}>
          <NavLeft></NavLeft>
        </Col>
        <Col span={20}>
          <Header></Header>
          <div className='content-wrap'>
            <div className = 'content'>
              {this.props.children}
            </div>
          </div>
          <Footer></Footer>
        </Col>
      </Row>
      </div>
    );
  }
}

export default Admin;
