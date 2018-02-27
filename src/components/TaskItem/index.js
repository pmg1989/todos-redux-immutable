import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TaskForm from '../TaskForm'

export default class extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    onTaskDone: PropTypes.func.isRequired,
    onTaskUndone: PropTypes.func.isRequired,
    onTaskRemove: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
  }

  state = {
    isEdit: false,
  }

  changeEditState () {
    this.setState(({ isEdit }) => ({
      isEdit: !isEdit,
    }))
  }

  handleTaskEdit (name) {
    const { id, onTaskEdit } = this.props
    this.changeEditState()
    onTaskEdit({ id, name })
  }

  handleToggleStatus () {
    const { id, done, onTaskDone, onTaskUndone } = this.props

    if (done) {
      onTaskUndone(id)
    } else {
      onTaskDone(id)
    }
  }

  handleRemoveStatus () {
    const { id, onTaskRemove } = this.props
    onTaskRemove(id)
  }

  render () {
    const { name, done } = this.props
    const { isEdit } = this.state

    const componentClassName = classNames('component-todo-item', { 'status-done': done })

    return (
      <div className={componentClassName}>
        {isEdit ?
          <TaskForm onSave={::this.handleTaskEdit} onBlur={::this.changeEditState} value={name} /> :
          <div>
            <span className="name" onDoubleClick={::this.changeEditState}
              style={{
                textDecoration: done
                 ? 'line-through'
                 : 'none',
              }}
            >{name}
            </span>
            <div className="remove-status" onClick={::this.handleRemoveStatus} />
            <div className="toggle-status" onClick={::this.handleToggleStatus} />
          </div>
        }
      </div>
    )
  }
}
