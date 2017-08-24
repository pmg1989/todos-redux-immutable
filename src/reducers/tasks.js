import _ from 'lodash'
import {createReducer} from 'redux-create-reducer'
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

const list = createReducer($list, {
  [TASK_ADD](state, action) {
    const index = state.size //state.reduce((maxId, item) => Math.max(item.get('id'), maxId), -1)
    return state.mergeIn([index], {
      done: false,
      id: _.uniqueId(),
      name: action.name
    })
  },

  [TASK_DONE](state, action) {
    const index = state.findIndex((item) => item.get('id') === action.id)
    return state.setIn([index, 'done'], true)
  },

  [TASK_UNDONE](state, action) {
    const index = state.findIndex((item) => item.get('id') === action.id)
    return state.setIn([index, 'done'], false)
  },

  [TASK_REMOVE](state, action) {
    const index = state.findIndex((item) => item.get('id') === action.id)
    return state.deleteIn([index])
  },

  [TASK_EDIT](state, action) {
    const index = state.findIndex((item) => item.get('id') === action.id)
    return state.setIn([index, 'name'], action.name)
  },
})

const $filter = Immutable.fromJS(ALL)

const filter = createReducer($filter, {
  [TASK_FILTER](state, action) {
    return action.filter
  }
})

export default combineReducers({
  list,
  filter
})
