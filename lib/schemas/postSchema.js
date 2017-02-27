const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const PostSchema = new Schema({
    author: Schema.Types.ObjectId,
    title: String,
    content: String,
    pv: Number
})


module.exports = PostSchema