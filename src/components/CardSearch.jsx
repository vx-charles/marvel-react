import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectHero } from '../store/actions/characterActions'

import interrogationIcon from '../images/interrogation.svg'
import eye from '../images/visibility.svg'

import { useContext } from 'react'
import ContextHero from '../context/contextHero'

export function CardSearch() {

  const stateProps = useSelector(state => (
    {
      searchHero: state.characters.searchHero
    }
  ))

  const dispatch = useDispatch({ selectHero })
  const { setCloseDrawer } = useContext(ContextHero)
  
  function detailChar(arr, id, name) {
    setCloseDrawer(true)
    dispatch(selectHero(arr, id, name))
  }

  return (
    <>
      { // gera a lista somente do herói pesquisado
        stateProps.searchHero[0]?.id !== "x-200" ? stateProps.searchHero.map(char => (
          <div className="search-list card" key={char.id}>
            <div className="itens">
              <img src={char.thumbnail?.path + '/standard_xlarge.' + char.thumbnail?.extension} alt={char.name} />
              <div className="info">
                <span>{char.name}</span>
                <button className="ver-mais" onClick={() => detailChar(stateProps.searchHero, char.id, char.name)}>
                  <img src={eye} alt="eye" />
                </button>
              </div>
            </div>
          </div>
        ))
        :
        stateProps.searchHero.map(char => (
          <div className="not-found card" key={char.id}>
            <div className="itens">
              <img src={interrogationIcon} alt="interrogação icon" />
              <div className="info">
                <span>{char.name}</span>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}