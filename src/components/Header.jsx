import React from 'react'

import logo from '../images/logo.png'

import '../css/header.css'
import Equipes from './equipes'

const Header = props => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo Marvel" />
      </div>
      
      <div className="equipe">        
        <Equipes />
      </div>
    </header>
  )
}

export default Header