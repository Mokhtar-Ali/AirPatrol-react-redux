export const increaseScore = () => ({type:'INCREASE_SCORE'})
export const decreaseScore = () => ({type:'DECREASE_SCORE'})
export const assignUser = (user) => ({type:'ASSIGN_USER', payload: user})
export const removeUser = () => ({type:'REMOVE_USER'})
export const assignAtmosphere = (atmosphere) => ({type:'ASSIGN_ATMOSPHERE', payload: atmosphere, trees: atmosphere.trees}) 
export const assignTrees = (trees) => ({type:'ASSIGN_TREES', trees: trees}) 


 