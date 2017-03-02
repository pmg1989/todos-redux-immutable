import _ from 'lodash'
import {createReducer} from 'redux-create-reducer'
import Immutable from 'immutable'

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

const TASK_ADD = (state, action) => {
  const index = state.get('list').size //state.get('list').reduce((maxId, item) => Math.max(item.get('id'), maxId), -1)
  return state.mergeIn([
    'list', index
  ], {
    done: false,
    id: _.uniqueId(),
    name: action.data.name
  })
}

const TASK_DONE = (state, action) => {
  const index = state.get('list').findIndex((item) => item.get('id') === action.data.id)
  return state.setIn([
    "list", index, 'done'
  ], true)
}

const TASK_UNDONE = (state, action) => {
  const index = state.get('list').findIndex((item) => item.get('id') === action.data.id)
  return state.setIn([
    "list", index, 'done'
  ], false)
}

const TASK_REMOVE = (state, action) => {
  const index = state.get('list').findIndex((item) => item.get('id') === action.data.id)
  return state.deleteIn(['list', index])
}

const TASK_FILTER = (state, action) => {
  return state.setIn(['filter'], action.data.filter)
}

export default createReducer(initialState, {
  TASK_ADD,
  TASK_DONE,
  TASK_UNDONE,
  TASK_REMOVE,
  TASK_FILTER
})
