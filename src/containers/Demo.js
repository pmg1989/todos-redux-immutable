import React, { Component } from 'react'
import styles from './Demo.less'
console.log(styles);
export default class Demo extends Component {

  render() {
    return (
      <div>
        <div className={styles.box}>
          i am demo
        </div>
        <div className='box'>
          i am demo
        </div>
      </div>
    )
  }
}
