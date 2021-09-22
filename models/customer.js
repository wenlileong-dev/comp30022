const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    // attributes of customer
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    givenName: {
        type: String
    },
    familyName: {
        type: String
    },
    // MongoDB GeoPoint format
});

module.exports = mongoose.model("Customer", CustomerSchema);
