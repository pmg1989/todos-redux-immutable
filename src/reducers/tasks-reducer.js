import _ from 'lodash'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {combineReducers} from 'redux-immutable'
import {TASK_ADD, TASK_DONE, TASK_UNDONE, TASK_REMOVE,TASK_EDIT , TASK_FILTER, FILTER_TITLES} from '../constants'

const {ALL} = FILTER_TITLES

const $list = Immutable.fromJS([
  {
    done: true,
    id: _.uniqueId(),
    name: 'foo'
  }, {
    done: false,
    id: _.uniqueId(),
    name: 'bar'
  }, {
    done: false,
    id: _.uniqueId(),
    name: 'baz'
  }
])

const list = handleActions({
  [TASK_ADD](state, {payload}) {
    const index = state.size //state.reduce((maxId, item) => Math.max(item.get('id'), maxId), -1)
    return state.mergeIn([index], {done: false, id: _.uniqueId(), name: payload})
  },

  [TASK_DONE](state, {payload}) {
    const index = state.findIndex((item) => item.get('id') === payload)
    return state.setIn([index, 'done'], true)
  },

  [TASK_UNDONE](state, {payload}) {
    const index = state.findIndex((item) => item.get('id') === payload)
    return state.setIn([index, 'done'], false)
  },

  [TASK_EDIT](state, {payload}) {
    const index = state.findIndex((item) => item.get('id') === payload.id)
    return state.setIn([index, 'name'], payload.name)
  },

  [TASK_REMOVE](state, action) {
    const index = state.findIndex((item) => item.get('id') === action.id)
    return state.deleteIn([index])
  },
}, $list)

const $filter = Immutable.fromJS(ALL)

const filter = handleActions({
  [TASK_FILTER](state, {payload}) {
    return payload
  }
}, $filter)

export default combineReducers({
  list,
  filter
})
