const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//do I need to add reject not-authenticated to this?

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryTxt = `
              SELECT recipes.name, recipes.id, recipes.description, recipes.image_url, recipes_line_items.recipe_id, recipes.user_id, recipes.notes, ARRAY_AGG(recipes_line_items.quantity || ' ' || ingredients.name) as recipe, ARRAY_AGG(ingredients.name) as ingredient_list FROM recipes_line_items
                  JOIN recipes
                  ON recipes_line_items.recipe_id = recipes.id
                  JOIN ingredients
                  ON recipes_line_items.ingredient_id = ingredients.id
                  GROUP BY recipes.name, recipes.id, recipes.description, recipes.image_url, recipes_line_items.recipe_id, recipes.user_id, recipes.notes;
      `
  pool.query(queryTxt)
    .then(result => {
      res.send(result.rows);
      // console.log(result.rows)
    })
    .catch(err => {
      console.log('Error getting recipes on server side', err);
      res.sendStatus(500);
    })
});

//this gets favorites
router.get('/favorites', rejectUnauthenticated, (req, res) => {
  const queryTxt = `
            SELECT recipes.name, recipes.id, recipes.description, recipes.image_url, recipes_line_items.recipe_id, recipes.user_id, recipes.notes, ARRAY_AGG(recipes_line_items.quantity || ' ' || ingredients.name) as recipe, ARRAY_AGG(ingredients.name) as ingredient_list FROM saved_recipes
                JOIN recipes
                ON saved_recipes.recipe_id = recipes.id
                JOIN recipes_line_items
                ON recipes.id = recipes_line_items.recipe_id
                JOIN ingredients
                ON recipes_line_items.ingredient_id = ingredients.id
                GROUP BY recipes.name, recipes.id, recipes.description, recipes.image_url, recipes_line_items.recipe_id, recipes.user_id, recipes.notes;
      `
  pool.query(queryTxt)
    .then(result => {
      res.send(result.rows);
      // console.log(result.rows)
    })
    .catch(err => {
      console.log('Error getting favorites on server side', err);
      res.sendStatus(500);
    })
});



router.post('/matches', rejectUnauthenticated, (req, res) => {
console.log(req.user.id)
let user_id = req.user.id
console.log(req.body)

function generateSelectStatement(numberOfIDs) {
  let flexibleValues = [];
  // console.log(numberOfIDs)
  for (let i = 1; i<numberOfIDs +1; i++){
   flexibleValues.push(`($` + i + `)`);
  }
  //  console.log(flexibleValues)
return ` INSERT INTO "matching_recipes"
  ("recipe_id") 
  VALUES
  ${flexibleValues}  ;`
}
console.log(generateSelectStatement(req.body.length))
  pool.query((generateSelectStatement(req.body.length)), req.body)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error getting recipes on server side', err);
      res.sendStatus(500);
    })
});


//this saves recipes to favorites list
router.post('/save', rejectUnauthenticated, (req, res) => {
 const recipeToSave = req.body.drinkId;
 const user_id = req.user.id;
 const sqlText = `
            INSERT INTO saved_recipes ("user_id", "recipe_id")
            VALUES
            ($1, $2);

 ` 
const sqlValues = [user_id, recipeToSave];
    pool.query(sqlText, sqlValues)
      .then(result => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('Error saving recipes on server side', err);
        res.sendStatus(500);
      })
  });



//this was my first attempt to get matching recipes but it returns ALL recipes that have been posted.
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
    let ingredients = req.body.ingredients;
    console.log('Ingredients array', ingredients)  
    for(let ingredient of ingredients){
      pool.query(insertLineItem, [createdRecipeId, ingredient.ingredient, ingredient.quantity])
      .then(result => {
        //trying to send multiple ingredients
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })
    }


// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
});


//GET ONE DRINK ROUTE//


router.get('/:id', (req, res) => {
  // console.log('In get route for one drink');
  const sqlText = 

  `
        SELECT recipes.name, recipes.id, recipes.description, recipes.notes, recipes.image_url, recipes_line_items.recipe_id, recipes.user_id, recipes.notes, ARRAY_AGG(recipes_line_items.quantity || ' ' || ingredients.name) as recipe, ARRAY_AGG(ingredients.name) as ingredient_list FROM recipes_line_items
          JOIN recipes
          ON recipes_line_items.recipe_id = recipes.id
          JOIN ingredients
          ON recipes_line_items.ingredient_id = ingredients.id
          WHERE recipes.id = $1
          GROUP BY recipes.name, recipes.description, recipes.image_url, recipes.notes, recipes_line_items.recipe_id, recipes.user_id, recipes.notes, recipes.id;
  `
  const sqlValues=[req.params.id]
  pool.query(sqlText, sqlValues)
    .then(dbRes => {
      res.send(dbRes.rows[0])
    })
    .catch(dbErr =>{
      console.log('dbErr', dbErr);
    })
})


module.exports = router;


// for (let i = 2; i<numberOfIDs +2; i++){
//   flexibleValues.push(`($1,` + ' ' + `$` + i + `)`);
//  }
//  //  console.log(flexibleValues)
// return ` INSERT INTO "matching_recipes"
//  ("user_id, "recipe_id") 
//  VALUES

//  ${flexibleValues}  ;`


 //this has the right sql code but still has CB function error
