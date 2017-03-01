import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import TaskStats from '../components/TaskStats'
import selector from '../selector'
import {taskAdd, taskDone, taskUndone, taskRemove} from '../actions'
import './style.css'

const mapDispatchToProps = dispatch => ({
  taskAdd: bindActionCreators(taskAdd, dispatch),
  taskDone: bindActionCreators(taskDone, dispatch),
  taskUndone: bindActionCreators(taskUndone, dispatch),
  taskRemove: bindActionCreators(taskRemove, dispatch)
})

@connect(selector, mapDispatchToProps)

export default class App extends React.Component {

  render() {
    const {tasks, taskCount, doneTaskCount, taskAdd, taskDone, taskUndone, taskRemove} = this.props

    return (
      <div id='viewport'>
        <TaskForm onSave={taskAdd}/>
        <TaskList onTaskDone={taskDone} onTaskUndone={taskUndone} onTaskRemove={taskRemove} tasks={tasks}/>
        <TaskStats taskCount={taskCount} undoneTaskCount={taskCount - doneTaskCount}/>
      </div>
    )
  }
}
