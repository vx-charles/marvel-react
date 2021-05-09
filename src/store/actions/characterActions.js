import { axiosBaseURL, params } from "../../api/apiRequestHeroes"
import _ from 'lodash'

// Lista os personagens assim que iniciar a página
export const listHeroes = () => {
  return async dispatch => {
    const request = axiosBaseURL.get('characters',
      { params: params }
    )
    const resp = await request
    return dispatch({ type: 'SEARCHED', payload: resp.data.data, payloadTotal: resp.data.data.total })
  }
}

// Seleciona o personagem assim que clica no botão ver mais.
export const selectHero = (arrHero, id, name) => {
   
  // retorna somente o herói selecionado que existe no arrHero, quando ocorre o scroll infinito, havendo a adição de objetos no array.
  const heroFilter = _.filter(arrHero, function(obj) { return obj.id === id })

  return async dispatch => {
    if(heroFilter !== ''){
      return dispatch({ type: 'SELECT_HERO', payload: heroFilter })
    } else {
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
}

// pesquisa o personagem no input
export const search = name => {
  return async dispatch => {
    if(name !== "") {
      
      const request = axiosBaseURL.get('characters', {
        params: {
          ts: 6,
          apikey: '60a102569ba4ccc05c57af19ebeaf636',
          hash: 'c96130248d43dbb1b0583dde5de35803',
          name: name
        }
      })

      const resp = await request
      
      if(resp.data.data.count > 0) { // quando na requisição o atributo tem count maior que 1, possui resultado.
        resp.data.data.results[0].search = true // add um objeto no array de objetos na pesquisa.
        dispatch({ type: 'SEARCH_HERO', payload: resp.data.data.results })
      } else { // retorna um objeto com informações de pesquisa não encontrada.
        dispatch({ type: 'SEARCH_HERO', payload: [{id: "x-200", name: "Herói não existe! Tente Novamente", search: true }] })
      }

    } else { // lista novamente os personagens quando a pesquisa for vazio, mandando um array vazio no payload.
      return [
        dispatch({ type: 'SEARCH_HERO', payload: [] }),               
        listHeroes()
      ]
    }    
  }  
}

// add o personagem na equipe assim que clicar no botão "Adicionar"
export const selectedEquipe = (equipe) => {
    
  let equipFilter = equipe.filter(function (a) { // Evita de add personagens iguais.
    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
  }, Object.create(null))  
  
  equipe[equipe.length-1].add = true // add o objeto que o personagem foi adicionado no estado, no mesmo objeto do personagem selecionado nos detalhes.

  return dispatch => {
    return dispatch({ type: 'MINHA_EQUIPE', payload: equipFilter, payloadLimit: equipe.length })
  }  
}

// Exclui o personagem na equipe assim que clicar no botão "Excluir"
export const excludeEquipe = (equipe, id) => {
  
  const newEquipe = _.remove(equipe, function(obj){ 
    if(obj.id === id){
      obj.add = false // add o objeto {add: false} no mesmo array onde exibe os detalhes do personagem apenas, sem remover do array.
    }
    return !_.isEqual(id, obj.id); //utiliza o isEqual para comparar
  })
  
  return dispatch => {
    return dispatch({ type: 'EXCLUDE_EQUIPE', payload: newEquipe, payloadLimit: newEquipe.length })
  } 
}