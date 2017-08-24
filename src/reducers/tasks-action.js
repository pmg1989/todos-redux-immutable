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

const $filter = Immutable.fromJS(ALL)

const filter = createReducer($filter, {
  [TASK_FILTER](state, { payload }) {
    return payload
  }
})

export default combineReducers({
  list,
  filter
})
