import React from 'react'

import {withUser} from '../utils/hoc'

function Login(){
    return (
        <div>
            Login
        </div>
    )
}
export default withUser(Login);