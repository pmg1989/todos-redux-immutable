import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import HocForm from '../components/hoc-form'
// import { IIHOC as DebuggerHOC, stringify, getDisplayName } from './ii_debug'


class Demo2 extends React.Component {
  static propTypes = {
    fields: PropTypes.func.isRequired,
    getFields: PropTypes.func.isRequired,
  }

  submit (e) {
    e.preventDefault()
    console.log(this.props.getFields())
  }

  render () {
    const { fields, getFields } = this.props
    console.log(getFields())
    return (
      <div>
        <h2>
          Wrapped Component
        </h2>
        <p>
          Props
        </p>
        {/* <pre>{stringify(this.props)}</pre> */}
        <form onSubmit={this.submit.bind(this)}>
          <label htmlFor="name">
            Name：
            <input type="text" id="name" {...fields('name')} />
          </label><br />
          <label htmlFor="name">
            Email：
            <input type="email" id="name" {...fields('email')} />
          </label><br />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

// export default HocForm(Example)
export default compose(
  // 这些都是单参数的高阶组件
  // DebuggerHOC,
  HocForm
)(Demo2)
