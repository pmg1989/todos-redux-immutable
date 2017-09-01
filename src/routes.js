import React from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router'

/* containers */
import App from './containers/App'
import Demo from './containers/Demo'
import Demo2 from './containers/Demo2'


const routes = (
  <Route path='/' component={App}>
    <Route path='/demo1' component={Demo} />
    <Route path='/demo2' component={Demo2} />
  </Route>
)

export default routes
