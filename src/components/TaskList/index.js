import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import TaskItem from '../TaskItem'

export default class extends Component {
  static propTypes = {
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
    onTaskDone: PropTypes.func.isRequired,
    onTaskUndone: PropTypes.func.isRequired,
    onTaskRemove: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired
  }

  render() {
    const {tasks, ...onProps} = this.props

    return (
      <ul>
        {tasks.map((task) => (
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
}
