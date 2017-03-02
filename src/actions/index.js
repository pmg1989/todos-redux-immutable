import {TASK_ADD, TASK_DONE, TASK_UNDONE, TASK_REMOVE, TASK_FILTER} from '../constants'

export const taskAdd = name => ({name, type: TASK_ADD})

export const taskDone = id => ({id, type: TASK_DONE})

export const taskUndone = id => ({id, type: TASK_UNDONE})

export const taskRemove = id => ({id, type: TASK_REMOVE})

export const taskFilter = filters => ({filters, type: TASK_FILTER})
