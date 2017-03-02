import _ from 'lodash'
import {createReducer} from 'redux-create-reducer'
import Immutable from 'immutable'
import {TASK_ADD, TASK_DONE, TASK_UNDONE, TASK_REMOVE, TASK_FILTER} from '../constants'

const initialState = Immutable.fromJS({
  list: [
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
  ],
  filter: 'All'
})

export default createReducer(initialState, {

  [TASK_ADD](state, action) {
    const index = state.get('list').size //state.get('list').reduce((maxId, item) => Math.max(item.get('id'), maxId), -1)
    return state.mergeIn(['list', index], {
      done: false,
      id: _.uniqueId(),
      name: action.name
    })
  },

  [TASK_DONE](state, action) {
    const index = state.get('list').findIndex((item) => item.get('id') === action.id)
    return state.setIn(["list", index, 'done'], true)
  },

  [TASK_UNDONE](state, action) {
    const index = state.get('list').findIndex((item) => item.get('id') === action.id)
    return state.setIn(["list", index, 'done'], false)
  },

  [TASK_REMOVE](state, action) {
    const index = state.get('list').findIndex((item) => item.get('id') === action.id)
    return state.deleteIn(['list', index])
  },

  [TASK_FILTER](state, action) {
    return state.setIn(['filter'], action.filters)
  }
})
