var express = require("express");
var session = require('express-session');
var mysql = require('mysql');

var app = express();

app.use(express.urlencoded());
app.use(session({secret: 'singlestore'}));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

                                        
var connection = mysql.createConnection({
    host     : ' svc-631ebe2a-f760-482e-819f-c79142547874-dml.aws-singapore-1.svc.singlestore.com',
    user     : 'superadmin',
    password : '1234',
    database : 'moviestore'
});




app.get('/', function(req, res) {
    console.log("hello world");

   

    res.render("index", {regerror: false, logerror: false});
});



app.post('/register', function (req, res){

    connection.query (
    
    ('SELECT * FROM movielist;', 
       function (error, results) {
        console.log(results);

        res.render("index", {regerror: false, logerror: false});
})
    
    
    , [], function (error, results) {
        if(results.length === 0){
            if(!req.body.Email || !req.body.Password || !req.body.Username){
                var regerror = "Please complete all required fields!"
                res.render("index", {regerror: regerror, logerror: false});
            } else {
                if (req.body.Password != req.body.PasswordConfirmation){
                    var regerror = "Passwords do not match!"
                    res.render("index", {regerror: regerror, logerror: false});
                } else {
               
                    connection.query('SELECT * FROM movies where movie name='userinput',  [] , function(error, results){
                        req.session.CurrUserId = results.insertId;
                        res.redirect("dashboard");
                    })
                }
            }
            
        } else {
            var regerror = "This email currently exists!"
            res.render("index", {regerror: regerror, logerror: false});
        }
    });
});


app.get("/dashboard", function (req, res){
   
    connection.query('SELECT * FROM movies where movie name = '$ userinput', [], function (error, userRes) {
     
        connection.query('SELECT * FROM movies where movie name = '$ userinput', [], function (error, movieresult) {
            res.render('dashboard', {user: userRes, alltoDos: movieresult});
        })
    })
})


app.get("/logout", function (req, res){
    req.session.destroy(function(err) {
        res.redirect("/");
      })
})


app.post('/login', function (req, res){
    
    connection.query('SELECT * FROM movies where movie name = '$ userinput', [], function (error, results) {
        if(results.length === 0){
            var logerror = "This email has not been registered. Please register or try again!";
            res.render("index", {logerror: logerror, regerror: false});
        } else {
            if(results[0].password != [req.body.PwToCheck]){
                var logerror = "The password is incorrect - please try again!";
                res.render("index", {logerror: logerror, regerror: false});
            } else {
                req.session.CurrUserId = results[0].userId;
                res.redirect("dashboard");
            }
        }
    })
})


app.post('/addToDo', function (req, res){

    connection.query('SELECT * FROM movies where movie name = '$ userinput', [], function (error, results) {
        res.redirect("dashboard");
    })
})


app.get("/delete/:userId", function (req, res){
    
    connection.query('SELECT * FROM movies where movie name = '$ userinput', [], function (error, results) {
        res.redirect("/dashboard");
    })
})


app.get("/edit/:todoid", function (req, res){
    
    connection.query('SELECT * FROM movies where movie name = '$ userinput', [], function (error, results) {
        res.render("edit", {todo: results});
    })
})


app.post('/EditTodo', function (req, res){
  
    connection.query('SELECT * FROM movies where movie name = '$ userinput', [], function (error, results) {
        res.redirect("dashboard");
    })
})



app.listen(8000, function() {
    console.log("listening on port 8000");
})