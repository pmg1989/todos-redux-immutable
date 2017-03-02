import {createSelector} from 'reselect'

const taskSelector = state => state.getIn(['tasks', 'list'])

const taskFilterSelector = state => state.getIn(['tasks', 'filter'])

const taskVisibleSelector = createSelector([taskSelector, taskFilterSelector], (tasks, filters) => {
  switch (filters) {
    case 'All':
      return tasks
    case 'Active':
      return tasks.filter(t => !t.get('done'))
    case 'Completed':
      return tasks.filter(t => t.get('done'))
  }
})

const doneTaskSelector = createSelector([taskSelector], tasks => {
  return tasks.filter(task => task.get('done'))
})

export default state => {
  return {
    doneTaskCount: doneTaskSelector(state).count(),
    taskCount: taskSelector(state).count(),
    tasks: taskVisibleSelector(state),
    filters: taskFilterSelector(state)
  }
}
