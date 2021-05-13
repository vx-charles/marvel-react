import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { search } from '../store/actions/characterActions'

import searchIcon from '../images/search.svg'

export function SearchFrom() {

  const dispatch = useDispatch({ search })
  const [isVisibleClear, setIsVisibleClear] = useState(false)
  const [valor, setValor] = useState('') // usado para pegar o valor na pesquisa atualizado.

  function keyHandler(e) {
    if (e.key === 'Enter') {
      dispatch(search(valor))
      setIsVisibleClear(true)
    }
  }

  function clearInput() {
    setValor("")
    dispatch(search(""))
    setIsVisibleClear(false)
  }
  
  function searchInput(text) {
    setIsVisibleClear(true)
    dispatch(search(text))
  }

  return (
    <div className="form-container">
      <input className="form-search" type="text" placeholder="Busca" value={valor} onKeyUp={keyHandler} onChange={(e) => setValor(e.target.value)} />
      <button type="button" className="search-btn" onClick={() => searchInput(valor)}>
        <img src={searchIcon} alt="Search icon" />
      </button>
      <button type="button" className={isVisibleClear ? "limpar" : "limpar d-none"} onClick={() => clearInput()}>Limpar pesquisa</button>
    </div>
  )
}