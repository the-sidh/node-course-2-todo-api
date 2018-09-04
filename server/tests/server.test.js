const request = require('supertest');
const expect = require('expect');
var mongoose = require('../server').mongoose;
var {app} = require('../server');
var {Todo} = require('../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
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
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe('test from mocha');
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
                expect(todos.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });
    });
});
