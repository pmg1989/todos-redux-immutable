import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { TASK_ADD, TASK_DONE, TASK_UNDONE, TASK_REMOVE, TASK_EDIT, TASK_FILTER, FILTER_TITLES, FETCH_TASK_LIST } from '../constants'

const { ALL } = FILTER_TITLES

const $list = Immutable.fromJS([])

const list = createReducer($list, {
  [FETCH_TASK_LIST] (state, action) {
    return state.merge(action.list)
  },

  [TASK_ADD] (state, action) {
    const index = state.size
    const id = state.reduce((maxId, item) => Math.max(item.get('id'), maxId), -1)
    return state.mergeIn([index], {
      done: false,
      id: id + 1,
      name: action.name,
    })
  },

  [TASK_DONE] (state, action) {
    const index = state.findIndex(item => item.get('id') === action.id)
    return state.setIn([index, 'done'], true)
  },

  [TASK_UNDONE] (state, action) {
    const index = state.findIndex(item => item.get('id') === action.id)
    return state.setIn([index, 'done'], false)
  },

  [TASK_REMOVE] (state, action) {
    const index = state.findIndex(item => item.get('id') === action.id)
    return state.deleteIn([index])
  },

  [TASK_EDIT] (state, action) {
    const index = state.findIndex(item => item.get('id') === action.id)
    return state.setIn([index, 'name'], action.name)
  },
})

const $filter = Immutable.fromJS(ALL)

const filter = createReducer($filter, {
  [TASK_FILTER] (state, action) {
    return action.filter
  },
})

export default combineReducers({
  list,
  filter,
})
