const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//do I need to add reject not-authenticated to this?

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryTxt = `
              SELECT recipes.name, recipes.id, recipes.description, recipes.image_url, recipes_line_items.recipe_id, recipes.user_id, recipes.notes, ARRAY_AGG(recipes_line_items.quantity || ' ' || ingredients.ingredient_name) as recipe, ARRAY_AGG(ingredients.ingredient_name) as ingredient_list FROM recipes_line_items
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
            SELECT recipes.name, recipes.id, recipes.description, recipes.image_url, recipes_line_items.recipe_id, recipes.user_id, recipes.notes, ARRAY_AGG(recipes_line_items.quantity || ' ' || ingredients.ingredient_name) as recipe, ARRAY_AGG(ingredients.ingredient_name) as ingredient_list FROM saved_recipes
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


router.post('/matches', rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  console.log(req.body)
  console.log(req.user.id)
  const matchesToAdd = req.body;
  try{
      await client.query('BEGIN');
          await Promise.all(matchesToAdd.map (match =>{
            const insertRecipe = `
            INSERT INTO "matching_recipes" ("recipe_id", "user_id")
            VALUES  ($1, $2);
            `
          const lineItemValues = [match, req.user.id]
          return client.query(insertRecipe, lineItemValues)
  }));
    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
 
    
  
  }});
  


//this saves recipes to favorites list
router.post('/save', rejectUnauthenticated, (req, res) => {
 console.log(req.body)
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

  //second attempt at getting matches without post route
  //not working because I don't know how to send multiple IDs


  // router.get('/matches', rejectUnauthenticated, async (req, res) => {
  //   const client = await pool.connect();
  //   console.log(req.body)
  //   const idsToGet = req.body
  //   // console.log(req.user.id)
  //   try{
  //       await client.query('BEGIN');
  //           await Promise.all(idsToGet.map (id =>{
  //             const getRecipe = `
  //             SELECT recipes.name, recipes.description, recipes.image_url, recipes.notes, recipes_line_items.ingredient_id, recipes_line_items.quantity, ingredients.ingredient_name 
  //               FROM recipes
  //               JOIN recipes_line_items
  //               ON recipes.id=recipes_line_items.recipe_id
  //               JOIN ingredients
  //               on recipes_line_items.ingredient_id=ingredients.id
  //               WHERE recipes.id=$1;
  //             `
  //           return client.query(getRecipe, [id])
  //   }));
  //     await client.query('COMMIT')
  //     res.send(result.rows)
  //     // console.log(result.rows)
  //     res.sendStatus(201);
  //   } catch (error) {
  //     await client.query('ROLLBACK')
   
      
    
  //   }
  // });



router.get('/matches', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryTxt = `
        SELECT recipes.name, recipes.description, recipes.image_url, recipes.notes, 
        recipes_line_items.ingredient_id, recipes_line_items.quantity, ingredients.ingredient_name, recipes.id 
              FROM matching_recipes
              JOIN recipes
              ON matching_recipes.recipe_id=recipes.id
              JOIN recipes_line_items
              ON recipes.id=recipes_line_items.id
              JOIN ingredients
              on recipes_line_items.ingredient_id=ingredients.id
              WHERE matching_recipes.user_id=$1;
      `
  pool.query(queryTxt, [userId])
    .then(result => {
      res.send(result.rows);
      console.log(result.rows)
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
console.log(req.body);
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
  //can I add another query here to add to saved?
    const savedTxt = `
            INSERT INTO saved_recipes ("user_id", "recipe_id")
              VALUES
              ($1, $2);

    `
    await client.query(savedTxt, [userId, createdRecipeId] )
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


    
    





//attempt at re-doing one drink get route


router.get('/:id', (req, res) => {
  // console.log('In get route for one drink');
  const sqlText = 
  `
  SELECT recipes.name, recipes.id, recipes.description, recipes.notes, 
  recipes.image_url, recipes_line_items.id as line_item_id, recipes_line_items.recipe_id, recipes.user_id, recipes.notes, recipes_line_items.ingredient_id, saved_recipes.recipe_id as saved_recipe_id, ingredients.ingredient_name,recipes_line_items.quantity
        FROM recipes_line_items
        JOIN recipes
        ON recipes_line_items.recipe_id = recipes.id
        JOIN ingredients
        ON recipes_line_items.ingredient_id = ingredients.id
        LEFT JOIN saved_recipes
        ON recipes.id = saved_recipes.recipe_id
        WHERE recipes.id = $1;
  `
  const sqlValues=[req.params.id]
  pool.query(sqlText, sqlValues)
    .then(dbRes => {
      // console.log(dbRes.rows)
      console.log(dbRes.rows[0])
      const {name, description, notes, image_url, recipe_id, user_id, saved_recipe_id} = dbRes.rows[0];
      const recipe = {name, description, notes, image_url, recipe_id, user_id};
      recipe.ingredients = dbRes.rows.map(ingredient =>  {return({ingredient_name: ingredient.ingredient_name, id: ingredient.ingredient_id, quantity: ingredient.quantity, line_item_id: ingredient.line_item_id})})
      // console.log(recipe);
      // console.log(ingredients)
      if(saved_recipe_id === null){
        recipe.saved = false
      } else {
        recipe.saved=true
      }
      res.send(recipe);
    })
    .catch(dbErr =>{
      console.log('dbErr', dbErr);
    })
})


router.put('/:id', rejectUnauthenticated, async (req, res) => {
  // Update one drink
  console.log('PUT /recipes/:id')
  // console.log(req.body)
  const connection = await pool.connect();

  const {id, name, description, notes, image_url, ingredients} = req.body
 
 //update SQL TEXT for recipes table
  const firstSqlText = `
    UPDATE recipes
      SET
        name = $1, 
        description = $2,
        notes = $3,
        image_url = $4

      WHERE
        id = $5
  `;
  const firstSqlValues = [name, description, notes, image_url, id]
  try{
    await connection.query('BEGIN');
    await connection.query(firstSqlText, firstSqlValues)
    await Promise.all(ingredients.map (ingredient =>{  
      const updateLineItem = `
      UPDATE recipes_line_items 
        SET
          ingredient_id = $1,
          quantity = $2

        WHERE id =$3
    `
    //I think I need to get line_item ID
      const lineItemValues = [ingredient.id, ingredient.quantity, ingredient.line_item_id]
      console.log(lineItemValues)
      return connection.query(updateLineItem, lineItemValues)
    }));
    await connection.query('COMMIT')
    res.sendStatus(201);
  } catch (dbErr){
    console.log('Error in PUT route', dbErr)
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  }
});



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

