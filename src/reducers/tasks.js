import _ from 'lodash';
import {
  createReducer
} from 'redux-create-reducer';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({list: [
  {
    done: true,
    id: _.uniqueId(),
    name: 'foo'
  },
  {
    done: false,
    id: _.uniqueId(),
    name: 'bar'
  },
  {
    done: false,
    id: _.uniqueId(),
    name: 'baz'
  }
], filter: 'ALL'});

/**
 * @param {Immutable.List} domain
 * @param {Object} action
 * @param {string} action.data.name
 * @returns {Immutable.List}
 */
const TASK_ADD = (state, action) => {
  const index = state.get('list').reduce((maxId, item) => Math.max(item.get('id'), maxId), -1)
  return state.mergeIn(['list', index], {
      done: false,
      id: _.uniqueId(),
      name: action.data.name
    }
  )
};

/**
 * @param {Immutable.List} domain
 * @param {Object} action
 * @param {number} action.data.id
 * @returns {Immutable.List}
 */
const TASK_DONE = (state, action) => {
  const index = state.get('list').findIndex((item) => item.get('id') === action.data.id);
  return state.setIn(["list", index, 'done'], true)
};

/**
 * @param {Immutable.List} domain
 * @param {Object} action
 * @param {number} action.data.id
 * @returns {Immutable.List}
 */
const TASK_UNDONE = (state, action) => {
  const index = state.get('list').findIndex((item) => item.get('id') === action.data.id);
  return state.setIn(["list", index, 'done'], false)
};

export default createReducer(initialState, {
  TASK_ADD,
  TASK_DONE,
  TASK_UNDONE
});
