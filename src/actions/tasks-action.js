import { createAction } from 'redux-actions'
import {TASK_ADD, TASK_DONE, TASK_UNDONE, TASK_REMOVE, TASK_EDIT, TASK_FILTER} from '../constants'

export const taskAdd = createAction(TASK_ADD)

export const taskDone = createAction(TASK_DONE)

export const taskUndone = createAction(TASK_UNDONE)

export const taskRemove = createAction(TASK_REMOVE)

export const taskEdit = createAction(TASK_EDIT)

export const taskFilter = createAction(TASK_FILTER)
