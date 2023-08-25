------- Project Step 2 Draft CS 340 Ishanshi Bhardwaj -------

SET FOREIGN_KEY_CHECKS=0
SET AUTOCOMMIT = 0;

------- Creating the table for Users -------

CREATE OR REPLACE TABLE Users (
    user_id int(11) NOT NULL AUTO_INCREMENT,
    user_name varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

------- Creating the table for Games -------

CREATE OR REPLACE TABLE Games (
    game_id int(11) NOT NULL AUTO_INCREMENT,
    game_name varchar(255) NOT NULL,
    game_generation int(11) NOT NULL,
    PRIMARY KEY (game_id)
);

------- Transaction table for Users and Games -------

CREATE OR REPLACE TABLE Save_Files (
    save_id int(11) NOT NULL AUTO_INCREMENT,
    user_id int(11),
    game_id int(11),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES Games(game_id)ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (save_id)
);

------- Creating the table for Types -------

CREATE OR REPLACE TABLE Types (
    type_id int(11) UNIQUE AUTO_INCREMENT,
    type_name varchar(255) UNIQUE NOT NULL,
    type_weaknesses varchar(511) NOT NULL,
    PRIMARY KEY (type_id)
);

------- Creating the table for Caught_Pokemon -------

CREATE OR REPLACE TABLE Caught_Pokemon (
    pokemon_id int(11) NOT NULL AUTO_INCREMENT,
    save_id int(11) NOT NULL AUTO_INCREMENT,
    type1_id int(11) NOT NULL,
    type2_id int(11),
    pokemon_name varchar(255) NOT NULL,
    pokemon_hp int(11) NOT NULL,
    pokemon_attack int(11) NOT NULL,
    pokemon_defense int(11) NOT NULL,
    pokemon_sp_atk int(11) NOT NULL,
    pokemon_sp_def int(11) NOT NULL,
    pokemon_speed int(11) NOT NULL,
    pokemon_is_legendary int(1) NOT NULL,
    pokemon_regional_form varchar(255),
    PRIMARY KEY (pokemon_id),
    FOREIGN KEY (save_id) REFERENCES Save_Files(save_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (type1_id) REFERENCES Types(type_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (type2_id) REFERENCES Types(type_id) ON UPDATE CASCADE ON DELETE CASCADE
);

------- Intersection table between Games and Types ------- 

CREATE OR REPLACE TABLE Games_Types_Limitations (
    game_id int(11),
    type_id int(11),
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES Types(type_id)  ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (game_id, type_id)
);


------- Adding Data into the Users Table -------

INSERT INTO Users(user_id, user_name, user_email, user_password)
VALUES
(1, 'Matt Johnson', 'matt@myspace.com', 'Cats@12'),
(2, 'Lila Smith', 'lila@myspace.com', 'Ralph@123'),
(3, 'Michael Jackson', 'mc@myspace.com', 'music@34'),
(4, 'Brian Lee', 'brian@outlook.com', 'France@12'),
(5, 'Sophia Rodriguez', 'sophie@hotmail.com', 'Doll@7');


------- Adding Data into the Games Table -------

INSERT INTO Games(game_id, game_name, game_generation)
VALUES
(1, 'Red', 2),
(2, 'Blue', 4),
(3, 'Silver', 5),
(4, 'Yellow', 1),
(5, 'Gold', 3);

------- Adding Data into the Save_file Table -------

INSERT INTO Save_Files(user_id, game_id, save_id)
VALUES
(1, 2, 1),
(2, 3, 2),
(3, 4, 3),
(4, 1, 4),
(5, 5, 5);

------- Adding Data into the Types Table -------

INSERT INTO Types(type_id, type_name, type_weaknesses)
VALUES
(1, 'Grass', 'Flying, Poison, Bug, Fire, Ice'),
(2, 'Fire', 'Ground, Rock, Water'),
(3, 'Water', 'Grass, Electric'),
(4, 'Poison', 'Ground, Psychic'),
(5, 'Normal', 'Fighting');

------- Adding Data into the Caught_Pokemon Table -------

INSERT INTO Caught_Pokemon(pokemon_id, pokemon_name, pokemon_hp, pokemon_attack, pokemon_defense, pokemon_sp_atk, pokemon_sp_def, pokemon_speed, pokemon_is_legendary, pokemon_regional_form, type1_id, type2_id, save_id)
VALUES
(1, 'Bulbasaur', 45, 49, 49, 65, 65, 45, 0, 'form 1', 1, 4,1 ),
(2, 'Ivysaur', 60, 62, 63, 80, 80, 60, 0, 'form 2', 1, 4, 2),
(3, 'Venusaur', 80, 82, 83, 100, 100, 80, 0, 'form 3', 1, 4,3 ),
(4, 'Charmander', 39, 52, 43, 60, 50, 65, 0, 'form 1', 2, NULL,4 ),
(5, 'Charmeleon', 58, 64, 58, 80, 65, 80, 0, 'form 2', 2, NULL, 5);

INSERT INTO Games_Types_Limitations(game_id, type_id)
VALUES
(1, 1),
(4, 1),
(1, 3),
(5, 3),
(3, 5);

SET FOREIGN_KEY_CHECKS = 1;