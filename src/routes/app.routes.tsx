import React from 'react'

import Home from '../pages/Home'

import Header from '../components/Header'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const AppRoutes: React.FC = () => (
    <BrowserRouter>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </BrowserRouter>
)

export default AppRoutes