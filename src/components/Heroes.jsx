import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listHeroes, selectHero, search } from '../store/actions/characterActions'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'

import '../css/listHeroes.css'
import eye from '../images/visibility.svg'
import loading from '../images/loading.svg'
import searchIcon from '../images/search.svg'
import interrogationIcon from '../images/interrogation.svg'

import { useContext } from 'react'
import ContextHero from '../context/contextHero'


function Heroes(props) {

  const stateProps = useSelector(state => (
    { 
      list: state.characters.list, 
      load: state.characters.load, 
      selectHeroDetail: state.characters.selectHeroDetail, 
      total: state.characters.total, 
      searchHero: state.characters.searchHero 
    } 
  ))

  const dispatch = useDispatch({ listHeroes, selectHero, search })

  const { closeDrawer, setCloseDrawer } = useContext(ContextHero)

  const initialRender = useRef(true) // obtém a referência na DOM para armazenar dados.
  const [list, setList] = useState(stateProps.load === false ? stateProps.list.results : [])
  const [valor, setValor] = useState('') // usado para pegar o valor na pesquisa.
  const [offset, setOffset] = useState(0) // faz o offset pegando de 20 em 20 a cada requisição.
  const [isVisibleClear, setIsVisibleClear] = useState(false)
  const limit = 20

  useEffect(() => {
    if (initialRender.current) {
      dispatch(listHeroes())
      initialRender.current = false // a próxima vez que for chamada, será false e para a execução da função.
    }
  })
  
  const getMoreHeroes = () => {
    setTimeout(async () => {

      const result = await axios.get('https://gateway.marvel.com/v1/public/characters', {
        params: {
          ts: 6,
          apikey: "60a102569ba4ccc05c57af19ebeaf636",
          hash: "c96130248d43dbb1b0583dde5de35803",
          limit: limit,
          offset: offset
        }
      })

      const res = result.data.data.results
      const status = result.status

      if (status === 200) {
        setList([...list, ...res])
        setOffset(offset + 20)
      }      
    }, 1000);
  }  

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
  
  function searchInput(valor) {
    setIsVisibleClear(true)
    dispatch(search(valor))
  }

  function detailChar(arr, id, name) {
    setCloseDrawer(true)
    dispatch(selectHero(arr, id, name))
  }

  return (
    <div className={closeDrawer ? "list-heroes activeListHeroWidth" : "list-heroes"}>
      <div className="container">

        <div className="form-container">
          <input className="form-search" type="text" placeholder="Busca" value={valor} onKeyUp={keyHandler} onChange={(e) => setValor(e.target.value)} />
          <button type="button" className="search-btn" onClick={() => searchInput(valor) }>
            <img src={searchIcon} alt="Search icon" />
          </button>
          <button type="button" className={isVisibleClear ? "limpar" : "limpar d-none"} onClick={() => clearInput()}>Limpar pesquisa</button>
        </div>        
        
        <div className="card-search">            
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
        </div>

        <InfiniteScroll
          pageStart={0}
          loadMore={getMoreHeroes}
          hasMore={Math.ceil((stateProps.total / limit)) > Math.ceil((offset / limit) + 1)} // verifica se há mais heróis, senão ele para a execução do scroll.
          loader={<img className="loading-svg" src={loading} alt="Loading..." key={0} />}
          className={stateProps.searchHero[0]?.search ? "d-none" : "cards"}
        >
          {
            stateProps.load === false ?
                list.map(char => (
                  <div className="card" key={char.id}>
                    <div className="itens">
                      <img src={char.thumbnail.path + '/standard_xlarge.' + char.thumbnail.extension} alt={char.name} />
                      <div className="info">
                        <span>{char.name}</span>
                        <button className="ver-mais" onClick={() => detailChar(list, char.id, char.name)}>
                          <img src={eye} alt="eye" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            : ''              
          }
        </InfiniteScroll>      

      </div>
    </div>
  )
}

export default Heroes

