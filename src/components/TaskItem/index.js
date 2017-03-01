import React from 'react'
import classNames from 'classnames'

export default class extends React.Component {
  static propTypes = {
    done: React.PropTypes.bool.isRequired,
    id: React.PropTypes.number.isRequired,
    onTaskDone: React.PropTypes.func.isRequired,
    onTaskUndone: React.PropTypes.func.isRequired,
    onTaskRemove: React.PropTypes.func.isRequired
  }

  handleToggleStatus = () => {
    const {id, done, onTaskDone, onTaskUndone} = this.props

    if (done) {
      onTaskUndone(id)
    } else {
      onTaskDone(id)
    }
  }

  handleRemoveStatus = () => {
    const {id, onTaskRemove} = this.props
    onTaskRemove(id)
  }

  render() {
    const {name, done} = this.props

    const componentClassName = classNames('component-todo-item', {'status-done': done})

    return (
      <div className={componentClassName}>
        <span className='name'
          style={{
            textDecoration: done
            ? 'line-through'
            : 'none'
          }}>{name}
        </span>
        <div className='remove-status' onClick={this.handleRemoveStatus}/>
        <div className='toggle-status' onClick={this.handleToggleStatus}/>
      </div>
    )
  }
}
