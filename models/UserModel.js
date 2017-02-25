const mongoose = require('mongoose')

var UserSchema = require('../lib/schemas/userSchema')
var User = mongoose.model('User', UserSchema)

module.exports = User