import {createSelector} from 'reselect'

const taskSelector = (state) => state.getIn(['tasks', 'list'])

const doneTaskSelector = createSelector([taskSelector], (tasks) => {
  return tasks.filter((task) => task.get('done'))
})

export default(state) => {
  return {
    doneTaskCount: doneTaskSelector(state).count(),
    taskCount: taskSelector(state).count(),
    tasks: taskSelector(state)
  }
}
