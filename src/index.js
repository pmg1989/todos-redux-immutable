import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'

import routes from './routes'
import store from './store'

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
      return state.get('routing').toJS()
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
