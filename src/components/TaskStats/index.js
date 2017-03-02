import React, {PropTypes, Component} from 'react'
import classNames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

export default class extends Component {
  static propTypes = {
    taskCount: PropTypes.number.isRequired,
    undoneTaskCount: PropTypes.number.isRequired,
    filters: PropTypes.string.isRequired,
    onTaskFilter: PropTypes.func.isRequired
  }

  handleTaskFilter(filters) {
    const {onTaskFilter} = this.props
    onTaskFilter(filters)
  }

  render() {
    const {taskCount, undoneTaskCount, filters} = this.props
    return (
      <div className='component-task-stats'>
        <ul className='filter-list'>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map((item, key) => (
            <li key={key}>
              <span className={classNames({'active': filters === FILTER_TITLES[item]})} onClick={() => this.handleTaskFilter(FILTER_TITLES[item])}>
                {FILTER_TITLES[item]}
              </span>
            </li>
          ))}
        </ul>
        <dl>
          <dt>Total Tasks count:</dt>
          <dd>{taskCount}</dd>
          <dt>Active count:</dt>
          <dd>{undoneTaskCount}</dd>
          <dt>Completed count:</dt>
          <dd>{taskCount - undoneTaskCount}</dd>
          <dt style={{marginTop: 20}}><i style={{color: 'red'}}>*</i> double click the task item to edit the task</dt>
          <dd></dd>
        </dl>
      </div>
    )
  }
}
