const mongoose = require('mongoose')
    , moment = require('moment')
    , objectIdToTimestamp = require('objectid-to-timestamp')
    , Schema = mongoose.Schema

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

UserSchema.post('findOne', (result) => {
    if (result) {
        result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
})
UserSchema.post('find', function(results){
    results.forEach((item) => {
        item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
})
UserSchema.statics = {
    getUserByName: function(name) {
        return this
            .findOne({ name: name })
            .exec()
        next()
    }
}

module.exports = UserSchema