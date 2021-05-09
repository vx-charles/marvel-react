import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedEquipe, excludeEquipe } from '../store/actions/characterActions'
import styled from 'styled-components'

import { useContext } from 'react'
import ContextHero from '../context/contextHero'

import '../css/detailHero.css'
import close from '../images/cancel.svg'
import plus from '../images/add.svg'


const TitleDetail = styled.div`
  .adicionar {
    display: ${props => props.limit < 5 ? "block" : "none"};      
  }
  .aviso {
    display: ${props => props.limit >= 5 ? "block" : "none"};
  }
`

const DetailHero = props => {

  const stateProps = useSelector(state => ({
    selectHeroDetail: state.characters.selectHeroDetail, 
    equipe: state.characters.equipe, 
    limitEquip: state.characters.limitEquip
  }))
  const dispatch = useDispatch({ selectedEquipe, excludeEquipe })

  const { closeDrawer, setCloseDrawer } = useContext(ContextHero)

  const closeDetail = () => {
    setCloseDrawer(false)
  }
  
  return (
    <div className={closeDrawer ? "detail-hero detail-hero-mobile activeDetail" : " detail-hero detail-hero-mobile"}>
      {
        stateProps.selectHeroDetail.map(hero => (
          <div className="info-hero" key={hero.name}>
            <div className="close" onClick={() => closeDetail()}>
              <img src={close} alt="Fechar" width="30" />
            </div>
            <TitleDetail limit={stateProps.limitEquip} className="title">
              <figure>
                <img src={hero.thumbnail.path + "/standard_fantastic." + hero.thumbnail.extension} alt={hero.name}/>
              </figure>
              <div className="info-hero__left">
                <h2>{hero.name}</h2>
                <button className={stateProps.selectHeroDetail[0]?.add ? "d-none" : "adicionar"} type="button" onClick={ () => dispatch(selectedEquipe(stateProps.equipe.concat(stateProps.selectHeroDetail)))  }>
                  Adicionar
                  <img src={plus} alt="plus" />
                </button>
                <button className={stateProps.selectHeroDetail[0]?.add ? "excluir" : "d-none"} type="button" onClick={ () => dispatch(excludeEquipe(stateProps.equipe, hero.id )) }>
                  Excluir
                  <img src={plus} alt="excluir" />
                </button>
                <div className="aviso alert-danger">
                  Limite máximo de 5 heróis adicionados. Remova uma da lista caso queira trocar.
                </div>
              </div>
            </TitleDetail>            

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
                    hero.series.items !== "undefined" ? hero.series.items.map(series => (
                      <li key={series.name}>{series.name}</li>
                    ))
                    : ""
                  }
                  </ul>
                  {stateProps.selectHeroDetail[0].series.returned === 0 ? "No HQs." : ""}
              </div>
            </div>
            
          </div>
        ))
      }
    </div>
  )
}

export default DetailHero