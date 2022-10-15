import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* uploadImage(action){
    
    try{
        const image = yield axios({
            method: 'POST',
            url: '/api/upload',
            data: action.payload
        })
        console.log(image)
        yield put({
            type: 'SET_IMAGE',
            payload: image.data
          })
    } catch {
        console.log('error in addImage')
    }
}


function* imageSaga() {
    yield takeLatest('ADD_IMAGE', uploadImage);
   
  }

  export default imageSaga;
  