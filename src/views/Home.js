import React from 'react'

import {withUser} from '../utils/hoc'

function Home(props){
    console.log('Home.props',props)
    // let userInfo = localStorage.getItem('userInfo');// null
    // try{
    //     userInfo = JSON.parse(userInfo) || {}
    // }catch(err){
    //     userInfo = {}
    // }
    return (
        <div>
            Home
        </div>
    )
}
Home = withUser(Home)
Home=withStorage('userInfo')(Home)
export default Home;