import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

const Index = ({ children }) => {
  return (
    <div>
      <p>
        <strong>App</strong>&nbsp;
        <Link to="/">Home</Link>&nbsp;
        <Link to="/demo">demo</Link>&nbsp;
        <Link to="/demo2">demo2</Link>
      </p>
      {children}
    </div>
  )
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Index
