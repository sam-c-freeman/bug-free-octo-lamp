import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRecipes (){
    //get route here
}

function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
}

export default recipesSaga;
