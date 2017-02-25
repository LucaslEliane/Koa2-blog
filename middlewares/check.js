module.exports = {
    checkLogin: async function checkLogin(ctx, next) {
        if (ctx.session.user === undefined) {
            ctx.flash = {
                error: '未登录'
            }
            console.log(ctx.flash)
            return ctx.redirect('/signin')
        }
        await next()
    },

    checkNotLogin: async function checkNotLogin(ctx, next) {
        console.log(ctx.session)
        if (ctx.session.user !== undefined) {
            console.log("name")
            ctx.flash = {
                error: '已登录'
            }
            console.log(ctx.flash)
            return ctx.redirect('back')
        }
        await next()
    }
}