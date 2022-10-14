const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb', extended: true}))



router.post('/', (req, res) => {
    try{
        const fileStr = req.body.data;
        console.log(fileStr);
    } catch (error){
        console.log(error)
    }
})

module.exports = router;
