import React, { useEffect, useRef, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listHeroes, search } from '../store/actions/characterActions'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'

import '../css/listHeroes.css'
import loading from '../images/loading.svg'

import ContextHero from '../context/contextHero'

// COMPONENTES
import { CardSearch } from './CardSearch'
import { SearchFrom } from './SearchForm'
import { ListInfiniteHeroes } from './ListInfiniteHeroes'

function Heroes() {

  const stateProps = useSelector(state => (
    { 
      list: state.characters.list, 
      load: state.characters.load, 
      total: state.characters.total, 
      searchHero: state.characters.searchHero 
    } 
  ))

  const dispatch = useDispatch({ listHeroes, search })

  const { closeDrawer } = useContext(ContextHero)

  const initialRender = useRef(true) // obtém a referência na DOM para armazenar dados.
  const [list, setList] = useState(stateProps.load === false ? stateProps.list.results : [])
  const [offset, setOffset] = useState(0) // faz o offset pegando de 20 em 20 a cada requisição.
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
          apikey: "b851322ff45094f53be8e488f1c3db76",
          hash: "3899499c303701d1eed4542ec134f4da",
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

  return (
    <div className={closeDrawer ? "list-heroes activeListHeroWidth" : "list-heroes"}>
      <div className="container">

        <SearchFrom />
        
        <div className="card-search">
          <CardSearch />
        </div>

        {/* INIFINTE SCROLL */}
        <InfiniteScroll
          pageStart={0}
          loadMore={getMoreHeroes}
          hasMore={Math.ceil((stateProps.total / limit)) > Math.ceil((offset / limit) + 1)} // verifica se há mais heróis, senão ele para a execução do scroll.
          loader={<div className="loading" key={0}><img className="loading-svg" src={loading} alt="Loading..." /></div>}
          className={stateProps.searchHero[0]?.search ? "d-none" : "cards"}
        >
          {
            stateProps.load === false ? list.map(char => (
              <ListInfiniteHeroes arrObjChar={char} listStateProps={list} key={char.id} />
            ))
            : <div className="loading"><img className="loading-svg" src={loading} alt="Loading..." /></div>
          }
        </InfiniteScroll>      

      </div>
    </div>
  )
}

export default Heroes

