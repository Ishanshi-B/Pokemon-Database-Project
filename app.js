/*
Name: Ishanshi Bhardwaj 
Citation: Most of the code used in this project are adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/
Date: 3/21/23

/*
    SETUP
*/
// Express
const express = require('express');
// Handlebars
var hbs = require('hbs')

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 46099;
// Database
var db = require('./database/db-connector');
var exphbs = require('express-handlebars');
const {query} = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs"
}));

app.set('view engine', 'hbs')

app.use(express.static('public'));

/*
    ROUTES
*/

// Just including this one so that the root doesn't show as an error.
app.get('/', function(req, res)
{
    res.render('index');
});

app.get('/index.hbs', function(req, res)
{
    res.render('index');
});

//Select for the login and Reading for the login 
app.get('/login.hbs', function(req, res)
{
    let query1;
    if(req.query.id === undefined){
        query1 = "SELECT * FROM Users;";    

    }
    else{
        query1 = `SELECT * FROM Users WHERE user_id LIKE "${req.query.id}%"`
    }     

        db.pool.query(query1, function(error, rows, fields){    

            res.render('login', {user_data: rows});                   
        })    
});

//Select for the Pokdex and Reading for the Pokedex  
app.get('/pokedex.hbs', function(req, res)

{
    let query1;          
    if(req.query.id === undefined){
        query1 = "SELECT * FROM Caught_Pokemon;";
    }
    else{
        query1 = `SELECT * FROM Caught_Pokemon WHERE pokemon_id LIKE "${req.query.id}%"`
    }
    db.pool.query(query1, function(err, results, fields){
        res.render('pokedex', {pokemon_data: results});
    });
});

//Select for the Pokemon and Reading for the Pokemon  
app.get('/pokemon.hbs', function(req, res)
{
       // If there is no query string, we just perform a basic SELECT
       let query1;          
       if(req.query.id === undefined){
           query1 = "SELECT * FROM Caught_Pokemon;";
       }
       else{
        query1 = `SELECT * FROM Caught_Pokemon WHERE pokemon_id LIKE "${req.query.id}%"`
    }

    db.pool.query(query1, function(err, results, fields){
        res.render('pokemon', {pokemon_data: results});
    });

});


//Select Games 
app.get('/games.hbs', function(req, res)
{
    let query1;          
    if(req.query.id === undefined){
        query1 = "SELECT * FROM Games;";
    }
    else{
        query1 = `SELECT * FROM Games WHERE game_id LIKE "${req.query.id}%"`
    }
        db.pool.query(query1, function(error, rows, fields){    

            res.render('games', {game_data: rows});                  
        })                                                      
});

//Select types 
app.get('/types.hbs', function(req, res)
{
    let query1;
    if(req.query.id === undefined){
        query1 = "SELECT * FROM Types;";    

    }
    else{
        query1 = `SELECT * FROM Types WHERE type_id LIKE "${req.query.id}%"`
    }     

        db.pool.query(query1, function(error, rows, fields){    

            res.render('types', {type_data: rows});                  
        })      
});

//Select intersection tables 
app.get('/intersection_tables.hbs', function(req, res)
{
            let query1 = `SELECT Users.user_name AS user, Games.game_name AS game, Save_Files.save_id AS save FROM Save_Files
            INNER JOIN Users ON Users.user_id = Save_Files.user_id
            INNER JOIN Games ON Games.game_id = Save_Files.game_id;`;
            let query3 =  `SELECT Games.game_id AS game, Types.type_id AS type FROM Games_Types_Limitations
            INNER JOIN Games ON Games.game_id = Games_Types_Limitations.game_id
            INNER JOIN Types ON Types.type_id = Games_Types_Limitations.type_id;`;
            let query2 = `SELECT * FROM Save_Files;`;

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){
            
            let games = rows;
            
            db.pool.query(query3, (error, rows, fields) => {
                
                let save = rows;
                
                db.pool.query(query2, (error, rows, fields) => {
                
                    return res.render('intersection_tables', {data: games, planets: save});
                })  
                
            })  

            
        })

});


//Adding Pokemon
app.post('/add-pokemon-form', function(req, res){
    console.log("Add Pokemon");

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    // Capture NULL values
    let pokemon_hp = parseInt(data.pokemon_hp);
    if (isNaN(pokemon_hp)) {
        pokemon_hp = "NULL"
        console.log("hp NULL");
    }

    let pokemon_attack = parseInt(data.pokemon_attack);
    if (isNaN(pokemon_attack)) {
        pokemon_attack = "NULL"
        console.log("atk NULL");
    }

    let pokemon_defense = parseInt(data.pokemon_defense);
    if (isNaN(pokemon_defense)) {
        pokemon_defense = "NULL"
        console.log("def NULL");
    }

    let pokemon_sp_atk = parseInt(data.pokemon_sp_atk);
    if (isNaN(pokemon_sp_atk)) {
        pokemon_sp_atk = "NULL"
        console.log("spatk NULL");
    }

    let pokemon_sp_def = parseInt(data.pokemon_sp_def);
    if (isNaN(pokemon_sp_def)) {
        pokemon_sp_def = "NULL"
        console.log("spdef NULL");
    }

    let pokemon_speed = parseInt(data.pokemon_speed);
    if (isNaN(pokemon_speed)) {
        pokemon_speed = "NULL"
        console.log("speed NULL");
    }

    let type1_id = data.type1_id;
    if (isNaN(type1_id)) {
        type1_id = "NULL"
        console.log("type1 NULL");
    }

    let type2_id = data.type2_id;
    if (isNaN(type2_id)) {
        type2_id = "NULL"
        console.log("type2 NULL");
    }
    // Create the query and run it on the database
    query1 = `INSERT INTO Caught_Pokemon( pokemon_name, pokemon_hp, pokemon_attack, pokemon_defense, pokemon_sp_atk, pokemon_sp_def, pokemon_speed, pokemon_is_legendary, pokemon_regional_form, type1_id, type2_id, save_id) 
              VALUES ('${data.pokemon_name}', ${data.pokemon_hp}, ${data.pokemon_attack}, ${data.pokemon_defense} , ${data.pokemon_sp_atk}, ${data.pokemon_sp_def}, ${data.pokemon_speed}, ${data.pokemon_is_legendary}, '${data.pokemon_regional_form}', ${data.type1_id}, ${data.type2_id}, ${data.save_id})`
               
    console.log(query1);

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/pokemon.hbs');
        }
    })
})


//Adding Users
app.post('/add-users-form', function(req, res){
    console.log("Add Users");

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    // Capture NULL values
    let user_name = data['user_name'];
    if (isNaN(user_name)) {
        user_name = "NULL"
    }
    let user_email = data['user_email'];
    if (isNaN(user_email)) {
        user_email = "NULL"
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Users(user_name, user_email) VALUES ('${data['user_name']}', '${data['user_email']}')`;
    console.log(query1);
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/login.hbs');
        }
    })
})

//adding Games
app.post('/add-games-form', function(req, res){
    console.log("Add Games");

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    // Capture NULL values
    let game_generation = parseInt(data['game_generation']);
    if (isNaN(game_generation)) {
        game_generation = "NULL"
        console.log("generation NULL");
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Games(game_name, game_generation) VALUES ('${data.game_name}', ${data.game_generation})`;
    console.log(query1);
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/games.hbs');
        }
    })
})

//adding types 
app.post('/add-types-form', function(req, res){
    console.log("Add Types");

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    // Capture NULL values
  
    // Create the query and run it on the database
    query1 = `INSERT INTO Types(type_name, type_weaknesses) VALUES ('${data['type_name']}', '${data['type_weaknesses']}')`;
    console.log(query1);
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/types.hbs');
        }
    })
})

//delete Games 
app.delete('/delete-games-form', function(req,res,next){
    let data = req.body;
    let game_id = parseInt(data.games_id);
    let deleteGame = `DELETE FROM Games WHERE game_id = ?`;
    console.log(deleteGame);

          // Run the 1st query
        db.pool.query(deleteGame, [game_id],function(error, rows, fields){
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else
            {
                    res.sendStatus(204);
            }

})});

//Delete User
app.delete('/delete-users-form', function(req,res,next){
    let data = req.body;

    let user_id = parseInt(data.user_id);
    let deleteUser = `DELETE FROM Users WHERE user_id = ?`;
    console.log(deleteUser);

  
          // Run the 1st query
        db.pool.query(deleteUser, [user_id],function(error, rows, fields){
            if (error) {
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else
            {
                res.sendStatus(204);
            }

})});

//Delete Pokemon
app.delete('/delete-pokemon-form', function(req,res,next){
    let data = req.body;
    let pokemon_id = parseInt(data.pokemon_id);
    let deletePokemon = `DELETE FROM Caught_Pokemon WHERE pokemon_id = ?`;
    console.log(pokemon_id);

    // Run the 1st query
        db.pool.query(deletePokemon, [pokemon_id],function(error, rows, fields){
            if (error) {
  
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else
            {
                res.sendStatus(204);

            }

})});

//Delete Types 
app.delete('/delete-types-form', function(req,res,next){
    let data = req.body;
    let type_id = parseInt(data.type_id);
    let deleteType = `DELETE FROM Types WHERE type_id = ?`;
    console.log(type_id);
    // Run the 1st query
    db.pool.query(deleteType, [type_id],function(error, rows, fields){
        if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);

        }

})});
  



//Update Games 
app.put('/update-game-form', function(req, res, next){
    let data = req.body;

    let game_name = (data.game_name);
    let game_generation = parseInt(data.game_generation);
    let queryUpdateGames= `UPDATE Games
                            SET game_name = ? , game_generation = ?
                            WHERE game_id = '${parseInt(data.game_id)}';`
    let querySelectGames = `SELECT * FROM Games;`
    console.log(queryUpdateGames);

    db.pool.query(queryUpdateGames, [game_name, game_generation], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(querySelectGames, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
         
        }
    })
});

//Update Types
app.put('/update-type-form', function(req, res, next){
    let data = req.body;

    let type_name = (data.type_name);
    let type_weaknesses = data.type_weaknesses;
    let queryUpdateTypes= `UPDATE Types
                            SET type_name = ? , type_weaknesses = ?
                            WHERE type_id = '${parseInt(data.type_id)}';`
    let querySelectTypes = `SELECT * FROM Types;`
    console.log(queryUpdateTypes);

    db.pool.query(queryUpdateTypes, [type_name, type_weaknesses], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(querySelectTypes, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
         
        }
    })
});

//Update Users 
app.put('/update-user-form', function(req, res, next){
    let data = req.body;

    let queryUpdateUser= `UPDATE Users
                            SET user_name = '${data.user_name}', user_email = '${data.user_email}'                            
                            WHERE user_id = '${parseInt(data.user_id)}';`
    let querySelectUser = `SELECT * FROM Users;`
    console.log(queryUpdateUser);

    db.pool.query(queryUpdateUser, function(error, rows, fields){
        if (error) {
            console.log(error);

            res.sendStatus(400);
        }
        else {
            db.pool.query(querySelectUser, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
         
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function()
{ 
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
