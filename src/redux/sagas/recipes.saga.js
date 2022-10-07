import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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
        // console.log(cupboardArray); //this gets the ingredients into an array to compare
        
       
        // for (let recipeItem of testRecipes.data){
        //     console.log(recipeItem.ingredient_list)
           
        // }

        let checker = (arr, target) => target.every(v => arr.includes(v));
        let resultsArray = [];

        for(let recipeToCheck of testRecipes.data){
            // console.log(recipeToCheck)
            // console.log(checker(recipeToCheck.ingredient_list , cupboardArray))
            if(checker(recipeToCheck.ingredient_list , cupboardArray) === true){
                resultsArray.push(recipeToCheck.recipe_id)
            }
            
        } //this checks the cupboard compared to recipes list

        // console.log(resultsArray); 
        
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

function* getMatchingRecipes (action){
    try {
        const idsToGet = action.payload;
        const matches = yield axios.get(`/api/recipes/${idsToGet}`);
        // console.log(matches.data)
        yield put ({type: 'SET_MATCHING_RECIPES', payload: matches.data});
    } catch (error) {
        console.log(error);
        alert('Error setting matching recipes');
    }
}


function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
  yield takeLatest('FETCH_CUPBOARD', fetchCupboard);
  yield takeLatest('COMPARE_CUPBOARD_RECIPES', compareFunction);
  yield takeLatest('GET_MATCHING_RECIPES', getMatchingRecipes);
}

export default recipesSaga;
