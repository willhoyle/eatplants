begin;

create schema app;

create schema app_private;

create role user_anonymous;

create role user_basic;

create role user_super;

grant usage on schema app to user_anonymous, user_basic, user_super;

grant usage on schema app_private to user_super;

create table app_private.person (
    id integer generated always as identity,
    email text not null unique check (email ~* '^.+@.+\..+$'),
    password_hash text default null,
    display_name text unique,
    role_id text default 'user_basic',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create extension if not exists "pgcrypto";

create type app.current_person as (
    id integer,
    email text,
    display_name text,
    role_id text,
    created_at timestamptz,
    updated_at timestamptz
);

-- create function app.register_person (email text, password text)
--     returns app.current_person
--     as $$
-- declare
--     person app.current_person;
-- returning
--     * into person;
--     insert into app.person_account (person_id,
--         email,
--         password_hash)
--     values (person.id,
--         email,
--         crypt(password, gen_salt('bf')));
--     return person;
-- end;
-- $$
-- language plpgsql
-- strict
-- security definer;
-- create type app.jwt_token as (
--     role text,
--     person_id integer
-- );
-- create function app.authenticate (email text, password text)
--     returns app.jwt_token
--     as $$
--     select
--         (role_id,
--             person_id)::app.jwt_token
--     from
--         app.person_account
--     where
--         person.email = $1
--         and person_account.password_hash = crypt($2, person_account.password_hash);
-- $$
-- language sql
-- strict
-- security definer;
-- comment on function app.authenticate (text, text) is 'Creates a JWT token that will securely identify a person and give them certain permissions.';
-- create function app.current_person ()
--     returns app.person
--     as $$
--     select
--         *
--     from
--         app.person
--     where
--         id = current_setting('jwt.claims.person_id', true)::integer
-- $$
-- language sql
-- stable;
-- comment on function app.current_person () is 'Gets the person who was identified by our JWT.';
-- create function app.change_password (current_password text, new_password text)
--     returns boolean
--     as $$
-- declare
--     current_person app.person;
-- begin
--     current_person := app.current_person ();
--     if exists (
--         select
--             1
--         from
--             app.person_account
--         where
--             person_account.person_id = current_person.id
--             and person_account.password_hash = crypt($1, person_account.password_hash)) then
--     update
--         app.person_account
--     set
--         password_hash = crypt($2, gen_salt('bf'))
--     where
--         person_account.person_id = current_person.id;
--     return true;
-- else
--     return false;
-- end if;
-- end;
-- $$
-- language plpgsql
-- strict
-- security definer;
-- Food Group
create table app.food_group (
    id smallint primary key generated always as identity,
    -- don't think we'll need more than 32767 food groups lol
    name text
);

-- Food (Carrot, Potato, etc...)
create table app.food (
    id integer primary key generated always as identity,
    food_group_id integer references app.food_group (id),
    long_description text,
    short_description text,
    common_name text
);

-- Nutrient (Protein, Carbs, Iron, etc...)
create table app.nutrient (
    id integer primary key generated always as identity,
    unit text, -- g, mg, ml etc...
    name text -- protein
);

-- Food Nutrient (amount of nutrient per g and kcal)
create table app.food_nutrient (
    id integer primary key generated always as identity,
    nutrient_id integer references app.nutrient (id),
    food_id integer references app.food (id),
    value_per_g real,
    value_per_kcal real,
    unique (nutrient_id, food_id)
);

-- Food Measure Weight (how much does a cup of dried lentils weigh?)
create table app.food_measure_weight (
    id integer primary key generated always as identity,
    food_id integer references app.food (id),
    num_measures real, -- -->1<-- cup,
    measure text, -- 1 -->cup<--, this might be another table since we'll have tons of 'cup', 'tbsp' entries here. let's wait and see
    weight_in_g real -- weight in grams
);

-- Recipe
create table app.recipe (
    id integer primary key generated always as identity,
    name text,
    description text
);

-- Recipe Food Item
/*
Note: I know I will have to implement an ordering system because recipes need to list ingredients in the order they are used while cooking. It's going to be annoying to code so I'll put it off until I actually get to creating recipes
 */
create table app.recipe_food_item (
    id integer primary key generated always as identity,
    recipe_id integer references app.recipe (id),
    food_id integer references app.food (id),
    amount_in_g real, -- this I'm not 100% sure about yet. we'll probably need something a bit more sophisticated than this
    -- we can store it in grams but in the UI, show the nicer looking "1 cup" by using the food_measure_weight table
    unique (recipe_id, food_id)
);

-- Recipe recipe item (it's common to refer to another recipe as an ingredient in a recipe)
-- Just throwing this here but I won't implement this yet for version 1
-- Users can repeat for now
-- create table app.recipe_recipe_item (
-- TBD
-- );
-- Collection
create table app.collection (
    id integer primary key generated always as identity,
    name text,
    description text
);

-- Collection food item
create table app.collection_food_item (
    id integer primary key generated always as identity,
    food_id integer references app.food (id),
    collection_id integer references app.collection (id),
    unique (food_id, collection_id)
);

-- Collection recipe item
create table app.collection_recipe_item (
    id integer primary key generated always as identity,
    recipe_id integer references app.recipe (id),
    collection_id integer references app.collection (id),
    unique (recipe_id, collection_id)
);

-- Collection collection item
create table app.collection_collection_item (
    id integer primary key generated always as identity,
    collection_id integer references app.collection (id)
);

commit;

