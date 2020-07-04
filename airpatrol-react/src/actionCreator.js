const TreesApi = "http://localhost:3000/trees";

export const increaseScore = () => ({type:'INCREASE_SCORE'})
export const decreaseScore = () => ({type:'DECREASE_SCORE'})
export const assignUser = (user) => ({type:'ASSIGN_USER', payload: user})
export const removeUser = () => ({type:'REMOVE_USER'})
export const assignAtmosphere = (atmosphere) => ({type:'ASSIGN_ATMOSPHERE', payload: atmosphere, trees: atmosphere.trees, oxygen: atmosphere.oxygen, carbon_dioxide: atmosphere.carbon_dioxide}) 

export const addTree = (data) => dispatch => {
    fetch(TreesApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => resp.json())
        .then(response => dispatch({type: 'ADD_TREE', payload: response}) )      
}
 