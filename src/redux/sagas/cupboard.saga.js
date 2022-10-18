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
       
        const cupboardArray = []
        for (let cupboardIngredient of testCupboard.data){
            // console.log(cupboardIngredient.name)
            cupboardArray.push(cupboardIngredient.ingredient_name)
        }
        console.log(cupboardArray); //this gets the ingredients into an array to compare
        


        let checker = (arr, target) => target.every(v => arr.includes(v));
        let resultsArray = [];

       

        for(let recipeToCheck of testRecipes.data){
            console.log(recipeToCheck.ingredient_list)
            console.log(recipeToCheck.recipe_id)
            console.log(checker(cupboardArray, recipeToCheck.ingredient_list))
            if(checker(cupboardArray, recipeToCheck.ingredient_list) === true){
                resultsArray.push(recipeToCheck.recipe_id)
            }
            
        } //this checks the cupboard compared to recipes list

        console.log(resultsArray); 
        
        //this gives me the recipe_id of matching recipes.  Will
        //need to create a reducer to hold this data?
  
        // yield put ({type: 'SET_MATCHING_IDS', payload: resultsArray});
        yield all([
            put ({type: 'SET_MATCHING_IDS', payload: resultsArray}),
            // put({type: 'FETCH_MATCHES'})
        ])
        
    } catch (error) {
        console.log(error);
        alert('Error in compare function');
    }
}

//this send matches to the matches table
function*postMatchingRecipes (action){
    try {
        const idsToGet = action.payload;
        console.log(idsToGet);
        const matches = yield axios.post(`/api/recipes/matches`, idsToGet);
        console.log(matches.data)
        yield put ({type: 'GET_MATCHING_RECIPES'});
    } catch (error) {
        console.log(error);
        alert('Error setting matching recipes');
    }
}

//this gets matches and filters out duplicates
function* getMatchingRecipes (){
   
    try {
        const recipes = yield axios.get('/api/recipes/matches');
        console.log(recipes.data)
        const recipesArray=recipes.data
        const unique = [...new Map(recipesArray.map((m) => [m.id, m])).values()];
        console.log(unique);

        yield put ({type: 'SET_MATCHING_RECIPES', payload: unique});
    } catch (error) {
        console.log(error);
        alert('Error setting recipes');
    }
}

function* deleteIngredient (action){
   console.log(action.payload)
   const deleteId = action.payload
   try{
       const deleteIngredient = yield axios.delete(`/api/cupboard/${deleteId}`);
       yield put({type: 'FETCH_CUPBOARD'})
   } catch {
       console.log('error in delete route for ingredients')
   }
}

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
    yield takeLatest('POST_MATCHING_RECIPES', postMatchingRecipes);
    yield takeLatest('GET_MATCHING_RECIPES', getMatchingRecipes); 
    yield takeLatest('DELETE_INGREDIENT', deleteIngredient);
    yield takeLatest('ADD_INGREDIENT', addIngredient);

  
   
  }

  export default cupboardSaga;
  