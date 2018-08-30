const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.error('cant connect');
    }
    console.log('connected succefully');

    db.collection('Users').insertOne(
        {
            name: 'Sid',
            age: 39,
            location: 'SP'
        }, (err, result) => {
            if (err) {
                return 'cant do';
            }
            console.log('Done' + JSON.stringify(result.ops));

        });


    // db.collection('Todos').insertOne({
    //     text:'something to do',
    //     done: false
    // },(err,result)=>{
    //     if(err){
    //         return('something went wrong');
    //     }
    //     console.log(JSON.stringify(result.ops));
    // });
    db.close();

});