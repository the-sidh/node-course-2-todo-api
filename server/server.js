var express = require('express');
var bodyParser = require('body-parser');

var { ObjectId } = require('mongodb').ObjectId;
var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/user', (req, res) => {
    if (req.query.email) {
        console.log(req.query.email);
        User.findOne({ email: req.query.email }).then((user) => {
            res.status(200).send({ user });
        });
    }
    else {
        User.find().then((users) => {
            res.status(200).send({ users });
        });

    }

});

app.get('/user/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectId.isValid(id)) {

        User.findById(id).then((users) => {
            if (users) {
                res.status(200).send({ users });
            } else {
                res.status(200).send('empty');
            }
        });
    } else {
        res.status(400).send('invalid id');
    }
});

app.get('/todo', (req, res) => {
    var param;
    if (req.query.text) {
        param = req.query.text;
        Todo.findOne({text: param}).then((todo) => {
            res.status(200).send({ todo });
        });
    } else if (req.query.done) {
        param = req.query.done;
        Todo.findOne({done: param}).then((todo) => {
            res.status(200).send({ todo });
        });
    } else{
        Todo.find().then((todos) => {
            res.status(200).send({ todos });
        });
    }

});

app.get('/todo/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectId.isValid(id)) {
        Todo.findById(id).then((todo) => {
            if (todo) {
                res.status(200).send({ todo });
            } else {
                res.status(200).send('empty');
            }
        });
    } else {
        res.status(400).send('invalid id');
    }

});


app.delete('/todo/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectId.isValid(id)) {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (todo) {
                res.status(200).send(`removed ${ todo }`);
            } else {
                res.status(200).send('empty');
            }
        });
    } else {
        res.status(400).send('invalid id');
    }

});
app.post('/todo', (req, res) => {
    var newTodo = new Todo({
        text: req.body.text
    });
    newTodo.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    });

})

app.listen(port);

module.exports = { mongoose, app };