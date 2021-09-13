import React from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { withStorage } from './utils/hoc';

import Login from './views/Login'
import Manage from './views/Manage'


import 'antd/dist/antd.css';
import './App.scss'

@withStorage('userInfo')
@withRouter
class App extends React.Component {
    componentDidMount(){
        this.props.history.listen((location)=>{
            // 路由改变时会触发这里的方法
            console.log('listen',location)
        })
    }
    render() {
        let {userInfo} = this.props
        if(!userInfo){
            userInfo = {}
        }
        const isLogin = !!userInfo._id
        return (

            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/manage" component={Manage} />
                <Redirect from="/" to="/login" exact />
            </Switch>

        )
    }
}

export default App;