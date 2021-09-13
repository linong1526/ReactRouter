import React from 'react'

export function withUser(InputComponent){
    // 接收组件InputComponent作为参数返回一个新的组件OutputComponent
    return function OutputComponent(props){
        // console.log('OutputComponent',props)
        let userInfo = localStorage.getItem('userInfo');
        try{
            userInfo = JSON.parse(userInfo) || {}
        }catch(err){
            userInfo = {}
        }
        return (
            // obj = {a:10,b:20}
            <InputComponent {...props} user={userInfo}>
                {props.children}
            </InputComponent>
        )
    }
}

export function withStorage(){
    // 编写带啊没
}

// withStorage('userInfo')
// withStorage('token')