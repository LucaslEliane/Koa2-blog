const checkLogin = require('../middlewares/check').checkLogin
    , KoaBody = require('koa-body')({
        text: true
    })
    , PostModel = require('../models/PostModel')

module.exports = function(router) {


    router.get('/posts/', async function(ctx, next){
        return ctx.render('posts', {
            blog: {
                title: "blog"
            }
        })
    })

    router.post('/posts/', KoaBody, checkLogin, async function(ctx, next){
        let user = ctx.session.user
            , field = ctx.request.body
            , author = user._id
            , title = field.title
            , content = field.content
        
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
        ctx.body = ctx.flash
    })

    router.post('/posts/:postId/edit', checkLogin, async function(ctx, next){
        ctx.body = ctx.flash
    })

    router.get('/posts/:postId/remove', checkLogin, async function(ctx, next){
        ctx.body = ctx.flash
    })

    router.post('/posts/:postId/comment', checkLogin, async function(ctx, next){
        ctx.body = ctx.flash
    })

    router.get('/posts/:postId/comment/:commentId/remove', checkLogin, async function(ctx, next){
        ctx.body = ctx.flash
    })
}



