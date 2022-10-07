const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//do I need to add reject not-authenticated to this?

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryTxt = `
              SELECT recipes.name, recipes.description, recipes_line_items.recipe_id, recipes.user_id, recipes.notes, ARRAY_AGG(recipes_line_items.quantity || ' ' || ingredients.name) as recipe, ARRAY_AGG(ingredients.name) as ingredient_list FROM recipes_line_items
                  JOIN recipes
                  ON recipes_line_items.recipe_id = recipes.id
                  JOIN ingredients
                  ON recipes_line_items.ingredient_id = ingredients.id
                  GROUP BY recipes.name, recipes.description,recipes_line_items.recipe_id, recipes.user_id, recipes.notes;
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

router.post('/matches', rejectUnauthenticated, (req, res) => {

function generateSelectStatement(numberOfIDs) {
    let flexibleValues = [];
    for (let i = 1; i<numberOfIDs +1; i++){
     flexibleValues.push(i);
    }
     console.log(flexibleValues)
    //  ` INSERT INTO "matching_recipes"
    // ("recipe_id")
    // VALUES
    // ($${flexibleValues});`
  }

  
let sqlValues = [(generateSelectStatement(req.body.length))]
const queryTxt = `
  INSERT INTO "matching_recipes"
    ("recipe_id")
    VALUES
    (${sqlValues});  
 `

//  console.log ((generateSelectStatement(req.body.length)))
  pool.query(queryTxt, sqlValues)
    .then(result => {
      result.sendStatus(201);
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
