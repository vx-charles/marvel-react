import React from 'react'
import logo from '../images/logo.png'

import '../css/header.css'
import Equipes from './equipes'

export function Header() {
  
  function showEquipes() {
    document.querySelector(".selected-heroes").classList.add('active')
    document.querySelector(".ver-lista").classList.add("d-none")
  }

  return (
    <header>
      <div className="row">
        <div className="col-12 col-md-6 logo">
          <img src={logo} alt="Logo Marvel" />
        </div>
        <div className="col-12 col-md-6 equipe">
          <div className="vazio">Equipe vazia</div>
          <div className="ver-lista d-none" onClick={showEquipes}>Ver Equipes</div>
          <Equipes />
        </div>
      </div>
    </header>
  )
}