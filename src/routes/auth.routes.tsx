import React from 'react'

import SignIn from '../pages/SignIn'

import Register from '../pages/Register'

import { BrowserRouter, Route, Switch/*, Redirect*/ } from 'react-router-dom'

const AuthRoutes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={Register} />
        </Switch>
    </BrowserRouter>
)

export default AuthRoutes