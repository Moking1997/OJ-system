const Router = require('koa-router')

let router = new Router()

router.get('/problem', async ctx => {
    ctx.body = await ctx.db.query('SELECT * FROM problem')
})
router.get('/problem/:id', async ctx => {
    let { id } = ctx.params
    ctx.body = await ctx.db.query('SELECT * FROM problem WHERE problem_id=?', [id])
})
router.get('/catalog/:parent', async ctx => {
    let { parent } = ctx.params
    ctx.body = await ctx.db.query('SELECT ID, title FROM catalog_table WHERE parentID=?', [parent])
})


module.exports = router.routes()