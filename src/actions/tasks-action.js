import { createActions } from 'redux-actions'
import { TASK_ADD, TASK_DONE, TASK_UNDONE, TASK_REMOVE, TASK_EDIT, TASK_FILTER } from '../constants'

export const {
  taskAdd,
  taskDone,
  taskUndone,
  taskRemove,
  taskEdit,
  taskFilter,
} = createActions({
  [TASK_ADD]: name => ({ name }),
  [TASK_DONE]: id => ({ id }),
  [TASK_UNDONE]: id => ({ id }),
  [TASK_REMOVE]: id => ({ id }),
  [TASK_EDIT]: ({ id, name }) => ({ id, name }),
  [TASK_FILTER]: filter => ({ filter }),
})
