const Router = require('koa-router')
const Sequelize = require('sequelize');

const sequelize = new Sequelize('jol', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql' ,
});

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

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
const problem = sequelize.define('problem', {
    // 属性
    problem_id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
        // allowNull 默认为 true
    }
}, {
        freezeTableName: true,
        //去掉默认的添加时间和更新时间
        timestamps: false,
        indexes: [
            //普通索引,默认BTREE
            {
                unique: true,
                fields: ['pid']
            },
        ]
});
problem.findAll().then(problems => {
    console.log("All users:", JSON.stringify(problems, null, 4));
});
module.exports = router.routes()