import React from 'react'
import PropTypes from 'prop-types'

import style from './layout.module.css'
import './global-styles.css'

const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <div>
        <main>{children}</main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
