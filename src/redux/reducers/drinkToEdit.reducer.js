const drinkToEdit = (state = {}, action) =>{
    switch(action.type){
        case 'SET_DRINK_TO_EDIT':
        return action.payload;
        case 'EDIT_NAME':
        return {...state, name: action.payload}
        case 'EDIT_DESCRIPTION':
            return {...state, description: action.payload}
        case 'EDIT_NOTES':
            return {...state, notes: action.payload}
        case 'EDIT_IMAGE_URL':
            return {...state, image_url: action.payload}
        case 'EDIT_QUANTITY':
            return {...state, name: action.payload}

        //how do I edit the recipe items?
        default:
            return state;
    }
}

export default drinkToEdit;

