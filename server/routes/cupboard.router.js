const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//do I need to add reject not-authenticated to this?

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


  //this get route gets all cupboard ingredients by user for use in the pantry/suggest 
  //recipes feature
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


//get route for matching recipes in cupboard
router.get('/matches', rejectUnauthenticated, (req, res) => {
  // console.log(req.query.ids)
  
  //this gets the ids into a format that I can use in query
  const matchesArray = req.query.ids.split(",")
  const matchesIds=[]
  for (let match of matchesArray){
    matchesIds.push(Number(match))
  }
  const queryTxt = `
  SELECT recipes.name, recipes.description, recipes.image_url, recipes.notes, 
  recipes_line_items.ingredient_id, recipes_line_items.quantity, ingredients.ingredient_name, recipes.id 
        FROM recipes
        JOIN recipes_line_items
        ON recipes.id=recipes_line_items.recipe_id
        JOIN ingredients
        on recipes_line_items.ingredient_id=ingredients.id
        WHERE recipes.id = ANY ($1)
        ORDER BY recipes.id desc;
              `
  const sqlValues = [matchesIds];
  pool.query(queryTxt, sqlValues)
    .then(result => {
      // console.log(result.rows);

      //this pulls all recipe IDs from the result.rows
      let idArray = [];
      for(let object of result.rows){
        // console.log(object.id)
        idArray.push(object.id)
      }
      //this filters out duplicate IDs
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      let uniqueIds = idArray.filter(onlyUnique);
      
      //this groups result.rows by id
      const group = result.rows.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = [];
        }
      
        acc[item.id].push(item);
        return acc;
      }, {})

      //ths makes new recipe objects out of the data and gets them ready to send to client
      let recipes = []
      for(let i=0; i<uniqueIds.length; i++){
        let recipe = group[uniqueIds[i]]
        const{name, description, image_url, notes, id} = recipe[0]
        const recipeStepTwo = {name, description, image_url, notes, id}
        recipeStepTwo.ingredients = recipe.map(ingredient =>  {return({ingredient_name: ingredient.ingredient_name, id: ingredient.ingredient_id, quantity: ingredient.quantity})})
        // console.log(recipeStepTwo)
        recipes.push(recipeStepTwo)
      }
      //sending back to client here
      res.send(recipes);
    })
    .catch(err => {
      console.log('Error getting recipes on server side', err);
      res.sendStatus(500);
    })
});

//deletes a recipe from the saved recipes table
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
