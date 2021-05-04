import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectedEquipe } from '../store/actions/characterActions'

import '../css/equipes.css'
import close from '../images/cancel.svg'

const Equipes = props => {

  function closeEquipe() {
    // document.getElementsByClassName("selected-heroes")[0].classList.add('active')
    document.querySelector(".selected-heroes").classList.remove('active')
    document.querySelector(".ver-lista").classList.remove("d-none")
    
  }  

  return (
    <div className="selected-heroes">

      {/* <div className="items">
        <figure className="circle-img">
        
        </figure>
        <span>teste</span>
      </div> */}

 
      <div className="close-equipe">
        <img src={close} alt="Fechar" width="30" onClick={closeEquipe} />
      </div>


      {
        props.equipe !== 'undefined' ? props.equipe.map(equipe => (
          <div className="items" key={equipe.name}>
            <figure className="circle-img">
              <img src={equipe.img} alt=""/>
            </figure>
            <span>{equipe.name}</span>
          </div>
        ))
        : ""
      }

    </div>
  )
}

const mapStateToProps = state => ({ equipe: state.characters.equipe })
const mapDispatchToProps = dispatch => bindActionCreators({ selectedEquipe }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Equipes)