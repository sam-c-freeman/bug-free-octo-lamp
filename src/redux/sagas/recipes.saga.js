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
        console.log(cupboard.data)
        yield put ({type: 'SET_CUPBOARD', payload: cupboard.data});
    } catch (error) {
        console.log(error);
        alert('Error fetching cupboard');
    }
}

function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
  yield takeLatest('FETCH_CUPBOARD', fetchCupboard);
}

export default recipesSaga;
