const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
    id : 10
};

var token = jwt.sign(data,'mysecret') ;



console.log(token);


console.log(jwt.verify(token,'mysecret'));



// var hash = SHA256(message).toString();

// console.log(hash);