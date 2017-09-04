import React, { Component } from 'react'
import styles from './Demo.less'

export default class Demo extends Component {

  render() {
    return (
      <div>
        <div className={styles.box}>
          <span>
            i am demo
          </span>
          <span>
            i am demo
          </span>
        </div>
      </div>
    )
  }
}
