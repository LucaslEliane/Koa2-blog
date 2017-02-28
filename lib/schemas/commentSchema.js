const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , marked = require('marked')
    , objectIdToTimestamp = require('objectid-to-timestamp')
    , moment = require('moment')

const CommentSchema = new Schema({
    author: String,
    content: String,
    postId: String
})

CommentSchema.post('find', (comments) => {
    return comments.map((comment) => {
        comment.content = marked(comment.content)
        return comment
    })
})
CommentSchema.post('find', function(results){
    results.forEach((item) => {
        item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
})

CommentSchema.statics = {
    delCommentById: function (commentId, author) {
        return this
            .remove({ author: author, _id: commentId })
            .exec()
    },
    delCommentsByPostsId: function (postId) {
        return this
            .remove({ postId: postId })
            .exec()
    },
    getComments: function (postId) {
        return this
            .find({ postId: postId })
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: 1 })
            .exec()
    },
    getCommentsCount: function (postId) {
        return this
            .count({ postId: postId })
            .exec()
    }
}

module.exports = CommentSchema