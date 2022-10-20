import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';


//this gets cupboard ingredients for the user
function* fetchCupboard (){
    try {
        const cupboard = yield axios.get('/api/cupboard');
        // console.log(cupboard.data)
        yield put ({type: 'SET_CUPBOARD', payload: cupboard.data});
    } catch (error) {
        console.log(error);
        alert('Error fetching cupboard');
    }
}

//this compares their ingredients to ingredients in a recipe
function* compareFunction (){
    try {
        const testCupboard = yield axios.get('/api/cupboard');
        const testRecipes = yield axios.get('/api/recipes');
       console.log(testCupboard.data)
       console.log(testRecipes.data)
        
        //this puts each cupboard item into an array to get it ready to compare to recipe arrays
        const cupboardArray = []
        for (let cupboardIngredient of testCupboard.data){
            cupboardArray.push(cupboardIngredient.ingredient_name)
        }
        console.log(cupboardArray); //this gets the ingredients into an array to compare
        

        //function that will check ingredients vs recipe arrays
        let checker = (arr, target) => target.every(v => arr.includes(v));
        let resultsArray = [];

        //if the cupboard has EVERY ingredient needed for a recipe, it will be pushed 
        //to the results array to send to server
        for(let recipeToCheck of testRecipes.data){
            console.log(recipeToCheck.ingredient_list)
            console.log(recipeToCheck.recipe_id)
            console.log(`recipe ${recipeToCheck.recipe_id} is a match:`, checker(cupboardArray, recipeToCheck.ingredient_list))
            if(checker(cupboardArray, recipeToCheck.ingredient_list) === true){
                resultsArray.push(recipeToCheck.recipe_id)
            }
            
        }

        console.log(resultsArray); 
        
        // saves IDs to the reducer so it is ready for get route
        yield all([
            put ({type: 'SET_MATCHING_IDS', payload: resultsArray}),
            put({type: 'FETCH_MATCHING_RECIPES', payload: resultsArray})
        ])
        
    } catch (error) {
        console.log(error);
        alert('Error in compare function');
    }
}

//route to get matching recipes based on IDs found in compare saga function
function* fetchMatches (action){
    console.log('test:', action.payload);
    const matches = action.payload
    let urlQuery = `/api/cupboard/matches?ids=${matches}`

    if(matches[0] === undefined){
        //possible solution but it breaks the recipe list
        yield put ({type: 'SET_MATCHING_RECIPES', payload: []});;
    } else {
        try {
            const recipes = yield axios.get(`${urlQuery}`);
            console.log(recipes.data)
            yield put ({type: 'SET_MATCHING_RECIPES', payload: recipes.data});
        } catch (error) {
            console.log(error);
            alert('Error setting recipes');
        }
    }
}

//delete an ingredient from cupboard feature
function* deleteIngredient (action){
   console.log(action.payload)
   const deleteId = action.payload
   try{
       const deleteIngredient = yield axios.delete(`/api/cupboard/${deleteId}`);
       yield all([ 
                put({type: 'FETCH_CUPBOARD'}),
                put  ({ type: 'COMPARE_CUPBOARD_RECIPES' })
       ])
   } catch {
       console.log('error in delete route for ingredients')
   }
}

//add an ingredient to a user's cupboard
function* addIngredient (action) {
    //will add new ingredient to user's cupboard!
    console.log(action.payload)
    const newIngredient = action.payload
    try {
        yield axios.post('/api/cupboard', newIngredient);
        yield put ({type: 'FETCH_CUPBOARD'})      
    } catch (error) {
        console.log(error);
        alert('Error adding ingredient');
    }
}

function* cupboardSaga() {
    yield takeLatest('FETCH_CUPBOARD', fetchCupboard);
    yield takeLatest('COMPARE_CUPBOARD_RECIPES', compareFunction); 
    yield takeLatest('DELETE_INGREDIENT', deleteIngredient);
    yield takeLatest('ADD_INGREDIENT', addIngredient);
    yield takeLatest('FETCH_MATCHING_RECIPES', fetchMatches);

  
   
  }

  export default cupboardSaga;