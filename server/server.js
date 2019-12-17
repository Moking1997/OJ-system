const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-better-body')


let server = new Koa()
server.listen(8088)

let obj = body({ uploadDir: 'upload' })
server.use(obj)

server.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
})

let router = new Router()

router.use('/api', require('./routers/api'))

server.use(router.routes())