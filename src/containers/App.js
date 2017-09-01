import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import TaskStats from '../components/TaskStats'
import selector from '../selector'
import {taskAdd, taskDone, taskUndone, taskRemove, taskEdit, taskFilter} from '../actions'
import './style.css'

const mapDispatchToProps = dispatch => ({
  onTaskAdd: bindActionCreators(taskAdd, dispatch),
  onTaskDone: bindActionCreators(taskDone, dispatch),
  onTaskUndone: bindActionCreators(taskUndone, dispatch),
  onTaskRemove: bindActionCreators(taskRemove, dispatch),
  onTaskEdit: bindActionCreators(taskEdit, dispatch),
  onTaskFilter: bindActionCreators(taskFilter, dispatch)
})

@connect(selector, mapDispatchToProps)

export default class App extends Component {

  render() {
    const { tasks, taskCount, doneTaskCount, filters, onTaskAdd, onTaskDone, onTaskUndone, onTaskRemove, onTaskEdit, onTaskFilter } = this.props

    const taskListProps = {
      tasks,
      onTaskEdit,
      onTaskDone,
      onTaskUndone,
      onTaskRemove
    }

    const taskStatsProps = {
      filters,
      taskCount,
      doneTaskCount,
      onTaskFilter
    }

    return (
      <div id='viewport'>
        <TaskForm onSave={onTaskAdd}/>
        <TaskList {...taskListProps}/>
        <TaskStats {...taskStatsProps}/>
        {this.props.children}
      </div>
    )
  }
}
