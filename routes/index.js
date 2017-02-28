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

    // app.use(async function(ctx, next) {
    //     if (ctx.status === 404) {
    //         await ctx.render('404', {
    //             blog: {
    //                 title: 'blog'
    //             }
    //         })
    //     }
    // })

    // app.use(async function(err, ctx, next) {
    //     await ctx.render('error', {
    //         error: err
    //     })
    // })

    app.use(router.routes())
        .use(router.allowedMethods())
}