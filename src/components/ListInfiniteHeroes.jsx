import React, { useContext } from 'react'
import ContextHero from '../context/contextHero'
import { selectHero } from '../store/actions/characterActions'
import { useDispatch } from 'react-redux'

import eye from '../images/visibility.svg'

export function ListInfiniteHeroes(props) {

  const { setCloseDrawer } = useContext(ContextHero)
  const dispatch = useDispatch({ selectHero })

  function detailChar(arr, id, name) {
    setCloseDrawer(true)
    dispatch(selectHero(arr, id, name))
  }

  return (
    <div className="card">
      <div className="itens">
        <img src={props.arrObjChar.thumbnail.path + '/standard_xlarge.' + props.arrObjChar.thumbnail.extension} alt={props.name} />
        <div className="info">
          <span>{props.arrObjChar.name}</span>
          <button className="ver-mais" onClick={() => detailChar(props.listStateProps, props.arrObjChar.id, props.arrObjChar.name)}>
            <img src={eye} alt="eye" />
          </button>
        </div>
      </div>
    </div>
  )
}