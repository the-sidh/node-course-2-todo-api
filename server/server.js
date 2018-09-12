var env = process.env.NODE_ENV || 'development';

if(env ==='development'){
    process.env.PORT=3000;
    process.env.MONGODB_URI= 'mongodb://localhost:27017/TodoApp';
}else if(env ==='test'){
    process.env.PORT=3000;
    process.env.MONGODB_URI= 'mongodb://localhost:27017/TodoAppTest'
}

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var { ObjectId } = require('mongodb').ObjectId;
var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

var app = express();

var port = process.env.PORT;

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

app.patch('/todo/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (ObjectId.isValid(id)) {
        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findByIdAndUpdate(id, { $set:  body  }, { new: true }).
        then((doc) => {
            if(doc){
                res.status(200).send(doc);
            }else{
                res.status(200).send('empty');
            }
         
        }, (err) => {
            res.status(400).send(err);
        });

    } else {
        res.status(400).send('invalid id');
    }

});

app.get('/todo', (req, res) => {
    var param;
    if (req.query.text) {
        param = req.query.text;
        Todo.findOne({ text: param }).then((todo) => {
            res.status(200).send({ todo });
        });
    } else if (req.query.done) {
        param = req.query.done;
        Todo.findOne({ done: param }).then((todo) => {
            res.status(200).send({ todo });
        });
    } else {
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
                res.status(200).send(`removed ${todo}`);
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