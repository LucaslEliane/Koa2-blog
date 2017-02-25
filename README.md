# Koa2-blog
A Koa2 demo of blog


## 开发过程中注意事项
1. 在使用koa2的时候，会出现很多原本的中间件不兼容async-await的异步模式，所以需要使用 (koa-convert)[https://github.com/koajs/convert] 来将这些中间件转化为新版
    koa的异步模式
2. mongodb启动方法：mongod --config /usr/local/etc/mongod.conf
3. 在开发过程中，出现了一个困扰了很久的问题：运行时出现错误:  Error: Can't set headers after they are sent. 这个错误表示在响应被发送出去之后又一次进行了响应头的设置，这个问题可能出现在下面这几种情况当中：
    * 在redirect方法前面没有加return：这个问题在于redirect会将响应发送出去，如果不进行return，
        会导致后面的HTTP操作继续设置header，出现这个错误。
    * HTTP操作的顺序出现问题，导致在响应发送之后又进行了一次响应头设置，node里面出现这种问题一般
        都是由于异步操作导致的问题。
    * render和redirect一样，如果不进行return也会导致后面的HTTP操作出现该错误。

```
// 这是代码里面出现该错误的地方
await userModel.save(function(err) {
    console.log('save')
    if (err !== null) {
            fs.unlink(filepath)
            ctx.body = ctx.flash
            return ctx.redirect('/signup')
        }
    })
console.log('redirect')
return ctx.redirect('/posts')
```
上面的代码是对mongodb进行save操作的，回调函数中的错误处理的执行顺序发生了错误，
```
显示如下：
redirect
GET /posts - 89
save
Error: xxxxxxx
```
可以看到回调函数在后面代码执行之前执行了，这里需要调整异步的执行顺序，封装一个Promise对象：
```
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

await savePromise(userModel).then(() => {return ctx.redirect('/signup')},
    () => {return ctx.redirect('/posts')})
```