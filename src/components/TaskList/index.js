import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import TaskItem from '../TaskItem'

const TaskList = ({ tasks, ...onProps }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.get('id')}>
          <TaskItem
            id={task.get('id')}
            name={task.get('name')}
            done={task.get('done')}
            {...onProps}
          />
        </li>
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.instanceOf(Immutable.List).isRequired,
  onTaskDone: PropTypes.func.isRequired,
  onTaskUndone: PropTypes.func.isRequired,
  onTaskRemove: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
}

export default TaskList
