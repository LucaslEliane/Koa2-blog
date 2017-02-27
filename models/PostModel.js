const mongoose = require('mongoose')

var PostSchema = require('../lib/schemas/postSchema')
var Post = mongoose.model('post', PostSchema)

module.exports = Post