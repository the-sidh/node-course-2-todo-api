
var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    text: { type: String, minlength: 1, required: true },
    completed: Boolean,
    completedAt: Number
});

todoSchema.pre('save',function(next){
    console.log('dddd');
    next();
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };


// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// var todos = [
//     new Todo({
//         text: 'go to the gym',
//         completed: true,
//         completedAt: Date.now()

//     }),
//     new Todo({
//         text: 'walk the dog',
//         completed: true,
//         completedAt: Date.now()
//     }),
//     new Todo({
//         text: 'study',
//         completed: false,
//     })
// ]

// todos.forEach((element) => {
//     element.save().then((doc) => {
//         console.log(`${doc} object saved to the db`);
//     },
//         (err) => {
//             console.error('cant do');
//         });
// });


// newTodo.save().then(() => {
//     console.log('object saved to the db');
// }, (e) => {
//     console.error('cant do');
// });