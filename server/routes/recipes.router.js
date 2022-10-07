const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//do I need to add reject not-authenticated to this?

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryTxt = `
            SELECT recipes.name, recipes.description, recipes.notes, recipes_line_items.recipe_id, recipes.user_id, ARRAY_AGG(recipes_line_items.quantity || ' ' || ingredients.name) FROM recipes_line_items
                JOIN recipes
                ON recipes_line_items.recipe_id = recipes.id
                JOIN ingredients
                ON recipes_line_items.ingredient_id = ingredients.id
                GROUP BY recipes.name, recipes.description, recipes.notes, recipes_line_items.recipe_id, recipes.user_id;
  `
  pool.query(queryTxt)
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
