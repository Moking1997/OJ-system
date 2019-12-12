const Router = require('koa-router')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('oj', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});

let router = new Router()

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Problem = sequelize.define('problem', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    tag: {
        type: Sequelize.STRING
    },
    catalog_id: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

const Catalog = sequelize.define('catalog', {
    ID: {
        type: Sequelize.BIGINT(11),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    parentID: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

router.get('/problem/:id', async ctx => {
    let { id } = ctx.params
    ctx.body = await Problem.findOne({ where: { id: id } })
})
router.get('/problem/catalog', async ctx => {
    // let { id } = ctx.params
    ctx.body = await Problem.findAll()
})
router.get('/problem/catalog/:id', async ctx => {
    let { id } = ctx.params
    ctx.body = await Problem.findAll({ where: { catalog_id: { [Op.like]: `%${id},%` } } })
})
router.get('/problem', async ctx => {
    ctx.body = await Problem.findAll()
})

router.get('/tags/:tag', async ctx => {
    console.log('data', ctx.params['tag'])
    let id = (ctx.params['tag']).split(",")[0]
    let tag = (ctx.params['tag']).split(",")[1]
    console.log(id, tag)
    ctx.body = await Problem.findAll({ where: { catalog_id: { [Op.like]: `%${id},%` }, tag: tag } })
})

router.get('/catalog/:parentID', async ctx => {
    let { parentID } = ctx.params
    ctx.body = await Catalog.findAll({ where: { parentID: parentID } })
})

module.exports = router.routes()