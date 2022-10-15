const express = require('express');
const pool = require('../modules/pool');
const {cloudinary } = require('../modules/cloudinary.js'); //check this path
const router = express.Router();

router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb', extended: true}))



router.post('/', async (req, res) => {
    try{
        const fileStr = req.body.new_image_url;
        // console.log(fileStr);
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'mocktail',
        });
        console.log(uploadResponse);
        res.send(uploadResponse.url);
        // const queryTxt = `
        //     INSERT INTO recipes ("image_url")
        //     VALUES
        //     ($1);
        // `
        // const queryValues= [uploadResponse.url]
        // pool.query(queryTxt, queryValues)
    } catch (error){
        console.log(error)
        res.sendStatus(500);
    }
})

module.exports = router;
