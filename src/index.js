import React from 'react'
import {render} from 'react-dom';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import App from './App'

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;

render(
    <Router>
        <App/>
        {/* <Route component={App} /> */}
    </Router>
    ,
    document.querySelector('#app')
)