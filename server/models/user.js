
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            }, message: '{VALUE} is not valid'

        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },

        token: {
            type: String,
            required: true,
        }
    }]
});

userSchema.methods.toJSON = function () {
    return { email: this.email, _id: this._id };
};

userSchema.methods.generateAuthToken = async function () {

    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: this._id.toHexString(),
        access
    }, 'mysecret').toString();
    user.tokens = user.tokens.concat({ access, token });

    await user.save();

    return token;
}

userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'mysecret');
    } catch (err) {
        return new Promise((resolve, reject) => { reject(); });
    }

    var userfound = User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });

    return userfound;
}

var User = mongoose.model('User', userSchema);

module.exports = { User };
