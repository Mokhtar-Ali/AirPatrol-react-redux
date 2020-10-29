const defaultState = {
    currentUser: null, 
    trees: [],
    score: 0,
    treesNum: 10,
    atmosphere: null,
    timer: 180, // work on logic for timer
    fireWood: 100,
    fire: 100,
    weather: "",
    temperature: 0,
    bodyTemp: 98,
    health: 100,
    treesChopped: 0,
    treesPlanted: 0,
    oxygen: 0,
    carbon_dioxide: 0,
    well: 'small',
    water_supply: 100

}

function reducer(state = defaultState, action) {
    switch (action.type) {

        case 'RESTART_GAME':
            // console.log(state)
            return {
                ...state,
                trees: [],
                score: 10,
                treesNum: 10,
                atmosphere: null,
                timer: 180, // work on logic for timer
                fireWood: 100,
                fire: 0,
                weather: "",
                temperature: 0,
                bodyTemp: 98,
                health: 100,
                treesChopped: 0,
                treesPlanted: 0,
                oxygen: 0,
                carbon_dioxide: 0,
                well: 'small',
                water_supply: 5
            }


        case 'ASSIGN_ATMOSPHERE':
            let oxygen = action.payload.oxygen
            let carbon_dioxide = action.payload.carbon_dioxide
            action.payload.trees.map(tree => {
                return oxygen += tree.oxygen
                // carbon_dioxide += tree.carbon_dioxide
            })
            return {
                ...state, atmosphere: action.payload, trees: action.payload.trees, oxygen: oxygen, carbon_dioxide: carbon_dioxide
            }

        case 'INCREASE_SCORE':
            return { ...state, score: state.score += 10 }
        case 'DECREASE_SCORE':
            return { ...state, score: state.score -= 5 }
        case 'ASSIGN_USER':
            return { ...state, currentUser: action.payload }
        case 'REMOVE_USER':
            return { ...state, currentUser: null }

        case 'PLANT_TREE':
            return { ...state, trees: [...state.trees, action.payload], oxygen: state.oxygen += action.payload.oxygen, carbon_dioxide: state.carbon_dioxide += action.payload.carbon_dioxide, treesNum: state.treesNum += 1, treesPlanted: state.treesPlanted += 1 }
        case 'CUT_TREE':
            let tree = state.trees.find(t => t.id === action.payload)
            let treesCopy = [...state.trees.filter(tree => tree.id !== action.payload)]
            return { ...state, trees: treesCopy, oxygen: state.oxygen -= tree.oxygen, carbon_dioxide: state.carbon_dioxide -= tree.carbon_dioxide, treesNum: state.treesNum -= 1, treesChopped: state.treesChopped += 1, fireWood: state.fireWood += tree.firewood }

        case 'WATER_TREE': // PAYLOAD: id
            // let smallTrees = state.trees.filter(tree => tree.size === "small");
            // let mediumTrees = state.trees.filter(tree => tree.size === "medium");
            let treesCopy2 = [...state.trees.filter(tree => tree.id !== action.payload.id)]
            let trees2 = [...treesCopy2, action.payload]
            return { ...state, trees: trees2 }


        case 'FEED_FIRE':
            if (state.fireWood >= 2) {
                return { ...state, fireWood: state.fireWood -= 2, fire: 100 }
            } else return { ...state, fire: 0 }

        case 'INCREASE_HEALTH':
            return { ...state, health: state.health += 10 }
        case 'DECREASE_HEALTH':
            return { ...state, health: state.health -= 10 }

        case 'DECREASE_FIRE_10':
            if (state.fire >= 10) {
                return { ...state, fire: state.fire -= 10 }
            }else {
                return {...state}
            }
        case 'DECREASE_FIRE_20':
            if (state.fire >= 20) {
                return { ...state, fire: state.fire -= 20 }
            }else {
                return {...state}
            }

        case 'DECREASE_BODY_TEMP_10':
            return { ...state, bodyTemp: state.bodyTemp -= 10 }
        case 'DECREASE_BODY_TEMP_20':
            return { ...state, bodyTemp: state.bodyTemp -= 20 }

        case 'INCREASE_BODY_TEMP_10':
            return { ...state, bodyTemp: state.bodyTemp += 10 }
        case 'INCREASE_BODY_TEMP_20':
            return { ...state, bodyTemp: state.bodyTemp += 20 }

        case 'FILL_WELL':
            if (state.well === 'small') {
                return { ...state, water_supply: 5 }
            } else if (state.well === 'medium') {
                return { ...state, water_supply: 10 }
            } else {
                return { ...state, water_supply: 15 }

            }
        case 'UPGRADE_WELL':
            if (state.well === 'small' && state.fireWood >= 10) {
                return { ...state, well: 'medium', fireWood: state.fireWood -= 10 }
            } else if (state.well === 'medium' && state.fireWood >= 20) {
                return { ...state, well: 'Large', fireWood: state.fireWood -= 20 }
            } else {
                return { ...state }
            }

        case 'REDUCE_WATER_SUPPLY':
            return { ...state, water_supply: state.water_supply -= 1 }
        default:
            return state
    }
}

export default reducer