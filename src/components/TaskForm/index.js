import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class extends Component {
  static propTypes = {
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onSave: PropTypes.func.isRequired,
  }

  handleSubmit (event) {
    event.preventDefault()

    const name = this.textInput.value

    if (name.trim()) {
      this.textInput.value = ''
      this.props.onSave(name)
    }
  }

  render () {
    const { value, onBlur } = this.props

    return (
      <form className="component-task-form" onSubmit={::this.handleSubmit}>
        <input autoFocus ref={(input) => {
          this.textInput = input
        }} type="text" defaultValue={value} onBlur={onBlur}
        />
        <button type="submit">Save</button>
      </form>
    )
  }
}
