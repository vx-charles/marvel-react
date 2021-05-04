import { axiosBaseURL, params } from "../../api/apiRequestHeroes"
import _ from 'lodash'

export const listHeroes = () => {
  return async dispatch => {
    const request = axiosBaseURL.get('characters',
      { params: params }
    )
    const resp = await request
    return dispatch({ type: 'SEARCHED', payload: resp.data.data, payloadTotal: resp.data.data.total })
  }
}

export const selectHero = name => {
  document.getElementsByClassName("list-heroes")[0].classList.add('activeListHeroWidth')
  document.getElementsByClassName("detail-hero")[0].classList.add('activeDetail')
    
  var y = document.getElementsByClassName("col-lg-3");
  var i;
  for (i = 0; i < y.length; i++) {
    y[i].classList.add('col-lg-6');
  }

  return async dispatch => {
    const request = axiosBaseURL.get('characters', {
      params: {
        ts: 6,
        apikey: '60a102569ba4ccc05c57af19ebeaf636',
        hash: 'c96130248d43dbb1b0583dde5de35803',
        name: name
      }
    })
    const resp = await request
    return dispatch({ type: 'SELECT_HERO', payload: resp.data.data.results })
  }
}

export const search = name => {
  
    return async dispatch => {
      if(name !== "") {
        document.getElementsByClassName("cards")[0].classList.add('d-none')
        
        const request = axiosBaseURL.get('characters', {
          params: {
            ts: 6,
            apikey: '60a102569ba4ccc05c57af19ebeaf636',
            hash: 'c96130248d43dbb1b0583dde5de35803',
            name: name
          }
        })
        const resp = await request
        return [
          dispatch({ type: 'SEARCH_HERO', payload: resp.data.data.results }),
          document.getElementsByClassName("no-hero")[0].classList.remove('d-none')
        ]
      } else {
        return [
          dispatch({ type: 'SEARCH_HERO', payload: [] }),
          document.getElementsByClassName("cards")[0].classList.remove('d-none'),
          document.getElementsByClassName("no-hero")[0].classList.add('d-none'),                    
          listHeroes()
        ]
      }
      
    }
  
}

export const selectedEquipe = equipe => {
  document.getElementsByClassName("vazio")[0].classList.add("d-none")
  document.getElementsByClassName("selected-heroes")[0].classList.add("active")
  
  let listEquip = equipe.filter(function (a) {
    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
  }, Object.create(null))
  

  if(listEquip.length >= 5) {
    document.querySelector(".adicionar").classList.add('d-none')
    document.querySelector(".excluir").classList.remove('d-none')
  } else {
    document.querySelector(".adicionar").classList.remove('d-none')
    document.querySelector(".excluir").classList.add('d-none')
  }

  return dispatch => {
    return dispatch({ type: 'MINHA_EQUIPE', payload: listEquip })
  }  
}

export const excludeEquipe = equipe => {
  console.log(equipe)
  const teste = equipe.splice(_.findIndex(equipe, {id: equipe.id}))
  console.log(teste)

  return dispatch => {
    return dispatch({ type: 'EXCLUDE_EQUIPE', payload: teste })
  } 
}