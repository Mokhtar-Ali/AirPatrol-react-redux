const defaultState = {
    currentUser: null,
    trees: [],
    score: 10,
    treesNum: 10,
    atmosphere: null,
    timer: 180, // work on logic for timer
    fireWood: 10,
    weather: "",
    temperature: 0,
    bodyTemp: 99,
    health: 100,
    treesChopped: 0,
    treesPlanted: 0,
    oxygen: 0,
    carbon_dioxide: 0

}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'INCREASE_SCORE':
            return { ...state, score: state.score += 10 }
        case 'DECREASE_SCORE':
            return { ...state, score: state.score -= 5 }
        case 'ASSIGN_USER':
            return { ...state, currentUser: action.payload }
        case 'REMOVE_USER':
            return { ...state, currentUser: null }
        case 'ASSIGN_ATMOSPHERE':
            let oxygen = action.payload.oxygen
            let carbon_dioxide = action.payload.carbon_dioxide
            action.payload.trees.map(tree => {
                oxygen += tree.oxygen
                carbon_dioxide += tree.carbon_dioxide
            })
            return {...state, atmosphere: action.payload, trees: action.payload.trees, oxygen: oxygen, carbon_dioxide: carbon_dioxide}

        case 'PLANT_TREE':
            return {...state, trees: [...state.trees, action.payload], oxygen: state.oxygen += action.payload.oxygen, carbon_dioxide: state.carbon_dioxide += action.payload.carbon_dioxide, treesNum: state.treesNum += 1, treesPlanted: state.treesPlanted += 1}
        case 'CUT_TREE':
            let tree = state.trees.find(t => t.id === action.payload)
            let treesCopy = [...state.trees.filter(tree => tree.id !== action.payload)]
            console.log(tree.firewood);
            
            return {...state, trees: treesCopy, oxygen: state.oxygen -= tree.oxygen, carbon_dioxide: state.carbon_dioxide -= tree.carbon_dioxide, treesNum: state.treesNum -= 1, treesChopped: state.treesChopped += 1,fireWood: state.fireWood += tree.firewood}
        case 'WATER_TREE':

        
        default:
            return state
    }
}

export default reducer