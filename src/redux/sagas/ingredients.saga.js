import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchIngredients (){
    try {
        const ingredients = yield axios.get('/api/ingredients');
        // console.log(recipes.data)
        yield put ({type: 'SET_INGREDIENTS', payload: ingredients.data});
    } catch (error) {
        console.log(error);
        alert('Error fetching ingredients');
    }
}


function* ingredientsSaga() {
    yield takeLatest('FETCH_INGREDIENTS', fetchIngredients);
   
  }

  export default ingredientsSaga;
  

