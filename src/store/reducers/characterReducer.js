const INITIAL_STATE = { load: true, searchHero: [], list: [], selectHeroDetail: [], total: 0, activeSearch: false, equipe: [] }

const charReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'CLICKED':
			return { ...state, click: true }		
		case 'SELECT_HERO':
			return { ...state, selectHeroDetail: action.payload }		
		case 'SEARCHED':
			return { ...state, load: false, list: action.payload, total: action.payloadTotal }	
		case 'SEARCH_HERO':
			return { ...state, activeSearch: true, searchHero: action.payload }
		case 'MINHA_EQUIPE':
			return { ...state, equipe: action.payload }
		case 'EXCLUDE_EQUIPE':
			return { ...state, equipe: action.payload }
		default:
			return state
	}
}

export default charReducer