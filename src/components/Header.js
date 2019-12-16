import React from 'react'
import logo from './images/sendit_logo.png'

const Header = () => {
  return (
    <header>
      <img
        src={logo}
        id="logo"
      />
      <h2 id="title">sendit</h2>
      <h3 id="currentPage">Current Page: s/all</h3>
    </header>
  )
}

export default Header