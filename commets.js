// create a simple web server
// npm install express --save
// npm install body-parser --save
// npm install mongoose --save

// 1. express
var express = require('express');
var app = express();

// 2. body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 3. mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');
var Comment = mongoose.model('Comment', {author: String, text: String});

// 4. static files
app.use(express.static(__dirname + '/public'));

// 5. routes
app.get('/comments', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});

app.post('/comments', function(req, res) {
    Comment.create({author: req.body.author, text: req.body.text}, function(err, comment) {
        if (err) {
            res.send(err);
        }
        Comment.find(function(err, comments) {
            if (err) {
                res.send(err);
            }
            res.json(comments);
        });
    });
});

// 6. listen
app.listen(8080);
console.log('App listening on port 8080');
 

