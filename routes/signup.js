const checkNotLogin = require('../middlewares/check').checkNotLogin
    , UserModel = require('../models/UserModel')
    , sha1 = require('sha1')
    , fs = require('fs')
    , path = require('path')
    , KoaBody = require('koa-body')({
        multipart: true,
        formidable: {
            uploadDir: path.resolve(__dirname, "../public/uploads")
        }
    })

module.exports = (router) => {
    router.get('/signup', checkNotLogin, async function(ctx, next){
        await ctx.render('signup', {
            blog: {
                title: 'blog'
            }
        })
    })

    router.post('/signup', KoaBody, checkNotLogin, async function(ctx, next){

        let fields = ctx.request.body.fields
            , name = fields.name
            , password = fields.password
            , repassword = fields.repassword
            , gender = fields.gender
            , bio = fields.bio
            , avatar = ctx.request.body.files.avatar.path.split(path.sep).pop()
            , filename = ctx.request.body.files.avatar.name
            , filepath = ctx.request.body.files.avatar.path
        
        try {
            if (!(name.length >= 1 && name.length <= 10)) {
                throw new Error('Name must be restricted between 1~10 characters')
            }
            if (['m', 'f', 'x'].indexOf(gender) === -1) {
                throw new Error('Gender must be among m, f or x')
            }
            if (!(bio.length >= 1 && bio.length <= 30)) {
                throw new Error('Self-introduction muse be restricted between 1~30 characters')
            }
            if (!filename) {
                throw new Error('Need an avatar')
            }
            if (password.length < 6) {
                throw new Error('Password must more than 6 characters')
            }
            if (password !== repassword) {
                throw new Error('Twice password is not the same')
            }
        } catch (e) {
            fs.unlink(filepath, (err) => {
                if (err) {
                    throw err
                }
            })
            ctx.body = ctx.flash
            return ctx.redirect('/signup')
        }
        password = sha1(password)

        userModel = new UserModel({
            name: name,
            password: password,
            gender: gender,
            bio: bio,
            avatar: avatar            
        })

        let savePromise = function(userModel) {
            return promise = new Promise(function(resolve, reject){
                userModel.save(function(err) {
                    if (err !== null) {
                        resolve()
                    } else {
                        reject()
                    }
                })
            })
        }

        await savePromise(userModel).then(() => {
            return ctx.redirect('/signup')
        }, () => {
            return ctx.redirect('/posts')
        })
    })
}