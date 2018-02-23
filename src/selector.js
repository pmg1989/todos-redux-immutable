import { createSelector } from 'reselect'
import { FILTER_TITLES } from './constants'

const taskSelector = state => state.get('list')

const taskFilterSelector = state => state.get('filter')

const { ALL, ACTIVE, COMPLETED } = FILTER_TITLES

const taskVisibleSelector = createSelector([taskSelector, taskFilterSelector], (tasks, filters) => {
  switch (filters) {
    case ALL: return tasks
    case ACTIVE: return tasks.filter(t => !t.get('done'))
    case COMPLETED: return tasks.filter(t => t.get('done'))
    default: return tasks
  }
})

const doneTaskSelector = createSelector([taskSelector], (tasks) => {
  return tasks.filter(task => task.get('done'))
})

export default (state) => {
  return {
    tasks: taskVisibleSelector(state.get('tasks')),
    filters: taskFilterSelector(state.get('tasks')),
    taskCount: taskSelector(state.get('tasks')).count(),
    doneTaskCount: doneTaskSelector(state.get('tasks')).count(),
  }
}
