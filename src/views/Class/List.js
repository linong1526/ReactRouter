import React from 'react'
import { Button, Table, Popconfirm, message, Row, Col } from 'antd'
import {PlusOutlined,DeleteOutlined, ReconciliationTwoTone} from '@ant-design/icons'
import request from '@/utils/request'
import moment from 'moment'

class List extends React.Component{
    constructor(){
        super()
        this.state-={
            datalist:[],
            total:0,
            pageSize:10,
            page:1,
            selectedRowKeys:[]
        }
    }
    getData=()=>{
        const {page,pageSize}=this.state;
        request.get('/class',{
            page,
            size:pageSize,
            sort:'add_time'
        }).then(({data})=>{
            console.log('data',data)
            this.setState({
                datalist:data.result,
                total:data.total
            })
        })
    }
    addItem =()=>{
        this.history.push('/class/add');
    }
    editItem =(id)=>{
        this.props.history.push({
            pathname:'/class/edit'+id,
            search:'id'+id,
        })
    }
    deleteItem=async (id) =>{
        const {datalist,total}=this.state;
        const data=await request.delete('/class/'+id)
        console.log(data)
        if(data.code===204){
            message.success('删除成功')
            //删除成功之后操作
            //1、重新获取一次
            //2、删除本地数据
            this.setState({
                datalist:datalist.filter(item=>item._id !==id),
                total:total-1
            })
        }else{
            message.error('删除失败')
        }
    }
    deleteItem=async () =>{
        const {datalist,total,selectedRowKeys}=this.state;
        if(selectedRowKeys.length===0){
            message.warning('请选择删除的班级')
            return;
        }
        const data=await request.delete('/class/',{},{
            data:{
                ids:selectedRowKeys
            }
        })
        console.log(data)
        if(data.code===204){
            message.success('删除成功')
            this.setState({
                page:1,
                pageSize:10
            },()=>{
                this.getData()
            })
        }else{
            message.error('删除失败')
        }
    }
    componentDidMount(){
        this.getData();
    }
    render(){
        const {getData,total}=this.state;
        const colnums=[
            {
                title:'班级名称',
                dataIndex:'name',
                //控制数据显示格式
                render:(text,row,index)=>{
                    return (
                        <div>
                            {row.city}-{row.category}-{row.name}
                        </div>
                    )
                }
            },
            {
                title:'添加事件',
                dataIndex:'add_time',
                render(text){
                    return moment(text).format('YYYY/MM/DD')
                }
            },
            {
                title: '操作',
                width: 100,
                render: (row) => {
                    return (
                        <>
                            <Button type="primary" size="small" ghost onClick={this.editItem.bind(this,row._id)}>编辑</Button>
                            <Popconfirm
                                title="确认删除"
                                onConfirm={this.deleteItem.bind(this, row._id)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <Button type="primary" size="small" ghost danger>删除</Button>
                            </Popconfirm>
                        </>
                    )
                }
            },
        ];
        const pagination={
            size:'small',
            total,
            pageSize:10,
            showTotal(total){
                return `共${total} 条记录`
            },
            onChange:(page,pageSize)=>{
                console.log('page',page,pageSize)
                this.setState({
                    page,
                    pageSize
                },()=>{
                    this.getData();
                })
            }
        }
        const rowSelection={
            type:'checkbox',
            onChange:(selectedRowKeys)=>{
                this.setState({
                    selectedRowKeys
                })
            }
        }
        return (
            <div>
                <Row gutter={20}>
                    <Col span={12}><Button type="primary" icon={<PlusOutlined />} onClick={this.addItem}>添加班级</Button></Col>
                    <Col span={12} className="txt-right">
                        <Popconfirm
                            title="确认删除"
                            onConfirm={this.deleteItems}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type="primary" danger icon={<DeleteOutlined />}>批量删除</Button>
                        </Popconfirm>
                    </Col>
                </Row>
                <Table
                    style={{marginTop:20}}
                    rowKey="_id"
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={datalist}
                    pagination={pagination}
                />
            </div>
        )
    }

}
export default List;