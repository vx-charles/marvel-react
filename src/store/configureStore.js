import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // usado para funções async nas actions quando for fazer o dispatch
import characterReducer from './reducers/characterReducer'
import multi from 'redux-multi'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // usar o plugin Redux DevTools no Google Chrome.

const reducers = combineReducers({
    characters: characterReducer
})

const store = applyMiddleware(thunk, multi)(createStore)(reducers, devTools)

function configureStore() {
    return store
}

export default configureStore