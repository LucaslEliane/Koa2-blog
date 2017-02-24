module.exports = {
    checkLogin: async function checkLogin(ctx, next) {
        if (!ctx.session.user) {
            ctx.flash = {
                error: '未登录'
            }
            return ctx.redirect('/signin')
        }
        next()
    },

    checkNotLogin: async function checkNotLogin(ctx, next) {
        if (ctx.session.user) {
            ctx.flash = {
                error: '已登录'
            }
            return ctx.redirect('back')
        }
        next()
    }
}