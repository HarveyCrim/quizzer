import React, { useEffect, useReducer } from 'react'
import "./Header.scss"
function Header() {
  return (
    <div className = "header-comp">
      <img id = "react-img" src = "./structure.png" />
      <h1 id = "header-heading">The React Quiz !</h1>
    </div>
  )
}

export default Header
