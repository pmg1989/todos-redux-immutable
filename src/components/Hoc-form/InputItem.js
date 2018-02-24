import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './InputItem.less'

class InputItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  handleFocus () {
    this.$el.focus()
  }

  render () {
    const { label, ...props } = this.props
    const inputProps = {
      ...props,
      ref: (c) => {
        this.$el = c
      },
    }

    return (
      <label htmlFor={label} className={styles.item}>
        <span className={styles.label} onClick={::this.handleFocus}>{label}：</span>
        <input type="text" {...inputProps} />
      </label>
    )
  }
}

export default InputItem
