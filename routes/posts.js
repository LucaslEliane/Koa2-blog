const checkLogin = require('../middlewares/check').checkLogin

module.exports = function(router) {
    console.log('posts')
    router.get('/', async function(ctx, next){
        ctx.body = ctx.flash
    })

    router.post('/', async function(ctx, next){
        await checkLogin()
        ctx.body = ctx.flash
    })

    router.get('/create', async function(ctx, next){
        await checkLogin()
        ctx.body = ctx.flash
    })

    router.get('/:postId', async function(ctx, next){
        ctx.body = ctx.flash
    })

    router.post('/:postId/edit', async function(ctx, next){
        await checkLogin()
        ctx.body = ctx.flash
    })

    router.get('/:postId/remove', async function(ctx, next){
        await checkLogin()
        ctx.body = ctx.flash
    })

    router.post('/:postId/comment', async function(ctx, next){
        await checkLogin()
        ctx.body = ctx.flash
    })

    router.get('/:postId/comment/:commentId/remove', async function(ctx, next){
        await checkLogin()
        ctx.body = ctx.flash
    })
}



