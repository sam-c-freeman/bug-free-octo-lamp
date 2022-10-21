import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';




//fetches all recipes for explore page
function* fetchRecipes (){
    try {
        const recipes = yield axios.get('/api/recipes');
        // console.log(recipes.data)
        yield put ({type: 'SET_RECIPES', payload: recipes.data});
    } catch (error) {
        console.log(error);
        alert('Error fetching recipes');
    }
}

//route to add a recipe to the app
function* addRecipe (action) {
    //filtering out unused ingredients and re-assigning to the newRecipe variable
    console.log(action.payload)
    const newRecipe = action.payload
    const ingredients = action.payload.ingredients
    const filteredIngredients = ingredients.filter(ingredients => ingredients.ingredient !== undefined)
    newRecipe.ingredients = filteredIngredients
    console.log(newRecipe);
    try {
        yield axios.post('/api/recipes', newRecipe);
        yield all([
            put ({type: 'FETCH_RECIPES'}),
            put({type: 'GET_SAVED_RECIPES'})
        ])
    } catch (error) {
        console.log(error);
        alert('Error fetching recipes');
    }
}

// get one drink from the DB
function* fetchOneDrink(action) {
    const drinkId = action.payload;
    console.log('checking for object', drinkId)
    try {
        const drink = yield axios.get(`/api/recipes/${drinkId}`);
        console.log(drink.data);
        console.log('trying to get id', drink.data.recipe_id)
        yield put({ type: 'SET_ONE_DRINK', payload: drink.data});

    } catch {
        console.log('get one Drink error');
    }
        
}

//adds a recipe to the user's favorites
function* saveToFavorites (action) {
 
  try {  
        const recipeToSave = action.payload
        console.log('what is in this object', recipeToSave.drinkId);
        const saved = yield axios.post('/api/recipes/save', recipeToSave);
          yield put({type: 'GET_SAVED_RECIPES'}),
          yield put({type: 'FETCH_DRINK_DETAILS', payload: recipeToSave.drinkId})
    } catch (error) {
        console.log(error);
        alert('Error setting favorite recipes');
    }
}

//this gets all of the user's favorite recipes
function* fetchFavorites () {
    try {
        const favorites = yield axios.get('/api/recipes/favorites');
        console.log('does this have isSaved?', favorites.data)
        yield put ({type: 'SET_SAVED_RECIPES', payload: favorites.data});
    } catch (error) {
        console.log(error);
        alert('Error fetching favorites');
    }
}

//this removes a recipe from a user's saved recipes
function* deleteSaved (action) {
    console.log(action.payload)
    const deleteId = action.payload
    try{
        const deleteRecipeRoute = yield axios.delete(`/api/recipes/saved/${deleteId}`);
        yield put({type: 'GET_SAVED_RECIPES'})
        yield put({type: 'FETCH_DRINK_DETAILS', payload: deleteId})
    } catch {
        console.log('error in delete route for saved recipe')
    }
}

//this function will get the datat needed to update a recipe!
function* fetchDrinkToEdit(action) {
    try {
      const drinkId = action.payload;
      const res = yield axios({
        method: 'GET',
        url: `/api/recipes/${drinkId}`
      })

      console.log(res.data)
     
      yield put({
        type: 'SET_DRINK_TO_EDIT',
        payload: {
          id: res.data.recipe_id,
          name: res.data.name,
          description: res.data.description,
          notes: res.data.notes,
          image_url: res.data.image_url,
          ingredients: res.data.ingredients,
          
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  //to update drink after edits are completed
  function* updateDrink(action) {
    console.log(action.payload)
    try {
      const drinkToUpdate = action.payload
      yield axios({
        method: 'PUT',
        url: `/api/recipes/${drinkToUpdate.id}`,
        data: drinkToUpdate
      })
    //   yield put({
    //     type: 'FETCH_DRINK_DETAILS' //which call depends on where I want app to re-route
    //   })
    } catch (err) {
      console.log(err)
    }
  }




function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
  yield takeLatest('ADD_RECIPE', addRecipe);
  yield takeLatest('FETCH_DRINK_DETAILS', fetchOneDrink);
  yield takeLatest('SAVE_RECIPE', saveToFavorites);
  yield takeLatest('GET_SAVED_RECIPES', fetchFavorites);
  yield takeLatest('DELETE_SAVED', deleteSaved)
  yield takeLatest('FETCH_DRINK_TO_EDIT', fetchDrinkToEdit);
  yield takeLatest('UPDATE_DRINK', updateDrink);
}

export default recipesSaga;
