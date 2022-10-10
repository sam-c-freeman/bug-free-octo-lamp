const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryTxt = `
            SELECT * FROM ingredients;      
  `
pool.query(queryTxt)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('error in get ingredients route', err);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
