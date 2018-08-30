const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.error('cant connect');
    }
    console.log('connected succefully');

    // db.collection('Todos').deleteMany({text : 'eat'});
    //db.collection('Todos').deleteOne({done : true});

    db.collection('Users').deleteOne({_id : new ObjectId('5b882a94f098ac12b0ee6535')});
    // db.collection('Todos').findOneAndDelete({ done: true }).then((result) => {
    //     console.log(JSON.stringify(result));
    // }
    // ,(erro)=>{
    //     console.error('cant do '+ erro);
    // });
    db.close();

});