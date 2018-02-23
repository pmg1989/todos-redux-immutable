import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutable'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import reducers from './reducers'

const reducer = combineReducers(reducers)

const store = createStore(reducer,
  Immutable.Map({}),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
