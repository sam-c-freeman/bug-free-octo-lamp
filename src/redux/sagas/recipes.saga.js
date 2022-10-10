import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRecipes (){
    try {
        const recipes = yield axios.get('/api/recipes');
        console.log(recipes.data)
        yield put ({type: 'SET_RECIPES', payload: recipes.data});
    } catch (error) {
        console.log(error);
        alert('Error fetching recipes');
    }
}


//this may need to be a different saga?
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

function* compareFunction (){
    try {
        const testCupboard = yield axios.get('/api/cupboard');
        const testRecipes = yield axios.get('/api/recipes');
    //    console.log(testCupboard.data)
    //    console.log(testRecipes.data)
       
        const cupboardArray = []
        for (let cupboardIngredient of testCupboard.data){
            // console.log(cupboardIngredient.name)
            cupboardArray.push(cupboardIngredient.name)
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
    

        // console.log(checker( testRecipes.data[0].ingredient_list , cupboardArray))
        // console.log(checker( testRecipes.data[1].ingredient_list , cupboardArray))

  
        yield put ({type: 'SET_MATCHING_IDS', payload: resultsArray});
        
    } catch (error) {
        console.log(error);
        alert('Error in compare function');
    }
}

function*postMatchingRecipes (action){
    try {
        const idsToGet = action.payload;
        console.log(idsToGet);

        //this step is sending the correct number of IDS but get route is 
        //getting back the wrong number
        
        // const matches = yield axios.get(`/api/recipes/${idsToGet}`);   //changing from this method to send multiple?
        const matches = yield axios.post(`/api/recipes/matches`, idsToGet);
        // console.log(matches.data)
        yield put ({type: 'GET_MATCHING_RECIPES'});
    } catch (error) {
        console.log(error);
        alert('Error setting matching recipes');
    }
}


function* getMatchingRecipes (){
    try {
        const recipes = yield axios.get('/api/recipes/matches');
        // console.log(recipes.data)
        yield put ({type: 'SET_MATCHING_RECIPES', payload: recipes.data});
    } catch (error) {
        console.log(error);
        alert('Error setting recipes');
    }
}

function* addRecipe (action) {
    try {
        console.log(action.payload)
        const newRecipe = action.payload
        yield axios.post('/api/recipes', newRecipe);
        yield put ({type: 'FETCH_RECIPES'});
    } catch (error) {
        console.log(error);
        alert('Error fetching recipes');
    }
}

function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
  yield takeLatest('FETCH_CUPBOARD', fetchCupboard);
  yield takeLatest('COMPARE_CUPBOARD_RECIPES', compareFunction);
  yield takeLatest('POST_MATCHING_RECIPES', postMatchingRecipes);
  yield takeLatest('GET_MATCHING_RECIPES', getMatchingRecipes);
  yield takeLatest('ADD_RECIPE', addRecipe);
}

export default recipesSaga;
