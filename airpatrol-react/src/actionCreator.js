const TreesApi = "http://localhost:3000/trees";

export const increaseScore = () => ({ type: 'INCREASE_SCORE' })
export const decreaseScore = () => ({ type: 'DECREASE_SCORE' })
export const assignUser = (user) => ({ type: 'ASSIGN_USER', payload: user })
export const removeUser = () => ({ type: 'REMOVE_USER' })
export const assignAtmosphere = (atmosphere) => ({ type: 'ASSIGN_ATMOSPHERE', payload: atmosphere, trees: atmosphere.trees, oxygen: atmosphere.oxygen, carbon_dioxide: atmosphere.carbon_dioxide })

export const addTree = (data) => dispatch => {
  fetch(TreesApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(response => {
      dispatch({ type: 'PLANT_TREE', payload: response })
    })
}
export const waterTreeACreator = (id) => dispatch => {
  let data = { size: "medium", oxygen: 5, firewood: 1 };
  fetch(`${TreesApi}/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
  .then(response => {    
  dispatch({ type: 'WATER_TREE', payload: response})
  });

}

export const cutTree = (id) => dispatch => {
  fetch(`${TreesApi}/${id}`, {
    method: "DELETE"
  })
  dispatch({ type: 'CUT_TREE', payload: id })
}



export const moreFire = () => ({ type: 'FEED_FIRE' })
export const increaseHealth = () => ({ type: 'INCREASE_HEALTH' })
export const decreaseHealth = () => ({ type: 'DECREASE_HEALTH' })

export const decreaseFire10 = () => ({ type: 'DECREASE_FIRE_10' })
export const decreaseFire20 = () => ({ type: 'DECREASE_FIRE_20' })

export const decreaseBodyTempBy10 = () => ({ type: 'DECREASE_BODY_TEMP_10' })
export const decreaseBodyTempBy20 = () => ({ type: 'DECREASE_BODY_TEMP_20' })

export const increaseBodyTempBy10 = () => ({ type: 'INCREASE_BODY_TEMP_10' })
export const increaseBodyTempBy20 = () => ({ type: 'INCREASE_BODY_TEMP_20' })


export const fillWell = () => ({type: 'FILL_WELL'})
export const upgradeWell = () => ({type: 'UPGRADE_WELL'})
export const reducerWaterSupply = () => ({type: 'REDUCE_WATER_SUPPLY'})

export const restartGame = () => ({type: 'RESTART_GAME'})