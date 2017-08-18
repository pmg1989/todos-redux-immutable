import {createSelector} from 'reselect'

const taskSelector = state => state.get('list')

const taskFilterSelector = state => state.get('filter')

const taskVisibleSelector = createSelector([taskSelector, taskFilterSelector], (tasks, filters) => {
  switch (filters) {
    case 'All': return tasks
    case 'Active': return tasks.filter(t => !t.get('done'))
    case 'Completed': return tasks.filter(t => t.get('done'))
  }
})

const doneTaskSelector = createSelector([taskSelector], tasks => {
  return tasks.filter(task => task.get('done'))
})

export default state => {
  return {
    tasks: taskVisibleSelector(state.get('tasks')),
    filters: taskFilterSelector(state.get('tasks')),
    taskCount: taskSelector(state.get('tasks')).count(),
    doneTaskCount: doneTaskSelector(state.get('tasks')).count()
  }
}
