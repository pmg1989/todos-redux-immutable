import _ from 'lodash'
import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { TASK_ADD, TASK_DONE, TASK_UNDONE, TASK_REMOVE, TASK_EDIT, TASK_FILTER, FILTER_TITLES } from '../constants'

const { ALL } = FILTER_TITLES

const $list = Immutable.fromJS([
  {
    done: true,
    id: _.uniqueId(),
    name: 'foo',
  }, {
    done: false,
    id: _.uniqueId(),
    name: 'bar',
  }, {
    done: false,
    id: _.uniqueId(),
    name: 'baz',
  },
])

const list = handleActions({
  [TASK_ADD] (state, { payload: { name } }) {
    const index = state.size // state.reduce((maxId, item) => Math.max(item.get('id'), maxId), -1)
    return state.mergeIn([index], { done: false, id: _.uniqueId(), name })
  },

  [TASK_DONE] (state, { payload: { id } }) {
    const index = state.findIndex(item => item.get('id') === id)
    return state.setIn([index, 'done'], true)
  },

  [TASK_UNDONE] (state, { payload: { id } }) {
    const index = state.findIndex(item => item.get('id') === id)
    return state.setIn([index, 'done'], false)
  },

  [TASK_EDIT] (state, { payload: { id, name } }) {
    const index = state.findIndex(item => item.get('id') === id)
    return state.setIn([index, 'name'], name)
  },

  [TASK_REMOVE] (state, { payload: { id } }) {
    const index = state.findIndex(item => item.get('id') === id)
    return state.deleteIn([index])
  },
}, $list)

const $filter = Immutable.fromJS(ALL)

const filter = handleActions({
  [TASK_FILTER] (state, { payload }) {
    return payload.filter
  },
}, $filter)

export default combineReducers({
  list,
  filter,
})
