import React, { Component } from 'react';
import { Form, Button, Select, DatePicker, Card, Table, message, Modal} from 'antd';
import './index.less';
import axios from '../../axios'

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class OrderDemo extends Component {
    state = {
        dataSource: [],
        pagesize: '',
        total: '',
        isLoading: false,
        endItem: {
        }
    }

    componentWillMount () {
        this.getTable()
    }

    params = {
        pn:1,
    }

    getTable = () => {
        this.setState({
            isLoading: true
        })

        axios.get('/order/list',this.params).then(res => {
            console.log(res)
            if(res.code == 0){ 
                this.setState({
                    dataSource: res.result.item_list.map((item,index) => {
                        item.key = index
                        return item
                    }),
                    pagesize: 6,
                    total: res.result.total_count,
                    isLoading: false
                })
            }
        })
    } 

    cityOptions = [{
        value: '浙江',
        label: '浙江',
    }, {
        value: '江苏',
        label: '江苏',
    },{
        value: '北京',
        label: '北京',
    }];
        
    orderStates = [{
        value: '进行中',
        label: '进行中'
    },{
        value: '已完成',
        label: '已完成'
    },{
        value: '结束行程',
        label: '结束行程'
    }]

    resetData = () => {
        this.props.form.resetFields()
    }
    handleSearch = () => {
        console.log(this.props.form.getFieldsValue())
    }
    handleDone = () => {
        let selectedItem = this.state.selectedItem
        if(selectedItem){
            axios.get('/order/ebike_info',{id:selectedItem[0].id}).then(res => {
                console.log(res)
                this.setState({
                    endItem: res.result,
                    isShowModal: true
                })
            })
        }else{
            message.info('请选择一项订单进行操作')
        }
    }
    handleOk = () => {
        this.setState({
            isShowModal:false
        })
        let id = this.state.selectedItem[0].id
        axios.get('/order/finish_order',{id}).then(res => {
            if(res.code == 0){
                Modal.success({
                    title: '操作信息',
                    content: '结束订单成功'
                })
                this.getTable()
            }
        })
    }
    handleDetail = () => {
        let item = this.state.selectedItem
        if(!item){
            message.info('请选择一项订单')
        }else{
            window.open(`/#/common/OrderDetail/${item[0].id}`)            
        }
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const columns = [{
            title: '订单编号',
            dataIndex: 'order_sn',
            key: 'order_sn',
          }, {
            title: '车辆编号',
            dataIndex: 'bike_sn',
            key: 'bike_sn',
          }, {
            title: '用户名',
            dataIndex: 'user_name',
            key: 'user_name',
          }, {
            title: '手机号',
            key: 'mobile',
            dataIndex: 'mobile',
          }, {
            title: '里程',
            dataIndex: 'distance',
            key: 'distance',
          }, {
            title: '行驶时长',
            dataIndex: 'total_time',
            key: 'total_time',
          }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
          }, {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time',
          }, {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time',
          }, {
            title: '订单金额',
            dataIndex: 'total_fee',
            key: 'total_fee',
          }, {
            title: '实付金额',
            dataIndex: 'user_pay',
            key: 'user_pay',
          }];

          const pagination = {
              total: this.state.total,
              pagesize: 6,
              onChange:(index) => {
                  this.params.pn = index
                  this.getTable()
              }
          }

          const rowSelection = {
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                  console.log(selectedRowKeys, selectedRows)
                  this.setState({
                    selectedItem: selectedRows, 
                    selectedIndex: selectedRowKeys
                  })
              }
          }
        return (
            <div className = 'second-wrap'>
                <Card>
                    <Form layout='inline' className='clearfix'>
                    <FormItem label='城市' className='fll mr30'>
                        {
                            getFieldDecorator('city')(
                                <Select style={{ width: 120 }}>
                                    {this.cityOptions.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
                                </Select>)
                        }  
                    </FormItem>
                    <FormItem label='订单时间' className='order-wrap fll'>
                        {
                            getFieldDecorator('order_time')(
                                <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder={['开始时间', '结束时间']}/>)
                        }     
                    </FormItem> 
                    <FormItem label='订单状态' className='fll'>
                        {
                            getFieldDecorator('order_status')(
                                <Select style={{ width: 120 }}>
                                    {this.orderStates.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
                                </Select>)
                        }
                        
                    </FormItem>
                    </Form>
                    <div className='btn-wrap clearfix'>
                        <Button type="primary" className='chaxun fll' onClick = {this.handleSearch}>查询</Button>
                        <Button className='fll' onClick = {this.resetData}>重置</Button>
                    </div>
                </Card>
                <Card style={{borderTop:'-1px'}}>
                    <div className='btn-wrap2 clearfix'>
                        <Button type="primary" className='chaxun fll' onClick={this.handleDetail}>订单详情</Button>
                        <Button type="primary" className='fll' onClick={this.handleDone}>结束订单</Button>
                    </div>
                    
                </Card>
                <Card>
                    <Table pagination={pagination} columns={columns} dataSource={this.state.dataSource} loading = {this.state.isLoading} rowSelection={rowSelection}></Table>
                </Card>
                <Modal
                title="结束订单"
                visible={this.state.isShowModal}
                onOk={this.handleOk}
                onCancel={() => this.setState({isShowModal:false})}
                >
                    <ul>
                        <li className='modal_li'>
                            <span className = 'car-num li-title'>车辆编号：</span>
                            {this.state.endItem.bike_sn}
                        </li>
                        <li className='modal_li'>
                            <span className = 'car-num li-title'>剩余电量：</span>
                            {this.state.endItem.battery}
                        </li>
                        <li className='modal_li'>
                            <span className = 'car-num li-title'>行程开始时间：</span>
                            {this.state.endItem.start_time}
                        </li>
                        <li className='modal_li'>
                            <span className = 'car-num li-title'>当前位置：</span>
                            {this.state.endItem.location}
                        </li>
                    </ul>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(OrderDemo)