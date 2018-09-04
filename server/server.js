var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

var app = express();

app.use(bodyParser.json());

app.post('/todo', (req, res) => {
    var newTodo = new Todo({
        text: req.body.text
    });
    newTodo.save().then((doc)=>{
        res.status(200).send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
   
})

app.listen(3000);
