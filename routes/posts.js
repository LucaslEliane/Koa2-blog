const checkLogin = require('../middlewares/check').checkLogin
    , KoaBody = require('koa-body')({
        text: true
    })
    , PostModel = require('../models/PostModel')
    , CommentModel = require('../models/CommentModel')

module.exports = function(router) {


    router.get('/posts', async function(ctx, next){
        let author = ctx.request.query.author,
            post
        await PostModel.getPosts(author)
            .then(function(posts) {
                post = posts
            })
            .catch(next)

        await ctx.render('posts', {
            blog: {
                title: 'blog'
            },
            posts: post,
            user: ctx.session.user
        })
    })

    router.post('/posts/', KoaBody, checkLogin, async function(ctx, next){
        let user = ctx.session.user,
            field = ctx.request.body,
            author = user._id,
            title = field.title,
            content = field.content
        
        try {
            if (!title.length) {
                throw new Error("请填写标题")
            }
            if (!content.length) {
                throw new Error("请填写内容")
            }
        } catch (err) {
            return ctx.redirect('back')
        }

        let post = new PostModel({
            author: author,
            title: title,
            content: content,
            pv: 0
        })

        await post.save()
            .then((result) => {
                ctx.redirect(`/posts/${result._id}`)
                console.log("发布成功")
            })
            .catch(next)

    })

    router.get('/posts/create', checkLogin, async function(ctx, next){
        await ctx.render('create', {
            blog: {
                title: "blog"
            },
            user: ctx.session.user
        })
    })

    router.get('/posts/:postId', async function(ctx, next){
        let postId = ctx.params.postId,
            post,
            comment, 
            commentCount
        await Promise.all([
                PostModel.getPostById(postId),
                PostModel.incPv(postId),
                CommentModel.getComments(postId),
                CommentModel.getCommentsCount(postId)
            ])
            .then(function (result){
                post = result[0]
                comments = result[2]
                post.commentsCount = result[3]
                if (!post) {
                    throw new Error('该文章不存在')
                }
            })
            .catch(next)
        await ctx.render('post', {
            blog: {
                title: 'blog'
            },
            post: post,
            user: ctx.session.user,
            comments: comments
        })
    })

    router.get('/posts/:postId/edit', checkLogin, async function(ctx, next){
        let postId = ctx.params.postId,
            author = ctx.session.user._id,
            postInfo

        console.log(postId)

        await PostModel.getRawPostById(postId)
            .then(function(post){
                console.log(post)
                if (!post) {
                    throw new Error('该文章不存在')
                }
                if (author.toString() !== post.author._id.toString()) {
                    throw new Error('权限不足')
                }
                postInfo = post
            })
            .catch(next)
     
        await ctx.render('edit', {
            blog: {
                title: 'blog'
            },
            post: postInfo
        })
    })

    router.post('/posts/:postId/edit', KoaBody, checkLogin, async function(ctx, next){
        let postId = ctx.params.postId,
            author = ctx.session.user._id,
            title = ctx.request.body.title,
            content = ctx.request.body.content
    
        await PostModel.updatePostById(postId, author, { title: title, content: content})
            .then(() => {
                console.log("编辑文章成功")
                ctx.redirect(`/posts/${postId}`)
            })
            .catch(next)
    })

    router.get('/posts/:postId/remove', checkLogin, async function(ctx, next){
        let postId = ctx.params.postId,
            author = ctx.session.user._id

        await PostModel.delPostById(postId, author)
            .then(() => {
                console.log("删除文章成功")
                ctx.redirect('/posts/')
            })
            .catch(next)

    })

    router.post('/posts/:postId/comment', KoaBody, checkLogin, async function(ctx, next){
        let author = ctx.session.user._id,
            postId = ctx.params.postId,
            content = ctx.request.body.content,
            comment = {
                author: author,
                postId: postId,
                content: content
            }
        
        comment = new CommentModel(comment)

        await comment.save()
            .then(() => {
                console.log("留言成功")
                return ctx.redirect('back')
            })
            .catch(next)
    })

    router.get('/posts/:postId/comment/:commentId/remove', checkLogin, async function(ctx, next){
        let commentId = ctx.params.commentId,
            author = ctx.session.user._id
        
        await CommentModel.delCommentById(commentId, author)
            .then(() => {
                console.log("删除留言成功")
                ctx.redirect('back')
            })
            .catch(next)
    })
}



