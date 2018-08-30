const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.error('cant connect');
    }
    console.log('connected succefully');

    db.collection('Users').find({ name: 'Sid' }).count().then(
        (count) => {
            console.log(count);

        },
        (err) => {
            console.error(err);
         });

    // db.collection('Todos').find({ done: false }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs), undefined, 2);
    // }, (err) => {
    //     console.error(err)
    // });


    db.close();

});