export const increaseScore = () => ({type:'INCREASE_SCORE'})
export const decreaseScore = () => ({type:'DECREASE_SCORE'})
export const assignUser = (user) => ({type:'ASSIGN_USER', payload: user})
export const removeUser = () => ({type:'REMOVE_USER'})
export const assignAtmosphere = (atmosphere) => ({type:'ASSIGN_ATMOSPHERE', payload: atmosphere, trees: atmosphere.trees, oxygen: atmosphere.oxygen, carbon_dioxide: atmosphere.carbon_dioxide}) 
export const assignTrees = (trees) => ({type:'ASSIGN_TREES', trees: trees}) 
 