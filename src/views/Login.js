import React from 'react'
import { Form, Input, Button,Checkbox, message } from 'antd'
import {withUser,withStorage,withAuth} from '../utils/hoc'
import request from '@/utils/request'
import { render } from 'sass'

@withStorage('userInfo')
class Login extends React.Compoent{
    state={
        initalValues:{
            username:'',
            Password:'',
            remember:true
        }
    }
    submit=async(values)=>{
        console.log('values',values)
        const data=await request.post('/login',values)
        if(data.code===200){
            //把用户信息存入本地
            localStorage.setItem('userInfo',JSON.stringify(data.data));
            this.prpos.history.push('/manage/home');
        }else{
            message.error('用户名或密码不正确')
        }
    }
    componentDidMount(){
        //如果用户已登录，用户在进入登录页面时自动跳到后台首页
        if(this.props.userInfo){
            this.props.history.replace('/manage/home')
        }
    }
    render(){
        console.log('Login.render')
        const {initalValues}=this.state;
        const rules={
            username:[{
                require:true,
                message:'请填写用户名'
            }],
            password:[{
                require:true,
                message:'请填写密码'
            }]
        }
        return (
            <div className="login-page">
                <h1>班级管理系统</h1>
                <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
            </div>
        )
    }
}

export default Login;