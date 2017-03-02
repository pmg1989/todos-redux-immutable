import React, {PropTypes, Component} from 'react'
import Immutable from 'immutable'
import TaskItem from '../TaskItem'

export default class extends Component {
  static propTypes = {
    tasks: PropTypes.instanceOf(Immutable.List).isRequired
  }

  render() {
    const {tasks, onTaskDone, onTaskUndone, onTaskRemove} = this.props

    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.get('id')}>
            <TaskItem
              done={task.get('done')}
              id={task.get('id')}
              name={task.get('name')}
              onTaskDone={onTaskDone}
              onTaskUndone={onTaskUndone}
              onTaskRemove={onTaskRemove}
            />
          </li>
        ))}
      </ul>
    )
  }
}
