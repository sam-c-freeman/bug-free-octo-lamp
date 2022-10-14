const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//do I need to add reject not-authenticated to this?

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  
  const queryTxt = `
              SELECT ingredients.ingredient_name, cupboard.user_id FROM cupboard
                      JOIN ingredients
                      ON cupboard.ingredient_id = ingredients.id
                      WHERE cupboard.user_id = $1
                      GROUP by ingredients.ingredient_name, cupboard.user_id
                      ORDER BY cupboard.user_id;
              `
  const sqlValues = [userId];
  pool.query(queryTxt, sqlValues)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error getting recipes on server side', err);
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
