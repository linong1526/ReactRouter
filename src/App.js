import React from 'react'
import { HashRouter, BrowserRouter, Route, Redirect, Switch, Link, NavLink,withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Row, Col, Button } from 'antd';
import { AlipayOutlined, UserOutlined, LaptopOutlined, NotificationOutlined, HomeOutlined, InsertRowLeftOutlined, UsergroupAddOutlined, ReconciliationOutlined } from '@ant-design/icons';

import Login from './views/Login'
import Home from './views/Home'
import Class from './views/Class'
import Student from './views/Student'
import Subject from './views/Subject'

import 'antd/dist/antd.css';
import './App.scss'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: [
                {
                    path: '/home',
                    text: '首页',
                    icon: <HomeOutlined />
                },
                {
                    path: '/class',
                    text: '班级管理',
                    icon: <InsertRowLeftOutlined />,
                    children: [
                        {
                            path: '/list',
                            text: '班级列表'
                        },
                        {
                            path: '/add',
                            text: '添加班级'
                        },
                    ]
                },
                {
                    path: '/student',
                    text: '学生管理',
                    icon: <UsergroupAddOutlined />,
                    children: [
                        {
                            path: '/list',
                            text: '学生列表'
                        },
                        {
                            path: '/add',
                            text: '添加学生'
                        },
                    ]
                },
                {
                    path: '/xueke',
                    text: '学科管理',
                    icon: <ReconciliationOutlined />,
                    children: [
                        {
                            path: '/list',
                            text: '学科列表'
                        },
                        {
                            path: '/add',
                            text: '添加学科'
                        },
                    ]
                },
            ]
        }

        this.changeMenu = this.changeMenu.bind(this)
    }
    changeMenu({key}){
        console.log(this.props)
        this.props.history.push(key);
    }
    render() {
        const { menu } = this.state;
        return (
            // <div>
            //     App

            //     <nav>
            //         <NavLink to="/home" activeStyle={{color:'#f00'}}>首页</NavLink>
            //         <NavLink to="/login" activeStyle={{color:'#f00'}}>登录</NavLink>
            //     </nav>
            //         <Switch>
            //             <Route path="/login" component={Login} />
            //             <Route path="/home">
            //                 <Home></Home>
            //             </Route>
            //             <Route path="/notfound" 
            //             // render={()=><div>notfound</div>}
            //             >
            //                 <div>404, 您访问的页面不存在</div>
            //             </Route>

            //             {/* 重定向 */}
            //             <Redirect from="/" to="/home" exact />
            //             <Redirect to="/notfound" />
            //         </Switch>

            // </div>
            <Layout style={{ height: '100vh' }}>
                <Header className="header" style={{ padding: '0 20px' }}>

                    <Row>
                        <Col span={18}><div className="logo">
                            <AlipayOutlined className="icon" />
                            <h1>班级管理系统</h1>
                        </div></Col>
                        <Col span={6} className="txt-right">
                            laoxie <Button type="link">退出</Button>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['/home']}
                            defaultOpenKeys={['/class']}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={this.changeMenu}
                        >
                            {
                                menu.map(item => {
                                    if (item.children) {
                                        return <SubMenu key={item.path} icon={item.icon} title={item.text}>
                                            {
                                                item.children.map(it => {

                                                    return <Menu.Item key={item.path + it.path}>{it.text}</Menu.Item>
                                                })
                                            }
                                        </SubMenu>
                                    } else {
                                        return <Menu.Item key={item.path} icon={item.icon}>{item.text}</Menu.Item>

                                    }
                                })
                            }

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route path="/home" component={Home}>
                                    {/* <Home></Home> */}
                                </Route>
                                <Route path="/class" component={Class}/>
                                <Route path="/student/:type" component={Student}/>
                                <Route path="/subject" component={Subject}/>
                                <Redirect from="/" to="/home" exact />
                                
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

const NewApp = withRouter(App)

export default NewApp;