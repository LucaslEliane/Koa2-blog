const path = require('path')
    , Koa = require('koa2')
    , Router = require('koa-router')
    , session = require('koa-session')
    , flash = require('koa-flash')
    , config = require('config-lite')
    , views = require('koa-views')
    , convert = require('koa-convert')
    , serve = require('koa-static2')
    , favicon = require('koa-favicon')
    , mongoose = require('./lib/mongo')
    , app = new Koa()
    , router = new Router()

app.use(views(__dirname + '/views', { extension: 'pug'}))
app.use(convert(serve("static", __dirname + '/public')))
app.use(convert(favicon(__dirname + '/public/favicon.ico')))

app.keys = [config.keys]

app.use(convert(session(config.session, app)))
app.use(convert(flash()))

app.use(async function (ctx, next){
    let start = new Date
    await next()
    let ms = new Date - start
    console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

require('./routes/index')(app)


app.listen(config.port)
