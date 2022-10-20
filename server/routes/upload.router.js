const express = require('express');
const pool = require('../modules/pool');
const {cloudinary } = require('../modules/cloudinary.js'); //check this path
const router = express.Router();

router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb', extended: true}))


//this uploads an image to cloudinary
router.post('/', async (req, res) => {
    try{
        const fileStr = req.body.new_image_url;
        // console.log(fileStr);
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'mocktail',
        });
        console.log(uploadResponse);
        res.send(uploadResponse.url);
        const queryTxt = `
            INSERT INTO image ("image_url")
            VALUES
            ($1);
        `
        const queryValues= [uploadResponse.url]
        pool.query(queryTxt, queryValues)
    } catch (error){
        console.log(error)
        res.sendStatus(500);
    }
})

//this gets the image back from the image table to use in the add recipe saga
router.get('/', (req, res)=> {
try{
    const query = `SELECT * FROM "image"`;
    pool.query(query)
    .then( result => {
    res.send(result.rows);
})

} catch(err) {
console.log('ERROR:', err);
res.sendStatus(500)
}
})

module.exports = router;
