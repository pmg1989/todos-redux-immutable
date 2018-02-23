import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FILTER_TITLES } from '../../constants'

class TaskStats extends Component {
  static propTypes = {
    taskCount: PropTypes.number.isRequired,
    doneTaskCount: PropTypes.number.isRequired,
    filters: PropTypes.string.isRequired,
    onTaskFilter: PropTypes.func.isRequired,
  }

  static renderCapitalize (str) {
    return str.charAt(0) + str.slice(1).toLowerCase()
  }

  handleTaskFilter (filters) {
    const { onTaskFilter } = this.props
    onTaskFilter(filters)
  }

  render () {
    const { taskCount, doneTaskCount, filters } = this.props
    return (
      <div className="component-task-stats">
        <ul className="filter-list">
          {Object.keys(FILTER_TITLES).map((item, key) => (
            <li key={key}>
              <span className={classNames({ active: filters === FILTER_TITLES[item] })} onClick={() => this.handleTaskFilter(FILTER_TITLES[item])}>
                {TaskStats.renderCapitalize(FILTER_TITLES[item])}
              </span>
            </li>
          ))}
        </ul>
        <dl>
          <dt>Total Tasks count:</dt>
          <dd>{taskCount}</dd>
          <dt>Active count:</dt>
          <dd>{taskCount - doneTaskCount}</dd>
          <dt>Completed count:</dt>
          <dd>{doneTaskCount}</dd>
          <dt style={{ marginTop: 20 }}><i style={{ color: 'red' }}>*</i> double click the task item to edit the task</dt>
          <dd />
        </dl>
      </div>
    )
  }
}

export default TaskStats
