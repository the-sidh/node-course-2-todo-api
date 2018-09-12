const request = require('supertest');
const expect = require('expect');
var mongoose = require('../server').mongoose;
var { app } = require('../server');
var { Todo } = require('../models/todo');
const { ObjectId } = require('mongodb').ObjectId;

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

beforeEach((done) => {
    Todo.remove({}).then(() => { return Todo.insertMany(todos) }).then(() => done());
});

describe('PATCH /todo:id', () => {
    it('should update an item', (done) => {
        var id = todos[0]._id;
        todos[0].text = 'updated';
        todos[0].completed = true;
        request(app).patch(`/todo/${id}`).expect(200).expect((res) => {
            expect(res.body.todo.text).toBe('updated').
            expect(res.body.todo.completed).toBe(true).
            expect(res.body.todo.completedAt).toBeA('number');
        });
        done();
    });

    it('should clear completedAt when completed equals false', (done) => {
        var id = todos[1]._id;
        todos[1].completed = false;
        request(app).patch(`/todo/${id}`).expect(200).expect((res) => {
            expect(res.body.todo.completed).toBe(false).
            expect(res.body.todo.completedAt).toNotExist();
        });
        done();
    });
});

describe('DELETE /todo:id', () => {
    it('should deleteta a todo', (done) => {
        request(app).delete(`/todo/${todos[0]._id}`).expect(200).expect((res) => {
            expect(res.body.todo.text).toBe('Fazer 1');
        });
        done();
    });
});

describe('GET /todo:id', () => {
    it('should return a todo', (done) => {
        request(app).get(`/todo/${todos[0]._id}`).
            expect(200).
            expect((res) => {
                expect(res.body.todo.text).toBe('Fazer 1');
            });
        done();
    });

    it('should return 400 as status code', (done) => {
        request(app).get('/todo/123').expect(400);
        done();

    });

    it('should empty', (done) => {
        request(app).get(`/todo/${new ObjectId}`).
            expect(200).
            expect((res) => {
                expect(res.body).toBe('empty');
            });
        done();

    });


});

describe('GET /todo', () => {
    it('should return all the todos', (done) => {
        request(app).
            get('/todo').
            expect(200).
            expect((res) => {
                expect(res.body.todos.length).toBe(2);
            });
        done();
    });
});

describe('POST /todo', () => {
    it('should create a new user in the database', (done) => {
        request(app).
            post('/todo').
            send({ text: 'test from mocha' })
            .expect(200).expect((res) => {
                expect(res.body.text).toBe('test from mocha')
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(
                        todos[2].text).toBe('test from mocha');
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create a new user in the database', (done) => {
        request(app).
            post('/todo').
            send({ text: '' })
            .expect(400).expect((res) => {
                expect(res.body.text).toBe(undefined)
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});
