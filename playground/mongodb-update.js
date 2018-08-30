const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.error('cant connect');
    }
    console.log('connected succefully');


    db.collection('Users').findOneAndUpdate(
        { _id: new ObjectId('5b8829b42eaf4b1ae02ee807') },
        {
            $set: {
                name: 'Mari'
            },

            $inc: {
                age: 1
            }

        }, { 
            returnOriginal : false
        }
    ).then((result)=>{
        console.log(JSON.stringify(result));
    });

    db.close();

});