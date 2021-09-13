import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import List from './List'
import Add from './Add'
import Edit from './Edit'
import { withAuth,withLogin } from '../../utils/hoc'

//ES7装饰器
//@withLogin
class Class extends React.Component{
    componentDidMount(){
        console.log('Class.componentDidMount')
    }
    render(){
        console.log('Class.props',this.props)
        const {path}=this.props.match
        return (
            <div>
                Class
            <Switch>
                <Route path={path + "/list"} component={List} />
                <Route path={path + "/add"} component={Add} />
                <Route path={path + "/eidt/:id"} component={Edit} />
                <Redirect from={path + ""} to={path + "/list"} exact />
            </Switch>
            </div>
        )
    }
}
export default Class;