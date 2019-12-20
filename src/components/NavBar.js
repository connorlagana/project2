import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="nav">
      <ul>
        <Link to={`/`}>
          <li>Home</li>
        </Link>
      </ul >
    </div >
  )
}

export default NavBar