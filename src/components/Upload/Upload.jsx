import './Upload.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
 
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
      
             <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            >
            <Grid item xs={12}>
            <Typography gutterBottom variant="h6" component="div" className="upload">
                Upload Image
             </Typography>
             </Grid>
             <Grid item>
            {/* <form onSubmit={handleSubmitFile} className="form"> */}
                <input type="file" name="image" onChange={handleFileInputChange}
                value={fileInputState} className="form_input"></input>
                <button className="upload_button" type="submit" onClick={handleSubmitFile}>Save</button>
            {/* </form> */}
            </Grid>
            <Grid container
             direction="column"
             alignItems="center"
             sx={{mt:1}}
             justify="center">
            {previewSource && (
                <img src={previewSource} alt="chosen"
                style={{height: '200px'}}
                />
            )}
            </Grid>
            </Grid>
        
       
    )
}
 
export default Upload;

