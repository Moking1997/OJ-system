const Router = require('koa-router')

let router = new Router()


router.get('/account_catalog', async ctx => {
    ctx.body = ['娱乐']
})

router.get('/get_test', async ctx => {
    ctx.body = await ctx.db.query('SELECT * FROM user_table')
})
router.get('/problem', async ctx => {
    ctx.body = await ctx.db.query('SELECT * FROM problem_table')
})
router.get('/catalog/:parent', async ctx => {
    let { parent } = ctx.params
    ctx.body = await ctx.db.query('SELECT ID, title FROM catalog_table WHERE parentID=?', [parent])
})


module.exports = router.routes()