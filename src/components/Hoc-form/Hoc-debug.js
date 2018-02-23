import React from 'react'
import { stringify, getDisplayName } from './'

export default function hocDebug (WrappedComponent) {
  class HocDebug extends WrappedComponent {
    static displayName = `HocDebug(${getDisplayName(WrappedComponent)})`

    render () {
      return (
        <div>
          <h2>HOC Debugger Component</h2>
          {/* <p>Props</p>
          <pre>{stringify(this.props)}</pre> */}
          <p>State</p>
          <pre>{stringify(this.state)}</pre>
          {super.render()}
        </div>
      )
    }
  }
  return HocDebug
}
