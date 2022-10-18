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
              SELECT ingredients.ingredient_name, ingredients.id, cupboard.user_id FROM cupboard
                      JOIN ingredients
                      ON cupboard.ingredient_id = ingredients.id
                      WHERE cupboard.user_id = $1
                      GROUP by ingredients.ingredient_name, ingredients.id, cupboard.user_id
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


router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const deleteId = (req.params.id)
  const userId = (req.user.id)

  const queryText = `
            DELETE FROM cupboard
                  WHERE cupboard.ingredient_id =$1
                  AND cupboard.user_id =$2;
            `;
  const sqlValues = [deleteId, userId]
  pool.query(queryText, sqlValues )
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing delete ingredient query', err);
      res.sendStatus(500);
    });
});
/**
 * POST route for adding cupboard ingredients
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // console.log(req.body);
  const newIngredient = req.body
  const userId = req.user.id
  try{
    const sqlQuery = `
                INSERT INTO cupboard ("user_id", "ingredient_id")
                    VALUES
                   ($1, $2);
    `
    const sqlValues = [userId, newIngredient.id]
    pool.query(sqlQuery, sqlValues)
    res.sendStatus(201);
  } catch (error) {
    console.log('Error adding ingredient on server side', error)
    res.sendStatus(500);
  }
});

module.exports = router;
