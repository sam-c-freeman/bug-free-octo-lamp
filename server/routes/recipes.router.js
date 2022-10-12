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
  // console.log(req.user.id)
  const sqlValues = [req.user.id]
  const queryTxt = `
            SELECT recipes.name, recipes.id, recipes.description, recipes.image_url, recipes_line_items.recipe_id, recipes.user_id, recipes.notes, ARRAY_AGG(recipes_line_items.quantity || ' ' || ingredients.name) as recipe, ARRAY_AGG(ingredients.name) as ingredient_list FROM saved_recipes
                JOIN recipes
                ON saved_recipes.recipe_id = recipes.id
                JOIN recipes_line_items
                ON recipes.id = recipes_line_items.recipe_id
                JOIN ingredients
                ON recipes_line_items.ingredient_id = ingredients.id
                WHERE saved_recipes.user_id = $1
                GROUP BY recipes.name, recipes.id, recipes.description, recipes.image_url, recipes_line_items.recipe_id, recipes.user_id, recipes.notes;
      `
  pool.query(queryTxt, sqlValues)
    .then(result => {
      res.send(result.rows);
      // console.log(result.rows)
    })
    .catch(err => {
      console.log('Error getting favorites on server side', err);
      res.sendStatus(500);
    })
});


//Need to get userid and req.body into one array
//Need to loop through to post each recipe seperately


router.post('/matches', rejectUnauthenticated, (req, res) => {
console.log(req.user.id)
let userId = req.user.id
console.log(req.body)
const sqlValues = req.body
sqlValues.unshift(userId);

function generateSelectStatement(numberOfIDs) {
  
  
  let flexibleValues = [];
  // console.log(numberOfIDs)

  
  for (let i = 1; i<numberOfIDs +1; i++){
   flexibleValues.push(`$` + (i + 1) );
  }
  //  console.log(flexibleValues)
return ` INSERT INTO "matching_recipes"
  ("user_id", "recipe_id") 
  VALUES
  ($1, ${flexibleValues} ) ;`
}
console.log(generateSelectStatement(req.body.length, userId))
  pool.query((generateSelectStatement(req.body.length, userId)), sqlValues)
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



//Updated Post route for adding a drink!
router.post('/', rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  const userId = req.user.id

  try{
    const{
      name,
      description,
      notes,
      image_url,
      ingredients
    } = req.body;
  
  await client.query('BEGIN')
  const firstQueryTxt = await client.query(`INSERT INTO "recipes" ("name", "description", "notes", "image_url", "user_id")
  VALUES ($1, $2, $3, $4, $5)
  RETURNING "id";`, [name, description, notes, image_url, userId])
  const createdRecipeId = firstQueryTxt.rows[0].id

  await Promise.all(ingredients.map (ingredient =>{
    const insertLineItem = `
    INSERT INTO "recipes_line_items" ("recipe_id", "ingredient_id", "quantity")
    VALUES  ($1, $2, $3);
    `
    const lineItemValues = [createdRecipeId, ingredient.ingredient, ingredient.quantity]
    return client.query(insertLineItem, lineItemValues)
  }));

    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error in post route for new recipe', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
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

//delete route for saved recipe

router.delete('/saved/:id', rejectUnauthenticated, (req, res) => {
  // console.log(req.params.id)
  
  const queryText = 'DELETE FROM saved_recipes WHERE recipe_id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing delete saved recipe query', err);
      res.sendStatus(500);
    });
});


module.exports = router;

