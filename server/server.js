const Koa = require('koa')
const Router = require('koa-router')
const mysql = require('mysql')
const co = require('co-mysql')

let conn = mysql.createPool({ host: 'localhost', user: 'root', password: '123456', database: 'jol' })

let server = new Koa()
server.listen(8088)

server.context.db = co(conn)

server.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')

    await next()
})

let router = new Router()

router.use('/api', require('./routers/api'))

server.use(router.routes())