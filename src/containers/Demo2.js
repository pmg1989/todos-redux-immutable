import React from 'react'
import { compose } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { hocForm, hocDebug, stringify } from '../components/Hoc-form'


class Demo2 extends React.Component {
  static propTypes = {
    fields: PropTypes.func.isRequired,
    getFields: PropTypes.func.isRequired,
  }

  componentDidMount () {
    console.log(this.props)
  }

  submit (e) {
    e.preventDefault()
    console.log(this.props.getFields())
  }

  render () {
    const { fields } = this.props

    return (
      <div>
        <h4>Wrapped Component</h4>
        <p>Props fields</p>
        <pre>{stringify(this.props.getFields())}</pre>
        <form onSubmit={::this.submit}>
          <label htmlFor="name">
            Name：
            <input type="text" id="name" {...fields('name', {
              initialValue: 'john',
            })}
            />
          </label><br />
          <label htmlFor="name">
            Email：
            <input type="text" id="name" {...fields('email')} />
          </label><br />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default compose(
  // 单参数的高阶组件
  // connect(),
  hocDebug,
  hocForm,
)(Demo2)
