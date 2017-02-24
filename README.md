# Koa2-blog
A Koa2 demo of blog


## 开发过程中注意事项
1. 在使用koa2的时候，会出现很多原本的中间件不兼容async-await的异步模式，所以需要使用
    (koa-convert)[https://github.com/koajs/convert] 来将这些中间件转化为新版
    koa的异步模式
2. mongodb启动方法：mongod --config /usr/local/etc/mongod.conf