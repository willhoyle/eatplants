copy app.food_group
from
    '/fixtures/csv/food_group.csv' delimiter '^' csv quote '~' header;

copy app.food
from
    '/fixtures/csv/food.csv' delimiter '^' csv quote '~' header;

copy app.nutrient
from
    '/fixtures/csv/nutrient.csv' delimiter '^' csv quote '~' header;

copy app.food_nutrient
from
    '/fixtures/csv/food_nutrient.csv' delimiter '^' csv quote '~' header;

copy app.food_measure_weight
from
    '/fixtures/csv/food_measure_weight.csv' delimiter '^' csv quote '~' header;

copy app.collection
from
    '/fixtures/csv/collection.csv' delimiter '^' csv quote '~' header;

copy app.collection_food_item
from
    '/fixtures/csv/collection_food_item.csv' delimiter '^' csv quote '~' header;

-- -- Food (Carrot, Potato, etc...)
-- create table app.food (
--     id integer primary key generated always as identity,
--     food_group_id integer references app.food_group (id),
--     long_description text,
--     short_description text,
--     common_name text
-- );
-- -- Nutrient (Protein, Carbs, Iron, etc...)
-- create table app.nutrient (
--     id integer primary key generated always as identity,
--     unit text, -- g, mg, ml etc...
--     name text -- protein
-- );
-- -- Food Nutrient (amount of nutrient per g and kcal)
-- create table app.food_nutrient (
--     nutrient_id integer references app.nutrient (id),
--     food_id integer references app.food (id),
--     value_per_g real,
--     value_per_kcal real,
--     primary key (nutrient_id, food_id)
-- );
-- -- Food Measure Weight (how much does a cup of dried lentils weigh?)
-- create table app.food_measure_weight (
--     food_id integer references app.food (id),
--     num_measures real, -- -->1<-- cup,
--     measure text, -- 1 -->cup<--, this might be another table since we'll have tons of 'cup', 'tbsp' entries here. let's wait and see
--     weight_in_g real -- weight in grams
-- );
-- -- Recipe
-- create table app.recipe (
--     id integer primary key generated always as identity,
--     name text,
--     description text,
--     tags text[] -- this might be another table. we'll see how the app evolves
-- );
-- -- Recipe Food Item
-- /*
-- Note: I know I will have to implement an ordering system because recipes need to list ingredients in the order they are used while cooking. It's going to be annoying to code so I'll put it off until I actually get to creating recipes
--  */
-- create table app.recipe_food_item (
--     recipe_id integer references app.recipe (id),
--     food_id integer references app.food (id),
--     amount_in_g real, -- this I'm not 100% sure about yet. we'll probably need something a bit more sophisticated than this
--     -- we can store it in grams but in the UI, show the nicer looking "1 cup" by using the food_measure_weight table
--     primary key (recipe_id, food_id)
-- );
-- -- Recipe recipe item (it's common to refer to another recipe as an ingredient in a recipe)
-- -- Just throwing this here but I won't implement this yet for version 1
-- -- Users can repeat for now
-- -- create table app.recipe_recipe_item (
-- -- TBD
-- -- );
-- -- Collection
-- create table app.collection (
--     id integer primary key generated always as identity,
--     name text,
--     description text,
--     tags text[] -- this might be another table. we'll see how the app evolves
-- );
-- -- Collection food item
-- create table app.collection_food_item (
--     food_id integer references app.food (id),
--     collection_id integer references app.collection (id),
--     primary key (food_id, collection_id)
-- );
-- -- Collection recipe item
-- create table app.collection_recipe_item (
--     recipe_id integer references app.recipe (id),
--     collection_id integer references app.collection (id),
--     primary key (recipe_id, collection_id)
-- );
-- -- Collection collection item
-- create table app.collection_collection_item (
--     collection_id integer primary key references app.collection (id)
-- );
-- commit;
