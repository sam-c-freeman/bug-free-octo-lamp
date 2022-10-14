
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


--this table stores recipes
CREATE TABLE recipes(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(120) NOT NULL,
  "description" VARCHAR (1000) NOT NULL,
  "image_url" VARCHAR,
  "likes" INTEGER default 0,
  "user_id" INTEGER REFERENCES "user",
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
  
);
--some recipes for the above table
INSERT INTO recipes
	("name", "description", "image_url", "user_id")
	VALUES
	('Mock Mule', 'A non-alcoholic take on a classic', 'images/moscowMule.jpeg', 2),
	('Virgin Mojito', 'Non-alcoholic mojito mocktail', 'images/mojito.jpg', 1),
	('Shirley Temple', 'Sam''s childhood favorite', 'images/shirley.jpg', 2),
	('Juicy Julep', 'A simple non-alcoholic version of the popular derby drink', 'images/mintJulep.jpeg', 2);

--table for ingredients
CREATE TABLE ingredients (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (100) NOT NULL
  );

--to add data to ingredients
INSERT INTO "ingredients"
  ("ingredient_name")
  VALUES
  ('Lime'), ('Soda Water'), 
  ('Grapefruit Juice'), ('Ice'), 
  ('Ginger Beer'), ('Lime Juice');

  INSERT INTO "ingredients"
  ("ingredient_name")
  VALUES
  ('Mint'), ('Orange Juice'), ('Pineapple Juice'), 
  ('Ginger Ale'), ('Grenadine'), ('Maraschino Cherries'), 
  ('Lemon-Lime Soda'), ('Simple Syrup'), ('Club Soda'), ('Lime Wedge'),
  ('Lemon Juice'), ('Perrier L''Orange'), ('Cara Cara Orange'),
  ('Lemon Soda'), ('Peach Juice');
  



--recipe line items table
CREATE TABLE recipes_line_items (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" INTEGER REFERENCES "recipes",
  "ingredient_id" INTEGER NOT NULL REFERENCES "ingredients",
  "quantity" VARCHAR NOT NULL,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
  );

--recipe line items
INSERT INTO "recipes_line_items"
  ("recipe_id", "ingredient_id", "quantity")
  VALUES
  (1, 4, '1 1/2 Cups'),
  (1, 5, '1 Cup'),
  (1, 1, 'Juice of 2'),  
  (1, 15, '1/3 Cup'),
  (1, 7, 'For Garnish'); --moscow mule

INSERT INTO "recipes_line_items"
  ("recipe_id", "ingredient_id", "quantity")
  VALUES
  (3, 4, ''),
  (3, 11, '1 Oz'),
  (3, 13, '8 Oz'),  
  (3, 12, '1'); --shirley temple

  INSERT INTO "recipes_line_items"
  ("recipe_id", "ingredient_id", "quantity")
  VALUES
  (4, 16, '1'),
  (4, 7, '1 tsp and 1 sprig'),
  (4, 6, '1 Oz'),  
  (4, 10, '1'),
  (4, 8, '1 Oz'),
  (4, 9, '1 Oz'),
  (4, 4, ''); --juicy julep
  

INSERT INTO "recipes_line_items"
  ("recipe_id", "ingredient_id", "quantity")
  VALUES
  (2, 1, '1'),
  (2, 7, '15 Leaves of'),
  (2, 6, '1 Oz'),  
  (2, 14, '1/2 Oz'),
  (2, 15, '4 Oz'),
  (2, 4, ''); --virgin mojito

--this table keeps tracks of recipes that a user saves to their account

CREATE TABLE "saved_recipes" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user",
  "recipe_id" INTEGER REFERENCES recipes
);











--this table is for my stretch goal of storing a user's ingredients at home and then suggesting recipes
CREATE TABLE "cupboard" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user",
  "ingredient_id" INTEGER REFERENCES ingredients
);
