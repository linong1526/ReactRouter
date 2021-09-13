import React from 'react'
import request from '@/utils/request'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    message,
} from 'antd';

class Add extends React.Component{
    state={
        subjectList:[],
        cities:[],
        initialValues:{
            name:'',
            category:'HTML5',
            city:'广州'
        }
    }
    submit=(values)=>{
        console.log('values',values)
        request.post('/class',{
            ...values
        }).then(data=>{
            console.log('category',data);
            if(data.code===201){
                message.success('添加成功');
                this.props.histroy.push('/class')
            }else{
                message.error('添加失败')
            }
        })
    }
    componentDidMount(){
        request.get('/category',{
            total:false,
            size:100
        }).then(data=>{
            console.log('category',data)
            this.setState({
                subjectList:data.data
            })
        })
        request.get('/city',{
            total:false,
            size:100
        }).then(data=>{
            console.log('city',data)
            this.setState({
                cities:data.data
            })
        })
    }
    render(){
        const {subjectList,cities,initialValues}=this.state;
        return(
            <div>
                <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={initialValues}
        onFinish={this.submit}
      >
        <Form.Item label="班级名称" name="name" rules={[
            {
                required:true,
                message:'请填写班级名称'
            },
        ]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item label="学科" name="category">
          <Select>
              {
                  subjectList.map(item=>
                    <Select.Option key={item._id} value={item.name}>{item.name}</Select.Option>
                    )
              }
          </Select>
        </Form.Item>
        <Form.Item label="分校" name="city">
          <Select>
              {
                  cities.map(item=><Select.Option key={item._id} values={item.name}>{item.name}</Select.Option>)
              }
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{offset:4}}>
          <Button type="primary" htmlType="submit">添加</Button>
        </Form.Item>
      </Form>
            </div>
        )
    }
}

export default Add;