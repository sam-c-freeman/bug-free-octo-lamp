const oneDrink = (state = {}, action) =>{
    switch(action.type){
        case 'SET_ONE_DRINK':
        return action.payload;
        case 'CLEAR_DRINK_DETAILS':
        return {}
        default:
            return state;
    }
}

export default oneDrink;