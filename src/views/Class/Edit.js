import React from 'react'
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
        console.log('values',values);
        const {_id,...fields}=values;
        requestAnimationFrame.put('/class/'+_id,{
            ...fields
        }).then(data=>{
            console.log('category',data);
            if(data.code===201){
                message.success('修改成功');
                this.props.history.push('/class')
            }else{
                message.error('修改失败')
            }
        })
    }
    componentDidMount(){
        console.log('Edit.prop=',this.props)
        const classId=this.props.match.params.id 
        const search=new URLSearchParams(this.props.location.search)
        const id=search.get('id');
        console.log('id=',id,classId)
        request.get('/class/'+id).then(data=>{
            console.log('classDetail',data)
            this.form.setFieldsValue(data.data)
        })
        //获取学科
        request.get('/category',{
            total:false,
            size:100
        }).then(data=>{
            console.log('category',data)
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
                    ref={el=>this.form=el}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    layout="horizontal"
                    initialValues={initialValues}
                    onFinish={this.submit}
                >
                    
                    <Form.Item name="_id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label="班级名称" name="name" rules={[
                        {
                            required: true,
                            message: '请填写班级名称',
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="学科" name="category">
                        <Select>
                            {
                                subjectList.map(item=>                            <Select.Option key={item._id} value={item.name}>{item.name}</Select.Option>)
                            }

                        </Select>
                    </Form.Item>
                    <Form.Item label="分校" name="city">
                        <Select>
                        {
                                cities.map(item=>                            <Select.Option key={item._id} value={item.name}>{item.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        offset:4
                    }}>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Add;