const INITIAL_STATE = { load: true, searchHero: [], list: [], selectHeroDetail: [], total: 0, equipe: [], limitEquip: 0 }

const charReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SELECT_HERO':
			return { ...state, selectHeroDetail: action.payload }
		case 'SEARCHED':
			return { ...state, load: false, list: action.payload, total: action.payloadTotal }	
		case 'SEARCH_HERO':
			return { ...state, searchHero: action.payload }
		case 'MINHA_EQUIPE':
			return { ...state, equipe: action.payload, limitEquip: action.payloadLimit }
		case 'EXCLUDE_EQUIPE':
			return { ...state, equipe: action.payload, limitEquip: action.payloadLimit }
		default:
			return state
	}
}

export default charReducer