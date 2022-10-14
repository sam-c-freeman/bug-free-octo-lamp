const drinkToEdit = (state = {}, action) =>{
    console.log(action.payload)
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
        case 'EDIT_QUANTITY1':
            return {...state,
                    ingredients: state.ingredients.map(
                        (ingredient, i) => i === 0 ? {...ingredient, quantity: action.payload}
                                : ingredient
                        )
                    }
        case 'EDIT_INGREDIENT1':
            return {...state,
                    ingredients: state.ingredients.map(
                        (ingredient, i) => i === 0 ? {...ingredient, ingredient_name: action.payload}
                                : ingredient
                        )
                    }
        case 'EDIT_QUANTITY2':
            return {...state,
                ingredients: state.ingredients.map(
                    (ingredient, i) => i === 1 ? {...ingredient, quantity: action.payload}
                            : ingredient
                    )
                }

        case 'EDIT_INGREDIENT2':
            return {...state,
                    ingredients: state.ingredients.map(
                        (ingredient, i) => i === 0 ? {...ingredient, ingredient_name: action.payload}
                                : ingredient
                        )
                    }
        case 'EDIT_QUANTITY3':
            return {...state,
                ingredients: state.ingredients.map(
                    (ingredient, i) => i === 2 ? {...ingredient, quantity: action.payload}
                            : ingredient
                    )
                }
        case 'EDIT_INGREDIENT3':
            return {...state,
                    ingredients: state.ingredients.map(
                        (ingredient, i) => i === 0 ? {...ingredient, ingredient_name: action.payload}
                                : ingredient
                        )
                    }
        case 'EDIT_QUANTITY4':
            return {...state,
                ingredients: state.ingredients.map(
                    (ingredient, i) => i === 3 ? {...ingredient, quantity: action.payload}
                            : ingredient
                    )
                }
        case 'EDIT_INGREDIENT4':
            return {...state,
                    ingredients: state.ingredients.map(
                        (ingredient, i) => i === 0 ? {...ingredient, ingredient_name: action.payload}
                                : ingredient
                        )
                    }
        case 'EDIT_QUANTITY5':
            return {...state,
                ingredients: state.ingredients.map(
                    (ingredient, i) => i === 4 ? {...ingredient, quantity: action.payload}
                            : ingredient
                    )
                }
        case 'EDIT_INGREDIENT5':
            return {...state,
                    ingredients: state.ingredients.map(
                        (ingredient, i) => i === 0 ? {...ingredient, ingredient_name: action.payload}
                                : ingredient
                        )
                    }
      
        default:
            return state;
    }
}

export default drinkToEdit;

