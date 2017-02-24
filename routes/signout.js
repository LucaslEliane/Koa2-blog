const checkLogin = require('../middlewares/check').checkLogin

module.exports = (router) => {
    router.get('/', async (ctx, next) => {
        await checkLogin()
        ctx.body = ctx.flash
    })
}