const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    avatar: String,
    gender: {
        type: String,
        enum: ['m', 'f', 'x']
    },
    bio: String
})

UserSchema.statics = {
    find: function(name, cb) {
        return this
            .find({name: name})
            .exec(cb)
    }
}

module.exports = UserSchema