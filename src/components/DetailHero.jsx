import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectedEquipe, excludeEquipe } from '../store/actions/characterActions'

import '../css/detailHero.css'
import close from '../images/cancel.svg'
import plus from '../images/add.svg'

function closeDetail() {  
  document.getElementsByClassName("list-heroes")[0].classList.remove('activeListHeroWidth')
  document.getElementsByClassName("detail-hero")[0].classList.remove('activeDetail')
  
  var y = document.getElementsByClassName("col-lg-3");
  var i;
  for (i = 0; i < y.length; i++) {
    y[i].classList.remove('col-lg-6');
  }
}

const DetailHero = props => {  
  
  return (
    <div className="detail-hero detail-hero-mobile">
      
      {
        props.selectHeroDetail.map(hero => (
          <div className="info-hero" key={hero.name}>
            <div className="close" onClick={closeDetail}>
              <img src={close} alt="Fechar" width="30" />
            </div>
            <div className="title">
              <figure>
                <img src={hero.thumbnail.path + "/standard_fantastic." + hero.thumbnail.extension} alt={hero.name}/>
              </figure>
              <div className="info-hero__left">
                <h2>{hero.name}</h2>
                <button className="adicionar" type="button" onClick={ () => props.selectedEquipe([...props.equipe, { id: hero.id, name: hero.name, img: hero.thumbnail.path + "/standard_fantastic." + hero.thumbnail.extension }], ) }>
                  Adicionar
                  <img src={plus} alt="plus" />
                </button>
                <button className="excluir d-none" type="button" onClick={ () => props.excludeEquipe([...props.equipe]) }>
                  Excluir
                  <img src={plus} alt="excluir" />
                </button>
              </div>
            </div>            

            <div className="description">
              <div>
                <h2>ID</h2>
                {hero.id}
              </div>
              <div>
                <h2>Descrição</h2>
                {hero.description === "" ? "No description" : hero.description }
              </div>
              <div>
                <h2>Data de modificação</h2>
                {hero.modified}
              </div>
              <div>
                <h2>Últimas HQs</h2>
                <ul>
                  {
                    hero.series.items.map(series => (
                      <li key={series.name}>{series.name}</li>
                    ))
                  }
                  </ul>
              </div>
            </div>
            
          </div>
        ))
      }
    </div>
  )
}

const mapStateToProps = state => ({ selectHeroDetail: state.characters.selectHeroDetail, equipe: state.characters.equipe })
const mapDispatchToProps = dispatch => bindActionCreators({ selectedEquipe, excludeEquipe }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DetailHero)