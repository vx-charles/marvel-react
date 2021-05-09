import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { excludeEquipe, selectHero } from '../store/actions/characterActions'

import '../css/equipes.css'
import closeSVG from '../images/cancel.svg'

import { useContext } from 'react'
import ContextHero from '../context/contextHero'

const Equipes = props => {

  const listEquip = useSelector(state => ({ equipe: state.characters.equipe, limitEquip: state.characters.limitEquip }))
  const dispatch = useDispatch({ excludeEquipe, selectHero })

  const { setCloseDrawer } = useContext(ContextHero)

  const [verLista, setVerLista] = useState()
  const [close, setClose] = useState()
  
  function showEquipes() {
    if(listEquip.limitEquip > 0){
      setClose(true)
    }
  }

  function closeEquipe() {    
    setClose(true)
    if(close) {
      setClose(false)
    }
  }

  function openDrawerDetailEquip(equipe, id, name) {
    setCloseDrawer(true)
    dispatch(selectHero(equipe, id, name))
  }

  useEffect(() => {
    if(listEquip.limitEquip > 0) {
      setVerLista("Ver equipes")
      setClose(true)
    } else {
      setVerLista("Equipe vazia")      
      setClose(false)
    }
  },[listEquip.limitEquip])

  return (
    <>
      <div className={close ? "close-equipe" : "d-none"} onClick={closeEquipe}>
        <img src={closeSVG} alt="Fechar" width="30" />
        Fechar
      </div>
      <div className={close ? "d-none" : "ver-lista"} onClick={showEquipes}>
        <span>{verLista}</span>
      </div>
      
      <div className={close ? "selected-heroes active" : "selected-heroes"}>

        {
          listEquip.equipe !== 'undefined' ? listEquip.equipe.map(equipe => (
            <div className="items" key={equipe.name}>
              <div className="close-equipe-list">
                <img src={closeSVG} alt="Fechar" width="30" onClick={() => dispatch(excludeEquipe(listEquip.equipe, equipe.id ))} />
              </div>
              <figure className="circle-img" onClick={() => openDrawerDetailEquip(listEquip.equipe, equipe.id, equipe.name)}>
                <img src={equipe.thumbnail.path+'.jpg'} alt=""/>
              </figure>
              <span>{equipe.name}</span>
            </div>
          )) : ''
        }

      </div>
    </>
  )
}

export default Equipes