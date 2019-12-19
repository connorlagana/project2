import React from 'react'
import logo from './images/sendit_logo.png'
import NavBar from './NavBar'

const Header = () => {
  return (
    <header>
      <img
        src={logo}
        id="logo"
      />
      <h2 id="title">sendit</h2>
      <NavBar />
    </header>
  )
}

export default Header