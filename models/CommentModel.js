const mongoose = require('mongoose')

var CommentSchema = require('../lib/schemas/commentSchema')
var Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment