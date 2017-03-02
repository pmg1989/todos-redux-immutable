import React, {PropTypes, Component} from 'react'

export default class extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const name = this.textInput.value

    if (!!name.trim()) {
      this.textInput.value = ''
      this.props.onSave(name)
    }
  }

  render() {
    return (
      <form className='component-task-form' onSubmit={this.handleSubmit}>
        <input ref={(input) => {
          this.textInput = input
        }} type='text'/>
        <button type='submit'>Save</button>
      </form>
    )
  }
}
