const checkNotLogin = require('../middlewares/check').checkNotLogin

module.exports = function(router) {
    router.get('/', async (ctx, next) => {
        await checkNotLogin()
        ctx.body = ctx.flash
    })

    router.post('/', async (ctx, next) => {
        await checkNotLogin()
        ctx.body = ctx.flash
    })
}