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

function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
}

export default recipesSaga;
