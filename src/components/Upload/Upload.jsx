import './Upload.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
 
function Upload () {
   const [fileInputState, setFileInputState] = useState('');
   const [previewSource, setPreviewSource] = useState()
 
   const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
   }
 
   const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        setPreviewSource(reader.result);
    }
   }
 
   const handleSubmitFile = (e) => {
    e.preventDefault();
    if(!previewSource) return;
    uploadImage(previewSource);
   }

   const dispatch =useDispatch();
 
   const  uploadImage = (base64EncodedImage) => {
    dispatch({
        type: 'ADD_IMAGE',
        payload:{new_image_url:base64EncodedImage},
        headers:{'Content-type': 'application/json'}
    })
} 
 
    return(
        <div>
            <h1 id="upload">Upload Image</h1>
            {/* <form onSubmit={handleSubmitFile} className="form"> */}
                <input type="file" name="image" onChange={handleFileInputChange}
                value={fileInputState} className="form_input"></input>
                <button className="upload_button" type="submit" onClick={handleSubmitFile}>Save</button>
            {/* </form> */}
            {previewSource && (
                <img src={previewSource} alt="chosen"
                style={{height: '300px'}}
                />
            )}
        </div>
    )
}
 
export default Upload;

