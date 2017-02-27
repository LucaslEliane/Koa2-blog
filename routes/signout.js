const checkLogin = require('../middlewares/check').checkLogin

module.exports = (router) => {
    router.get('/', checkLogin, async (ctx, next) => {
        ctx.session.user = null
        return ctx.redirect('post')
    })
}