var db = require("../db");
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    email: String,
    password: String,
    secret: String
});



module.exports = mongoose.model('User', UserSchema);