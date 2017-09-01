import React, {Component} from 'react'
import {Link} from 'react-router'

export default class extends Component {
  render () {
    return (
    <div>
      <p>
        <strong>App</strong>&nbsp;
        <Link to="/">Home</Link>&nbsp;
        <Link to="/demo">demo</Link>&nbsp;
        <Link to="/demo2">demo2</Link>
      </p>
      {this.props.children}
    </div>)
  }
}
