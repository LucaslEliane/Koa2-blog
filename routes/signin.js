const checkNotLogin = require('../middlewares/check').checkNotLogin
    , KoaBody = require('koa-body')({
        text: true
    })
    , UserModel = require('../models/UserModel')
    , sha1 = require('sha1')

module.exports = function(router) {
    router.get('/signin', checkNotLogin, async (ctx, next) => {
        await ctx.render('signin', {
            blog: {
                title: "blog"
            }
        })
    })

    router.post('/signin', KoaBody, checkNotLogin, async (ctx, next) => {

        // console.log('body ' + ctx.request.body)
        // console.log('type ' + typeof(ctx.request.body))
        let fields = ctx.request.body,
            name = fields.name,
            password = fields.password

        await UserModel.getUserByName(name)
            .then((user) => {
                // console.log(user)
                if (!user) {
                    console.log('用户不存在')
                    ctx.redirect('back')
                }
                if (sha1(password) !== user.password) {
                    console.log('用户名或者密码错误')
                    ctx.redirect('back')
                }
                console.log('登录成功')
                delete user.password
                ctx.session.user = user
                ctx.redirect('/posts')
            })
            .catch(next)

    })
}