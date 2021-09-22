const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    // attributes of user
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: String
    }
});

module.exports = mongoose.model("User", UserSchema);
