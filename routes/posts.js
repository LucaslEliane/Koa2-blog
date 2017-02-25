const checkLogin = require('../middlewares/check').checkLogin

module.exports = function(router) {


    router.get('/posts/', async function(ctx, next){
        return ctx.render('posts', {
            blog: {
                title: "blog"
            }
        })
    })

    router.post('/posts/', checkLogin, async function(ctx, next){
        ctx.body = ctx.flash
    })

    router.get('/posts/create', checkLogin, async function(ctx, next){
        ctx.body = ctx.flash
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



