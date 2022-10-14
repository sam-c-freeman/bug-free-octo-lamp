import './Upload.css'
import { useState } from 'react'

function Upload () {
   const [fileInputState, setFileInputState] = useState('');
   const [selectedFile, setSelectedFile] = useState('');
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

   const uploadImage = async (base64EncodedImage) =>{
        try{
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({data: base64EncodedImage}),
                headers: {'Content-type': 'application/json'}

        }) 
        } catch (error){
            console.error(error);
        }
   }

    return(
        <div>
            <h1 id="upload">Upload</h1>
            <form onSubmit={handleSubmitFile} className="form">
                <input type="file" name="image" onChange={handleFileInputChange}
                value={fileInputState} className="form_input"></input>
                <button className="upload_button" type="submit">Submit</button>
            </form>
            {previewSource && (
                <img src={previewSource} alt="chosen"
                style={{height: '300px'}}
                />
            )}
        </div>
    )
}

export default Upload;