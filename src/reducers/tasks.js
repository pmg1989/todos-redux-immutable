import {createReducer} from 'redux-create-reducer'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  list: [
    {
      done: true,
      id: 1,
      name: 'foo'
    }, {
      done: false,
      id: 2,
      name: 'bar'
    }, {
      done: false,
      id: 3,
      name: 'baz'
    }
  ],
  filter: 'ALL'
})

const TASK_ADD = (state, action) => {
  const index = state.get('list').reduce((maxId, item) => Math.max(item.get('id'), maxId), -1)
  return state.mergeIn([
    'list', index
  ], {
    done: false,
    id: index + 1,
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

export default createReducer(initialState, {
  TASK_ADD,
  TASK_DONE,
  TASK_UNDONE,
  TASK_REMOVE
})
