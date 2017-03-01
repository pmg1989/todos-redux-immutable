import {
  createSelector
} from 'reselect';

const taskSelector = (state) => {
  return state.getIn(['tasks', 'list']);
};

const doneTaskSelector = createSelector([taskSelector], (tasks) => {
  return tasks.filter((task) => {
    return task.get('done');
  });
});

export default (state) => {
  return {
    doneTaskCount: doneTaskSelector(state).count(),
    taskCount: taskSelector(state).count(),
    tasks: taskSelector(state)
  };
};
