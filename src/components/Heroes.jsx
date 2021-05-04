import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { listHeroes, selectHero, search } from '../store/actions/characterActions'
import { bindActionCreators } from 'redux'
// import InfiniteScroll from 'react-infinite-scroll-component'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'

import '../css/listHeroes.css'
import eye from '../images/visibility.svg'
import loading from '../images/loading.svg'
import searchIcon from '../images/search.svg'

export function Heroes(props) {

  const initialRender = useRef(true) // obtém a referência na DOM para armazenar dados
  const [list, setList] = useState(props.load === false ? props.list.results : [])
  
  const [offset, setOffset] = useState(0)
  const limit = 20

  useEffect(() => {
    if (initialRender.current) {
      props.listHeroes()
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
    }, 1500);

  }  

  function keyHandler(e) {
    if (e.key === 'Enter') {
      props.search(valor)
    }
  }

  const [valor, setValor] = useState('')
  
  return (
    <div className="list-heroes">
      <div className="container">

        <div className="form-container">
          <input className="form-search" type="text" placeholder="Busca" value={valor} onKeyUp={keyHandler} onChange={(e) => setValor(e.target.value)} />
          <button type="button" onClick={() => props.search(valor)}><img src={searchIcon} /></button>
        </div>        

        <div className="row">
          <div className="card-search">
            <div className="no-hero d-none">Herói não existe. Tente outro Herói da HQ.</div>
            {
              props.searchHero !== 'undefined' ? props.searchHero.map(char => (
                <div className="col-12 col-md-6 col-lg-3" key={char.id}>
                  <div className="itens">
                    <img src={char.thumbnail.path + '/standard_xlarge' + '.' + char.thumbnail.extension} alt={char.name} />
                    <div className="info">
                      <span>{char.name}</span>
                      <button className="ver-mais" onClick={() => props.selectHero(char.name)}>
                        <img src={eye} alt="eye" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
              : ""
            }
          </div>

          <InfiniteScroll
            pageStart={0}
            loadMore={getMoreHeroes}
            // loadMore={fetchMoreData}
            hasMore={Math.ceil((props.total / limit)) > Math.ceil((offset / limit) + 1)}            
            loader={<img className="loading-svg" src={loading} alt="Loading..." key={0} />}
            className="cards"
          >
            {
              props.load === false ?
                  list.map(char => (
                    <div className="col-12 col-md-6 col-lg-3" key={char.id}>
                      <div className="itens">
                        <img src={char.thumbnail.path + '/standard_xlarge' + '.' + char.thumbnail.extension} alt={char.name} />
                        <div className="info">
                          <span>{char.name}</span>
                          <button className="ver-mais" onClick={() => props.selectHero(char.name)}>
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

    </div>
  )
}

const mapStateToProps = state => ( // pega o estado atual armazenado no objeto lá no countryReducer.js
  {
    list: state.characters.list,
    load: state.characters.load,
    selectHeroDetail: state.characters.selectHeroDetail,
    activeSearch: state.characters.activeSearch,
    total: state.characters.total,
    searchHero: state.characters.searchHero
  }
)
const mapDispatchToProps = dispatch => bindActionCreators({ listHeroes, selectHero, search }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Heroes)