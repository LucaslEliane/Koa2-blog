module.exports = function(app) {
    const Router = require('koa-router')
    var router = new Router()
    router.get('/', async function(ctx, next) {
        await ctx.render('header', {
            blog: {
                title: 'blog'
            }
        })
    })
    require('./posts')(router)
    require('./signin')(router)
    require('./signout')(router)
    require('./signup')(router)

    app.use(router.routes())
        .use(router.allowedMethods())
}