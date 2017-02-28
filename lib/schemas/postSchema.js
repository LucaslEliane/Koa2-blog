const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , marked = require('marked')
    , moment = require('moment')
    , objectIdToTimestamp = require('objectid-to-timestamp')

const PostSchema = new Schema({
    author: Schema.Types.ObjectId,
    title: String,
    content: String,
    pv: Number,
    commentsCount: {
        type: Number,
        default: 0
    }
})

PostSchema.post('find', (posts) => {
    return posts.map((post) => {
        post.content = marked(post.content)
        return post
    })
})

PostSchema.post('findOne', (post) => {
    if (post) {
        post.content = marked(post.content)
    }
    return post
})

PostSchema.post('findOne', (result) => {
    if (result) {
        result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
})
PostSchema.post('find', function(results){
    results.forEach((item) => {
        item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
})

PostSchema.statics = {
    getPostById: function(postId) {
        return this
            .findOne({ _id: postId})
            .populate({ path: 'author', model: 'User'})
            .exec()
    },
    getPosts: function(author) {
        let query = {}
        if (author) {
            query.author = mongoose.Types.ObjectId(author)
        }
        return this
            .find(query)
            .populate({ path: 'author', model: 'User'})
            .sort({ _id: -1 })
            .exec()
    },
    incPv: function(postId) {
        return this
            .update({ _id: postId }, { $inc: { pv: 1 } })
            .exec()
    },
    getRawPostById: function(postId) {
        return this
            .findOne({ _id: postId})
            .populate({ path: 'author', model: 'User'})
            .exec()    
    },
    updatePostById: function(postId, author, data) {
        return this
            .update({ author: author, _id: postId }, { $set: data })
            .exec()
    },
    delPostById: function(postId, author) {
        return this
            .remove({ author: author, _id: postId })
            .exec()
    }
}

module.exports = PostSchema