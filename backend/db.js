const mongoose = require('mongoose');
const { number } = require('zod');

mongoose.connect('mongodb://localhost:27017');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type:String,
        required:true,
        minLength:6
    },
    firstName:  {
        type: String,
        required: true,
        trim:true,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        trim:true,
        maxLength: 30
    }
});

const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model --> similar to foreign keys
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}