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
// console.log(req.user.id)

function generateSelectStatement(numberOfIDs) {
  let flexibleValues = [];
  // console.log(numberOfIDs)
  for (let i = 1; i<numberOfIDs +1; i++){
   flexibleValues.push(`($` + i + `)`);
  }
   console.log(flexibleValues)
return ` INSERT INTO "matching_recipes"
  ("recipe_id") 
  VALUES
  ${flexibleValues} ;`
}
  pool.query((generateSelectStatement(req.body.length)), req.body)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error getting recipes on server side', err);
      res.sendStatus(500);
    })
});



router.get('/matches', rejectUnauthenticated, (req, res) => {
  const queryTxt = `
            SELECT recipes.name, recipes.description, recipes_line_items.recipe_id, ARRAY_AGG(recipes_line_items.quantity || ' ' || ingredients.name) FROM matching_recipes
                JOIN recipes
                ON matching_recipes.recipe_id=recipes.id
                JOIN recipes_line_items
                ON recipes.id = recipes_line_items.recipe_id
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



/**
 * POST route to add recipe
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const user_id = req.user.id
  const numberIngredients = Object.keys(req.body).length;
  console.log(numberIngredients);
  console.log(user_id)
  console.log(req.body);
  const insertRecipeQuery = `
  INSERT INTO "recipes" ("name", "description", "notes", "image_url", "user_id")
  VALUES ($1, $2, $3, $4, $5)
  RETURNING "id";`

  // FIRST QUERY ADDS RECIPES
  pool.query(insertRecipeQuery, [req.body.name, req.body.description, req.body.notes, req.body.image_url, user_id])
  .then(result => {
    console.log('New Recipe Id:', result.rows[0].id); //ID IS HERE!
    
    const createdRecipeId = result.rows[0].id
    

    // Now handle the lineItems reference
    const insertLineItem = `
      INSERT INTO "recipes_line_items" ("recipe_id", "ingredient_id", "quantity")
      VALUES  ($1, $2, $3);
      `
      // SECOND QUERY ADDS LINE ITEM FOR THAT NEW RECIPE
      pool.query(insertLineItem, [createdRecipeId, req.body.ingredientId1, req.body.quantity1]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
});

module.exports = router;
