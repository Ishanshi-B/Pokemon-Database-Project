
-- Authors: Ishanshi Bhardwaj

-- Data manipulation queries and ":" denotes the value that will be user-generated from the backend program. 

--  Create Operations 

-- Users 
-- Get all data from Users
SELECT * FROM Users;
-- Select the user_id from Users
SELECT * FROM Users WHERE user_id LIKE :user_id;

-- Add a new User
INSERT INTO Users (user_id, user_name, user_email, user_password)
VALUES (:user_id, :user_name, :user_email, :user_password);

-- Get a single user's data
SELECT user_id, user_name, user_email
FROM Users 
WHERE user_id = :user_id;

-- Delete a User 
DELETE FROM Users WHERE user_id = :user_id_from_page

--Update a User
UPDATE Users SET user_name = :user_name , user_email = :user_email WHERE user_id = :user_id;



-- Games
-- All the Games
SELECT * FROM Games;
-- Get a single save file game_id data 
SELECT * FROM Caught_Pokemon WHERE pokemon_id LIKE :pokemon_id;

SELECT game_id 
FROM Save_Files
INNER JOIN Games ON Save_Files.game_id = Games.game_id;

-- Add a new Games
INSERT INTO Games (game_id, game_name, game_generation)
VALUES (:game_id, :game_name, :game_generation);

-- Caught_Pokemon 
-- Get all pokemon information
SELECT * FROM Caught_Pokemon;

SELECT * FROM Caught_Pokemon
INNER JOIN Save_Files ON Caught_Pokemon.save_id = Save_Files.save_id
INNER JOIN Types AS Types1 ON Caught_Pokemon.type1_id = Types1.type_id
INNER JOIN Types AS Types2 ON Caught_Pokemon.type2_id = Types2.type_id;

-- Add a new pokemon into the database that was caught
INSERT INTO Caught_Pokemon (pokemon_id, pokemon_name, pokemon_hp, pokemon_attack, pokemon_defense, pokemon_sp_atk, pokemon_sp_def, pokemon_speed, pokemon_is_legendary, pokemon_regional_form, type1_id, type2_id, save_id)
VALUES (:pokemon_id, :pokemon_name, :pokemon_hp, :pokemon_attack, :pokemon_defense, :pokemon_sp_atk, :pokemon_sp_def, :pokemon_speed, :pokemon_is_legendary, :pokemon_regional_form, :type1_id, :type2_id, :save_id);
 
-- The user can select the pokemon they want to delete that they mightve accidentaly put in during their data putting process. 
DELETE FROM Caught_Pokemon
WHERE pokemon_id = :pokemon_id_from_the_page;

-- Types
-- Select a single type
SELECT * FROM Types;

--Add a type
INSERT INTO Types(type_name, type_weaknesses) VALUES (:type_name, :type_weaknesses);

--Delete a type
DELETE FROM Types WHERE type_id = (:type_id);

--Update a type
UPDATE Types SET type_name = :type_name , type_weaknesses = :type_weaknesses WHERE type_id = :type_id;



-- Save file
-- Get the data for the save_file
SELECT Users.user_name AS user, Games.game_name AS game, Save_Files.save_id AS save FROM Save_Files
INNER JOIN Users ON Users.user_id = Save_Files.user_id
INNER JOIN Games ON Games.game_id = Save_Files.game_id;

-- Add a new Save file 
INSERT INTO Save_Files(user_id, game_id)
VALUES (:user_id, :game_id);

-- Delete a Save file
DELETE FROM Save_Files 
WHERE save_id = :save_id_from_page;


--Game_Type_Limitation
SELECT Games.game_id AS game, Types.type_id AS type FROM Games_Types_Limitations
INNER JOIN Games ON Games.game_id = Games_Types_Limitations.game_id
INNER JOIN Types ON Types.type_id = Games_Types_Limitations.type_id;