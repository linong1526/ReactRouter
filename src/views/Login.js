import React from 'react'
import { Form, Input, Button,Checkbox, message } from 'antd'
import {withUser,withStorage,withAuth} from '../utils/hoc'
import request from '@/utils/request'
import { render } from 'sass'

@withStorage('userInfo')
class Login extends React.Compoent{
    state={
        initialValues:{
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
        const {initialValues}=this.state;
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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={initialValues}
      onFinish={this.submit}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={rules.username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={rules.password}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 18 }}>
        <Checkbox>下次免登录</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
         登录
        </Button>
      </Form.Item>
    </Form>
            </div>
        )
    }
}

export default Login;