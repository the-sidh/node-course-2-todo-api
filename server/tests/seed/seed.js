var { Todo } = require('./../../models/todo');
var { User } = require('./../../models/user');
const { ObjectId } = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');

var todos = [
    {
        text: 'Fazer 1',
        _id: new ObjectId
    },

    {
        text: 'Fazer 2',
        _id: new ObjectId,
        completed: true,
        completedAt: 333
    }];

const user1Id = new ObjectId;
const user2Id = new ObjectId;

var users = [
    {
        _id: user1Id,
        email: 'sidharta.rezende@gmail.com',
        password: '1234567',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: user1Id, access : 'auth'}, 'mysecret').toString()
        }]
    },
    {
        _id: user2Id,
        email: 'mari.saito@gmail.com',
        password: 'abcdetfds',
     }

]

const populateUsers = (done) => {
    User.remove({}).then((done) => {
        var user1Promise = new User(users[0]).save();
        var user2Promise = new User(users[1]).save();
        return Promise.all([user1Promise,user2Promise])
    }).then(() => {
        done() 
    });
}

const populateTodos = (done) => {
    Todo.remove({}).then((done) => {
        return Todo.insertMany(todos)
    }).then(() => { done() });
}

module.exports = { populateTodos, todos, populateUsers, users };